import {
  createRouteStopSchema,
  updateRouteStopSchema,
} from "../validators/routeStop.validator.js";

import {
  createRouteStop,
  getRouteStops,
  getRouteStopById,
  updateRouteStop,
  deleteRouteStop,
} from "../services/routeStop.service.js";

export const create = async (req, res) => {
  try {
    const result = createRouteStopSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const routeStop = await createRouteStop({
      routeId: req.params.routeId,
      ...result.data,
    });

    if (!routeStop) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Route stop created successfully",
      data: routeStop,
    });
  } catch (error) {
    console.error("Create route stop error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const stops = await getRouteStops(req.params.routeId);

    if (!stops) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stops,
    });
  } catch (error) {
    console.error("Get route stops error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const routeStop = await getRouteStopById(
      req.params.stopId,
      req.params.routeId
    );

    if (!routeStop) {
      return res.status(404).json({
        success: false,
        message: "Route stop not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: routeStop,
    });
  } catch (error) {
    console.error("Get route stop error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = updateRouteStopSchema.safeParse(req.body);

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

    const routeStop = await updateRouteStop(
      req.params.stopId,
      req.params.routeId,
      result.data
    );

    if (!routeStop) {
      return res.status(404).json({
        success: false,
        message: "Route stop not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route stop updated successfully",
      data: routeStop,
    });
  } catch (error) {
    console.error("Update route stop error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await deleteRouteStop(
      req.params.stopId,
      req.params.routeId
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Route stop not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route stop deleted successfully",
    });
  } catch (error) {
    console.error("Delete route stop error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};