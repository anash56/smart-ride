import {
  createAttendance,
  updateAttendance,
  getDriverAttendance,
} from "../services/attendance.service.js";

import {
  createAttendanceSchema,
  updateAttendanceSchema,
} from "../validators/attendance.validator.js";

export const create = async (req, res, next) => {
  try {
    const result = createAttendanceSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const attendance = await createAttendance({
      userId: req.user.id,
      ...result.data,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = updateAttendanceSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const attendance = await updateAttendance({
      userId: req.user.id,
      attendanceId: req.params.id,
      ...result.data,
    });

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const attendance = await getDriverAttendance(req.user.id);

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};