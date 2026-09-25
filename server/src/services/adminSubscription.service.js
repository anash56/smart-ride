import prisma from "../config/prisma.ts";

export const getAllSubscriptions = async ({ status } = {}) => {
  return prisma.subscription.findMany({
    where: status
      ? {
          status,
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      status: true,
      startDate: true,
      endDate: true,
      createdAt: true,

      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      plan: {
        select: {
          id: true,
          name: true,
          durationMonths: true,
          price: true,
        },
      },

      schedule: {
        select: {
          id: true,
          name: true,
          startTime: true,
          endTime: true,
          daysOfWeek: true,

          route: {
            select: {
              id: true,
              name: true,
              origin: true,
              destination: true,
            },
          },
        },
      },

      pickupAddress: {
        select: {
          id: true,
          label: true,
          address: true,
        },
      },

      dropAddress: {
        select: {
          id: true,
          label: true,
          address: true,
        },
      },

      payments: {
        select: {
          id: true,
          amount: true,
          status: true,
          paymentMethod: true,
          transactionId: true,
          paidAt: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

export const updateSubscriptionStatus = async ({
  subscriptionId,
  status,
}) => {
  const subscription = await prisma.subscription.findUnique({
    where: {
      id: subscriptionId,
    },
  });

  if (!subscription) {
    const error = new Error("Subscription not found");
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = subscription.status;

  const allowedTransitions = {
    ACTIVE: ["PAUSED", "CANCELLED"],
    PAUSED: ["ACTIVE", "CANCELLED"],
    PENDING: [],
    CANCELLED: [],
    EXPIRED: [],
  };

  if (!allowedTransitions[currentStatus].includes(status)) {
    const error = new Error(
      `Cannot change subscription status from ${currentStatus} to ${status}`
    );
    error.statusCode = 400;
    throw error;
  }

  return prisma.subscription.update({
    where: {
      id: subscriptionId,
    },

    data: {
      status,
    },
  });
};