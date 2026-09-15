import prisma from "../config/prisma.ts";

export const createRouteStop = async ({
  routeId,
  name,
  address,
  latitude,
  longitude,
  sequence,
  pickupTime,
  dropTime,
}) => {
  const route = await prisma.route.findUnique({
    where: {
      id: routeId,
    },
  });

  if (!route) {
    return null;
  }

  const routeStop = await prisma.routeStop.create({
    data: {
      routeId,
      name,
      address,
      latitude,
      longitude,
      sequence,
      pickupTime,
      dropTime,
    },
  });

  return routeStop;
};

export const getRouteStops = async (routeId) => {
  const route = await prisma.route.findUnique({
    where: {
      id: routeId,
    },
  });

  if (!route) {
    return null;
  }

  const stops = await prisma.routeStop.findMany({
    where: {
      routeId,
    },
    orderBy: {
      sequence: "asc",
    },
  });

  return stops;
};

export const getRouteStopById = async (stopId, routeId) => {
  const stop = await prisma.routeStop.findFirst({
    where: {
      id: stopId,
      routeId,
    },
  });

  return stop;
};

export const updateRouteStop = async (
  stopId,
  routeId,
  data
) => {
  const existingStop = await prisma.routeStop.findFirst({
    where: {
      id: stopId,
      routeId,
    },
  });

  if (!existingStop) {
    return null;
  }

  const updatedStop = await prisma.routeStop.update({
    where: {
      id: stopId,
    },
    data,
  });

  return updatedStop;
};

export const deleteRouteStop = async (stopId, routeId) => {
  const existingStop = await prisma.routeStop.findFirst({
    where: {
      id: stopId,
      routeId,
    },
  });

  if (!existingStop) {
    return null;
  }

  await prisma.routeStop.delete({
    where: {
      id: stopId,
    },
  });

  return true;
};