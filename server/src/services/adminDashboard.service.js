import prisma from "../config/prisma.ts";

export const getAdminDashboard = async () => {
  const [
    totalUsers,
    totalDrivers,
    totalVehicles,
    activeSubscriptions,
    pendingSubscriptions,
    activeRoutes,
    openComplaints,
    successfulPayments,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.driver.count(),

    prisma.vehicle.count(),

    prisma.subscription.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.subscription.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.route.count({
      where: {
        isActive: true,
      },
    }),

    prisma.complaint.count({
      where: {
        status: {
          in: ["OPEN", "IN_PROGRESS"],
        },
      },
    }),

    prisma.payment.aggregate({
      where: {
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalUsers,
    totalDrivers,
    totalVehicles,
    activeSubscriptions,
    pendingSubscriptions,
    activeRoutes,
    openComplaints,
    totalRevenue: successfulPayments._sum.amount ?? 0,
  };
};