import {
  getAllDrivers,
  getDriverById,
  updateDriverVerification,
  updateDriverDocumentStatus,
} from "../services/adminDriver.service.js";

import {
  updateDriverVerificationSchema,
  updateDriverDocumentStatusSchema,
} from "../validators/adminDriver.validator.js";

export const getAll = async (req, res, next) => {
  try {
    const drivers = await getAllDrivers();

    return res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const driver = await getDriverById(req.params.id);

    return res.status(200).json({
      success: true,
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

export const updateVerification = async (req, res, next) => {
  try {
    const result = updateDriverVerificationSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const driver = await updateDriverVerification({
      driverId: req.params.id,
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      message: "Driver verification status updated successfully",
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDocumentStatus = async (req, res, next) => {
  try {
    const result = updateDriverDocumentStatusSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const document = await updateDriverDocumentStatus({
      driverId: req.params.id,
      documentId: req.params.documentId,
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      message: "Driver document status updated successfully",
      data: document,
    });
  } catch (error) {
    next(error);
  }
};