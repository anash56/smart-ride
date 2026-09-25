import prisma from "../config/prisma.ts";

export const getAllAssignments = async () => {
  return prisma.routeAssignment.findMany({
    orderBy: {
      startDate: "desc",
    },

    select: {
      id: true,
      startDate: true,
      endDate: true,
      status: true,

      driver: {
        select: {
          id: true,
          licenseNumber: true,
          verificationStatus: true,

          user: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
      },

      vehicle: {
        select: {
          id: true,
          registrationNumber: true,
          model: true,
          vehicleType: true,
          capacity: true,
          status: true,
        },
      },

      route: {
        select: {
          id: true,
          name: true,
          origin: true,
          destination: true,
        },
      },

      schedule: {
        select: {
          id: true,
          name: true,
          startTime: true,
          endTime: true,
          daysOfWeek: true,
        },
      },
    },
  });
};

export const updateAssignmentStatus = async ({
  assignmentId,
  status,
}) => {
  const assignment = await prisma.routeAssignment.findUnique({
    where: { id: assignmentId },
  });

  if (!assignment) {
    const error = new Error("Assignment not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedTransitions = {
    ACTIVE: ["INACTIVE", "COMPLETED"],
    INACTIVE: ["ACTIVE"],
    COMPLETED: [],
  };

  const currentStatus = assignment.status;

  if (!allowedTransitions[currentStatus].includes(status)) {
    const error = new Error(
      `Cannot change assignment status from ${currentStatus} to ${status}`
    );
    error.statusCode = 400;
    throw error;
  }

  return prisma.routeAssignment.update({
    where: { id: assignmentId },
    data: { status },
  });
};