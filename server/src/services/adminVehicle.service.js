import prisma from "../config/prisma.ts";

export const getAllVehicles = async () => {
  return prisma.vehicle.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      registrationNumber: true,
      model: true,
      vehicleType: true,
      capacity: true,
      status: true,
      createdAt: true,
    },
  });
};

export const updateVehicleStatus = async ({
  vehicleId,
  status,
}) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = vehicle.status;

  const allowedTransitions = {
    ACTIVE: ["INACTIVE", "MAINTENANCE"],
    INACTIVE: ["ACTIVE", "MAINTENANCE"],
    MAINTENANCE: ["ACTIVE", "INACTIVE"],
  };

  if (!allowedTransitions[currentStatus].includes(status)) {
    const error = new Error(
      `Cannot change vehicle status from ${currentStatus} to ${status}`
    );
    error.statusCode = 400;
    throw error;
  }

  return prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data: {
      status,
    },
  });
};