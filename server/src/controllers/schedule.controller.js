import {
  createScheduleSchema,
  updateScheduleSchema,
} from "../validators/schedule.validator.js";

import {
  createSchedule,
  getRouteSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from "../services/schedule.service.js";

export const create = async (req, res) => {
  try {
    const result = createScheduleSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const schedule = await createSchedule({
      routeId: req.params.routeId,
      ...result.data,
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Schedule created successfully",
      data: schedule,
    });
  } catch (error) {
    console.error("Create schedule error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const schedules = await getRouteSchedules(
      req.params.routeId
    );

    if (!schedules) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: schedules,
    });
  } catch (error) {
    console.error("Get schedules error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const schedule = await getScheduleById(
      req.params.scheduleId,
      req.params.routeId
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    console.error("Get schedule error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = updateScheduleSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    if (Object.keys(result.data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    const schedule = await updateSchedule(
      req.params.scheduleId,
      req.params.routeId,
      result.data
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      data: schedule,
    });
  } catch (error) {
    console.error("Update schedule error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await deleteSchedule(
      req.params.scheduleId,
      req.params.routeId
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Delete schedule error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};