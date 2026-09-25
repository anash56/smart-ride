import {
  getAllAssignments,
  updateAssignmentStatus,
} from "../services/adminAssignment.service.js";

import {
  updateAssignmentStatusSchema,
} from "../validators/adminAssignment.validator.js";

export const getAll = async (req, res, next) => {
  try {
    const assignments = await getAllAssignments();

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const result = updateAssignmentStatusSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const assignment = await updateAssignmentStatus({
      assignmentId: req.params.id,
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      message: "Assignment status updated successfully",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};