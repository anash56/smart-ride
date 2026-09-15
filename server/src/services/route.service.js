import prisma from "../config/prisma.ts";

export const createRoute = async ({
  name,
  origin,
  destination,
  distanceKm,
  estimatedDurationMinutes,
  isActive,
}) => {
  const route = await prisma.route.create({
    data: {
      name,
      origin,
      destination,
      distanceKm,
      estimatedDurationMinutes,
      isActive,
    },
  });

  return route;
};

export const getAllRoutes = async () => {
  const routes = await prisma.route.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return routes;
};

export const getRouteById = async (routeId) => {
  const route = await prisma.route.findUnique({
    where: {
      id: routeId,
    },
  });

  return route;
};

export const updateRoute = async (routeId, data) => {
  const existingRoute = await prisma.route.findUnique({
    where: {
      id: routeId,
    },
  });

  if (!existingRoute) {
    return null;
  }

  const updatedRoute = await prisma.route.update({
    where: {
      id: routeId,
    },
    data,
  });

  return updatedRoute;
};

export const deleteRoute = async (routeId) => {
  const existingRoute = await prisma.route.findUnique({
    where: {
      id: routeId,
    },
  });

  if (!existingRoute) {
    return null;
  }

  await prisma.route.delete({
    where: {
      id: routeId,
    },
  });

  return true;
};