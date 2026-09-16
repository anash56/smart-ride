import prisma from "../config/prisma.ts";

export const createRouteAssignment = async ({
  driverId,
  vehicleId,
  routeId,
  scheduleId,
  startDate,
  endDate,
  status,
}) => {
  // 1. Check driver
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
  });

  if (!driver) {
    const error = new Error("Driver not found");
    error.statusCode = 404;
    throw error;
  }

  if (driver.verificationStatus !== "VERIFIED") {
    const error = new Error("Driver is not verified");
    error.statusCode = 400;
    throw error;
  }

  // 2. Check vehicle
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  if (vehicle.status !== "ACTIVE") {
    const error = new Error("Vehicle is not active");
    error.statusCode = 400;
    throw error;
  }

  // 3. Check route
  const route = await prisma.route.findUnique({
    where: { id: routeId },
  });

  if (!route) {
    const error = new Error("Route not found");
    error.statusCode = 404;
    throw error;
  }

  // 4. Check schedule and route relationship
  const schedule = await prisma.schedule.findFirst({
    where: {
      id: scheduleId,
      routeId,
    },
  });

  if (!schedule) {
    const error = new Error(
      "Schedule not found for this route"
    );
    error.statusCode = 404;
    throw error;
  }

  // 5. Create assignment
  return prisma.routeAssignment.create({
    data: {
      driverId,
      vehicleId,
      routeId,
      scheduleId,
      startDate,
      endDate,
      status,
    },
    include: {
      driver: true,
      vehicle: true,
      route: true,
      schedule: true,
    },
  });
};

export const getAllRouteAssignments = async () => {
  return prisma.routeAssignment.findMany({
    include: {
      driver: true,
      vehicle: true,
      route: true,
      schedule: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRouteAssignmentById = async (assignmentId) => {
  return prisma.routeAssignment.findUnique({
    where: {
      id: assignmentId,
    },
    include: {
      driver: true,
      vehicle: true,
      route: true,
      schedule: true,
    },
  });
};

export const updateRouteAssignment = async (
  assignmentId,
  data
) => {
  const existingAssignment =
    await prisma.routeAssignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

  if (!existingAssignment) {
    return null;
  }

  return prisma.routeAssignment.update({
    where: {
      id: assignmentId,
    },
    data,
  });
};

export const deleteRouteAssignment = async (assignmentId) => {
  const existingAssignment =
    await prisma.routeAssignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

  if (!existingAssignment) {
    return null;
  }

  await prisma.routeAssignment.delete({
    where: {
      id: assignmentId,
    },
  });

  return true;
};