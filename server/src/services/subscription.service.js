import prisma from "../config/prisma.ts";

const calculateEndDate = (startDate, durationMonths) => {
  const endDate = new Date(startDate);

  endDate.setMonth(endDate.getMonth() + durationMonths);
  endDate.setDate(endDate.getDate() - 1);

  return endDate;
};

export const createSubscription = async ({
  userId,
  planId,
  scheduleId,
  pickupAddressId,
  dropAddressId,
  startDate,
}) => {
  // 1. Check plan
  const plan = await prisma.subscriptionPlan.findUnique({
    where: {
      id: planId,
    },
  });

  if (!plan) {
    const error = new Error("Subscription plan not found");
    error.statusCode = 404;
    throw error;
  }

  if (!plan.isActive) {
    const error = new Error("Subscription plan is not active");
    error.statusCode = 400;
    throw error;
  }

  // 2. Check schedule
  const schedule = await prisma.schedule.findUnique({
    where: {
      id: scheduleId,
    },
    include: {
      route: true,
    },
  });

  if (!schedule) {
    const error = new Error("Schedule not found");
    error.statusCode = 404;
    throw error;
  }

  if (!schedule.isActive) {
    const error = new Error("Schedule is not active");
    error.statusCode = 400;
    throw error;
  }

  if (!schedule.route.isActive) {
    const error = new Error("Route is not active");
    error.statusCode = 400;
    throw error;
  }

  // 3. Check pickup address belongs to user
  const pickupAddress = await prisma.address.findFirst({
    where: {
      id: pickupAddressId,
      userId,
    },
  });

  if (!pickupAddress) {
    const error = new Error("Pickup address not found");
    error.statusCode = 404;
    throw error;
  }

  // 4. Check drop address belongs to user
  const dropAddress = await prisma.address.findFirst({
    where: {
      id: dropAddressId,
      userId,
    },
  });

  if (!dropAddress) {
    const error = new Error("Drop address not found");
    error.statusCode = 404;
    throw error;
  }

  // 5. Prevent same pickup and drop address
  if (pickupAddressId === dropAddressId) {
    const error = new Error(
      "Pickup and drop addresses cannot be the same"
    );
    error.statusCode = 400;
    throw error;
  }

  // 6. Check for existing active/pending subscription
  const existingSubscription =
    await prisma.subscription.findFirst({
      where: {
        userId,
        status: {
          in: ["PENDING", "ACTIVE", "PAUSED"],
        },
      },
    });

  if (existingSubscription) {
    const error = new Error(
      "User already has an active or pending subscription"
    );
    error.statusCode = 409;
    throw error;
  }

  // 7. Calculate subscription period
  const endDate = calculateEndDate(
    startDate,
    plan.durationMonths
  );

  // 8. Create subscription
  return prisma.subscription.create({
    data: {
      userId,
      planId,
      scheduleId,
      pickupAddressId,
      dropAddressId,
      startDate,
      endDate,
      status: "PENDING",
    },
    include: {
      plan: true,
      schedule: {
        include: {
          route: true,
        },
      },
      pickupAddress: true,
      dropAddress: true,
    },
  });
};

export const getMySubscription = async (userId) => {
  return prisma.subscription.findFirst({
    where: {
      userId,
    },
    include: {
      plan: true,
      schedule: {
        include: {
          route: true,
        },
      },
      pickupAddress: true,
      dropAddress: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};