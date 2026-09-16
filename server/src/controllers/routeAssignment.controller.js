import {
  createRouteAssignmentSchema,
  updateRouteAssignmentSchema,
} from "../validators/routeAssignment.validator.js";

import {
  createRouteAssignment,
  getAllRouteAssignments,
  getRouteAssignmentById,
  updateRouteAssignment,
  deleteRouteAssignment,
} from "../services/routeAssignment.service.js";

export const create = async (req, res) => {
  try {
    const result = createRouteAssignmentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const assignment = await createRouteAssignment(result.data);

    return res.status(201).json({
      success: true,
      message: "Route assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Create route assignment error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Internal server error",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const assignments = await getAllRouteAssignments();

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    console.error("Get route assignments error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const assignment = await getRouteAssignmentById(
      req.params.id
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Route assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    console.error("Get route assignment error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = updateRouteAssignmentSchema.safeParse(
      req.body
    );

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    if (Object.keys(result.data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    const assignment = await updateRouteAssignment(
      req.params.id,
      result.data
    );

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Route assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route assignment updated successfully",
      data: assignment,
    });
  } catch (error) {
    console.error("Update route assignment error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Internal server error",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await deleteRouteAssignment(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Route assignment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Route assignment deleted successfully",
    });
  } catch (error) {
    console.error("Delete route assignment error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};