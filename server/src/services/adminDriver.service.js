import prisma from "../config/prisma.ts";

export const getAllDrivers = async () => {
  return prisma.driver.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      licenseNumber: true,
      licenseExpiry: true,
      verificationStatus: true,
      experienceYears: true,

      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });
};

export const getDriverById = async (driverId) => {
  const driver = await prisma.driver.findUnique({
    where: {
      id: driverId,
    },
    select: {
      id: true,
      licenseNumber: true,
      licenseExpiry: true,
      verificationStatus: true,
      experienceYears: true,

      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      },

      documents: {
        select: {
          id: true,
          documentType: true,
          documentUrl: true,
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },

      assignments: {
        orderBy: {
          startDate: "desc",
        },
        select: {
          id: true,
          startDate: true,
          endDate: true,
          status: true,

          vehicle: {
            select: {
              id: true,
              registrationNumber: true,
              model: true,
              vehicleType: true,
              capacity: true,
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
      },
    },
  });

  if (!driver) {
    const error = new Error("Driver not found");
    error.statusCode = 404;
    throw error;
  }

  return driver;
};

export const updateDriverVerification = async ({
  driverId,
  status,
}) => {
  const driver = await prisma.driver.findUnique({
    where: {
      id: driverId,
    },
  });

  if (!driver) {
    const error = new Error("Driver not found");
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = driver.verificationStatus;

  const allowedTransitions = {
    PENDING: ["VERIFIED", "REJECTED"],
    VERIFIED: [],
    REJECTED: [],
  };

  if (!allowedTransitions[currentStatus].includes(status)) {
    const error = new Error(
      `Cannot change driver verification status from ${currentStatus} to ${status}`
    );
    error.statusCode = 400;
    throw error;
  }

  return prisma.driver.update({
    where: {
      id: driverId,
    },
    data: {
      verificationStatus: status,
    },
  });
};

export const updateDriverDocumentStatus = async ({
  driverId,
  documentId,
  status,
}) => {
  const document = await prisma.driverDocument.findFirst({
    where: {
      id: documentId,
      driverId,
    },
  });

  if (!document) {
    const error = new Error("Driver document not found");
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = document.status;

  const allowedTransitions = {
    PENDING: ["VERIFIED", "REJECTED"],
    VERIFIED: [],
    REJECTED: [],
  };

  if (!allowedTransitions[currentStatus].includes(status)) {
    const error = new Error(
      `Cannot change document status from ${currentStatus} to ${status}`
    );
    error.statusCode = 400;
    throw error;
  }

  return prisma.driverDocument.update({
    where: {
      id: documentId,
    },
    data: {
      status,
    },
  });
};