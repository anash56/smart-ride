import prisma from "../config/prisma.ts";

export const createSchedule = async ({
  routeId,
  name,
  startTime,
  endTime,
  daysOfWeek,
  isActive,
}) => {
  const route = await prisma.route.findUnique({
    where: {
      id: routeId,
    },
  });

  if (!route) {
    return null;
  }

  const schedule = await prisma.schedule.create({
    data: {
      routeId,
      name,
      startTime,
      endTime,
      daysOfWeek,
      isActive,
    },
  });

  return schedule;
};

export const getRouteSchedules = async (routeId) => {
  const route = await prisma.route.findUnique({
    where: {
      id: routeId,
    },
  });

  if (!route) {
    return null;
  }

  const schedules = await prisma.schedule.findMany({
    where: {
      routeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return schedules;
};

export const getScheduleById = async (scheduleId, routeId) => {
  const schedule = await prisma.schedule.findFirst({
    where: {
      id: scheduleId,
      routeId,
    },
  });

  return schedule;
};

export const updateSchedule = async (
  scheduleId,
  routeId,
  data
) => {
  const existingSchedule = await prisma.schedule.findFirst({
    where: {
      id: scheduleId,
      routeId,
    },
  });

  if (!existingSchedule) {
    return null;
  }

  const updatedSchedule = await prisma.schedule.update({
    where: {
      id: scheduleId,
    },
    data,
  });

  return updatedSchedule;
};

export const deleteSchedule = async (
  scheduleId,
  routeId
) => {
  const existingSchedule = await prisma.schedule.findFirst({
    where: {
      id: scheduleId,
      routeId,
    },
  });

  if (!existingSchedule) {
    return null;
  }

  await prisma.schedule.delete({
    where: {
      id: scheduleId,
    },
  });

  return true;
};