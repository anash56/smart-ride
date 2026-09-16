import prisma from "../config/prisma.ts";

export const createDriver = async ({
  userId,
  licenseNumber,
  licenseExpiry,
  experienceYears,
}) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      driver: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.role !== "DRIVER") {
    const error = new Error("User must have DRIVER role");
    error.statusCode = 400;
    throw error;
  }

  if (user.driver) {
    const error = new Error("Driver profile already exists for this user");
    error.statusCode = 409;
    throw error;
  }

  return prisma.driver.create({
    data: {
      userId,
      licenseNumber,
      licenseExpiry,
      experienceYears,
    },
  });
};

export const getAllDrivers = async () => {
  return prisma.driver.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getDriverById = async (driverId) => {
  return prisma.driver.findUnique({
    where: { id: driverId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });
};

export const updateDriver = async (driverId, data) => {
  const existingDriver = await prisma.driver.findUnique({
    where: { id: driverId },
  });

  if (!existingDriver) {
    return null;
  }

  return prisma.driver.update({
    where: { id: driverId },
    data,
  });
};

export const deleteDriver = async (driverId) => {
  const existingDriver = await prisma.driver.findUnique({
    where: { id: driverId },
  });

  if (!existingDriver) {
    return null;
  }

  await prisma.driver.delete({
    where: { id: driverId },
  });

  return true;
};