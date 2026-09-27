import {
  getAllVehicles,
  updateVehicleStatus,
} from "../services/adminVehicle.service.js";

import {
  updateVehicleStatusSchema,
} from "../validators/adminVehicle.validator.js";

export const getAll = async (req, res, next) => {
  try {
    const vehicles = await getAllVehicles();

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const result = updateVehicleStatusSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const vehicle = await updateVehicleStatus({
      vehicleId: req.params.id,
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      message: "Vehicle status updated successfully",
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};