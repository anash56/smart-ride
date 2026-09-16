import prisma from "../config/prisma.ts";

export const createVehicle = async ({
  registrationNumber,
  model,
  vehicleType,
  capacity,
}) => {
  return prisma.vehicle.create({
    data: {
      registrationNumber,
      model,
      vehicleType,
      capacity,
    },
  });
};

export const getAllVehicles = async () => {
  return prisma.vehicle.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getVehicleById = async (vehicleId) => {
  return prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });
};

export const updateVehicle = async (vehicleId, data) => {
  const existingVehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });

  if (!existingVehicle) {
    return null;
  }

  return prisma.vehicle.update({
    where: {
      id: vehicleId,
    },
    data,
  });
};

export const deleteVehicle = async (vehicleId) => {
  const existingVehicle = await prisma.vehicle.findUnique({
    where: {
      id: vehicleId,
    },
  });

  if (!existingVehicle) {
    return null;
  }

  await prisma.vehicle.delete({
    where: {
      id: vehicleId,
    },
  });

  return true;
};