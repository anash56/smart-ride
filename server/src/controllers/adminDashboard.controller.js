import { getAdminDashboard } from "../services/adminDashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await getAdminDashboard();

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};