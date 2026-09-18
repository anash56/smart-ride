import prisma from "../config/prisma.ts";

export const createPayment = async ({
  userId,
  subscriptionId,
  paymentMethod,
}) => {
  // 1. Find the user's subscription
  const subscription = await prisma.subscription.findFirst({
    where: {
      id: subscriptionId,
      userId,
    },
    include: {
      plan: true,
    },
  });

  if (!subscription) {
    const error = new Error("Subscription not found");
    error.statusCode = 404;
    throw error;
  }

  // 2. Subscription must be pending payment
  if (subscription.status !== "PENDING") {
    const error = new Error(
      "Payment can only be made for a pending subscription"
    );
    error.statusCode = 400;
    throw error;
  }

  // 3. Prevent duplicate pending/successful payments
  const existingPayment = await prisma.payment.findFirst({
    where: {
      subscriptionId,
      status: {
        in: ["PENDING", "SUCCESS"],
      },
    },
  });

  if (existingPayment) {
    const error = new Error(
      "A payment already exists for this subscription"
    );
    error.statusCode = 409;
    throw error;
  }

  // 4. Create payment using the plan's actual price
  return prisma.payment.create({
    data: {
      userId,
      subscriptionId,
      amount: subscription.plan.price,
      paymentMethod,
      status: "PENDING",
    },
    include: {
      subscription: true,
    },
  });
};

export const completePayment = async ({
  userId,
  paymentId,
  transactionId,
}) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      userId,
    },
  });

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  if (payment.status !== "PENDING") {
    const error = new Error(
      "Only pending payments can be completed"
    );
    error.statusCode = 400;
    throw error;
  }

  return prisma.$transaction(async (tx) => {
    // 1. Mark payment as successful
    const updatedPayment = await tx.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: "SUCCESS",
        transactionId,
        paidAt: new Date(),
      },
    });

    // 2. Activate subscription
    const updatedSubscription =
      await tx.subscription.update({
        where: {
          id: payment.subscriptionId,
        },
        data: {
          status: "ACTIVE",
        },
      });

    // 3. Create invoice
    const invoice = await tx.invoice.create({
      data: {
        userId: payment.userId,
        subscriptionId: payment.subscriptionId,
        paymentId: payment.id,
        invoiceNumber: `INV-${Date.now()}`,
        amount: payment.amount,
      },
    });

    return {
      payment: updatedPayment,
      subscription: updatedSubscription,
      invoice,
    };
  });
};