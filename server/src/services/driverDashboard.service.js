import prisma from "../config/prisma.ts";

export const getDriverDashboard = async (userId) => {
  const driver = await prisma.driver.findUnique({
    where: {
      userId,
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
          phone: true,
        },
      },

      assignments: {
        where: {
          status: "ACTIVE",
        },

        select: {
          id: true,
          startDate: true,
          endDate: true,
          status: true,

          route: {
            select: {
              id: true,
              name: true,
              origin: true,
              destination: true,
              distanceKm: true,
              estimatedDurationMinutes: true,
            },
          },

          schedule: {
            select: {
              id: true,
              name: true,
              startTime: true,
              endTime: true,
              daysOfWeek: true,

              subscriptions: {
                where: {
                  status: "ACTIVE",
                },

                select: {
                  id: true,

                  user: {
                    select: {
                      id: true,
                      name: true,
                      phone: true,
                    },
                  },

                  pickupAddress: {
                    select: {
                      label: true,
                      address: true,
                      latitude: true,
                      longitude: true,
                    },
                  },

                  dropAddress: {
                    select: {
                      label: true,
                      address: true,
                      latitude: true,
                      longitude: true,
                    },
                  },
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
        },

        orderBy: {
          startDate: "desc",
        },
      },
    },
  });

  if (!driver) {
    const error = new Error("Driver profile not found");
    error.statusCode = 404;
    throw error;
  }

  return driver;
};