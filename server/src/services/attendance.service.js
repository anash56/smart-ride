import prisma from "../config/prisma.ts";

export const createAttendance = async ({
  userId,
  subscriptionId,
  date,
  pickupStatus,
  dropStatus,
  notes,
}) => {
  // Find the driver belonging to the logged-in user
  const driver = await prisma.driver.findUnique({
    where: {
      userId,
    },
  });

  if (!driver) {
    const error = new Error("Driver profile not found");
    error.statusCode = 404;
    throw error;
  }

  // Find the subscription
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

  // Subscription must be active
  if (subscription.status !== "ACTIVE") {
    const error = new Error(
      "Attendance can only be marked for an active subscription",
    );
    error.statusCode = 400;
    throw error;
  }
 
  //check weather the attendance date is within the subscription period
  if (date < subscription.startDate || date > subscription.endDate) {
    const error = new Error(
      "Attendance date must be within the subscription period",
    );
    error.statusCode = 400;
    throw error;
  }

  // Check whether this driver is assigned to the
  // subscription's schedule
  const assignment = await prisma.routeAssignment.findFirst({
    where: {
      driverId: driver.id,
      scheduleId: subscription.scheduleId,
      status: "ACTIVE",
    },
  });

  if (!assignment) {
    const error = new Error(
      "You are not assigned to this subscription's schedule",
    );
    error.statusCode = 403;
    throw error;
  }

  // Prevent duplicate attendance
  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      driverId: driver.id,
      subscriptionId,
      date,
    },
  });

  if (existingAttendance) {
    const error = new Error("Attendance already exists for this date");
    error.statusCode = 409;
    throw error;
  }

  // Create attendance
  return prisma.attendance.create({
    data: {
      driverId: driver.id,
      subscriptionId,
      date,
      pickupStatus,
      dropStatus,
      notes,
    },
  });
};

export const updateAttendance = async ({
  userId,
  attendanceId,
  pickupStatus,
  dropStatus,
  notes,
}) => {
  const driver = await prisma.driver.findUnique({
    where: {
      userId,
    },
  });

  if (!driver) {
    const error = new Error("Driver profile not found");
    error.statusCode = 404;
    throw error;
  }

  const attendance = await prisma.attendance.findFirst({
    where: {
      id: attendanceId,
      driverId: driver.id,
    },
  });

  if (!attendance) {
    const error = new Error("Attendance not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    attendance.pickupStatus !== "PENDING" &&
    pickupStatus &&
    pickupStatus !== attendance.pickupStatus
  ) {
    const error = new Error("Pickup attendance can no longer be changed");
    error.statusCode = 400;
    throw error;
  }

  if (
    attendance.dropStatus !== "PENDING" &&
    dropStatus &&
    dropStatus !== attendance.dropStatus
  ) {
    const error = new Error("Drop attendance can no longer be changed");
    error.statusCode = 400;
    throw error;
  }

  return prisma.attendance.update({
    where: {
      id: attendance.id,
    },
    data: {
      pickupStatus,
      dropStatus,
      notes,
    },
  });
};

export const getDriverAttendance = async (userId) => {
  const driver = await prisma.driver.findUnique({
    where: {
      userId,
    },
  });

  if (!driver) {
    const error = new Error("Driver profile not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.attendance.findMany({
    where: {
      driverId: driver.id,
    },

    orderBy: {
      date: "desc",
    },
  });
};
