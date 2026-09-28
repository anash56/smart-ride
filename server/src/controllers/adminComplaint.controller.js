import {
  getAllComplaints,
  updateComplaintStatus,
} from "../services/adminComplaint.service.js";

import {
  complaintFilterSchema,
  updateComplaintStatusSchema,
} from "../validators/adminComplaint.validator.js";

export const getAll = async (req, res, next) => {
  try {
    const result = complaintFilterSchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint filter",
        errors: result.error.flatten(),
      });
    }

    const complaints = await getAllComplaints({
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const result = updateComplaintStatusSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const complaint = await updateComplaintStatus({
      complaintId: req.params.id,
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};