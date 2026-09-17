import prisma from "../config/prisma.ts";

export const createSubscriptionPlan = async ({
  name,
  durationMonths,
  price,
  description,
  isActive,
}) => {
  return prisma.subscriptionPlan.create({
    data: {
      name,
      durationMonths,
      price,
      description,
      isActive,
    },
  });
};

export const getAllSubscriptionPlans = async () => {
  return prisma.subscriptionPlan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getActiveSubscriptionPlans = async () => {
  return prisma.subscriptionPlan.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      price: "asc",
    },
  });
};

export const getSubscriptionPlanById = async (planId) => {
  return prisma.subscriptionPlan.findUnique({
    where: {
      id: planId,
    },
  });
};

export const updateSubscriptionPlan = async (planId, data) => {
  const existingPlan = await prisma.subscriptionPlan.findUnique({
    where: {
      id: planId,
    },
  });

  if (!existingPlan) {
    return null;
  }

  return prisma.subscriptionPlan.update({
    where: {
      id: planId,
    },
    data,
  });
};

export const deleteSubscriptionPlan = async (planId) => {
  const existingPlan = await prisma.subscriptionPlan.findUnique({
    where: {
      id: planId,
    },
  });

  if (!existingPlan) {
    return null;
  }

  await prisma.subscriptionPlan.delete({
    where: {
      id: planId,
    },
  });

  return true;
};