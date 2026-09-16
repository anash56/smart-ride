import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../validators/vehicle.validator.js";

import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicle.service.js";

export const create = async (req, res) => {
  try {
    const result = createVehicleSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const vehicle = await createVehicle(result.data);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("Create vehicle error:", error);

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
    const vehicles = await getAllVehicles();

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    console.error("Get vehicles error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const vehicle = await getVehicleById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error("Get vehicle error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = updateVehicleSchema.safeParse(req.body);

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

    const vehicle = await updateVehicle(
      req.params.id,
      result.data
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("Update vehicle error:", error);

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
    const deleted = await deleteVehicle(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("Delete vehicle error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};