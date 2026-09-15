import {
  createRouteSchema,
  updateRouteSchema,
} from "../validators/route.validator.js";

import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../services/route.service.js";

export const create = async (req, res) => {
  try {
    const result = createRouteSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const route = await createRoute(result.data);

    return res.status(201).json({
      success: true,
      message: "Route created successfully",
      data: route,
    });
  } catch (error) {
    console.error("Create route error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const routes = await getAllRoutes();

    return res.status(200).json({
      success: true,
      data: routes,
    });
  } catch (error) {
    console.error("Get routes error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const route = await getRouteById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    console.error("Get route error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = updateRouteSchema.safeParse(req.body);

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

    const route = await updateRoute(
      req.params.id,
      result.data
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route updated successfully",
      data: route,
    });
  } catch (error) {
    console.error("Update route error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await deleteRoute(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route deleted successfully",
    });
  } catch (error) {
    console.error("Delete route error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};