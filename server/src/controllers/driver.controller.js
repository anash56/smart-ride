import {
  createDriverSchema,
  updateDriverSchema,
} from "../validators/driver.validator.js";

import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../services/driver.service.js";

export const create = async (req, res) => {
  try {
    const result = createDriverSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const driver = await createDriver(result.data);

    return res.status(201).json({
      success: true,
      message: "Driver created successfully",
      data: driver,
    });
  } catch (error) {
    console.error("Create driver error:", error);

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
    const drivers = await getAllDrivers();

    return res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (error) {
    console.error("Get drivers error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const driver = await getDriverById(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: driver,
    });
  } catch (error) {
    console.error("Get driver error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = updateDriverSchema.safeParse(req.body);

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

    const driver = await updateDriver(
      req.params.id,
      result.data
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      data: driver,
    });
  } catch (error) {
    console.error("Update driver error:", error);

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
    const deleted = await deleteDriver(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    console.error("Delete driver error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};