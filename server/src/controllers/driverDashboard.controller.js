import { getDriverDashboard } from "../services/driverDashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await getDriverDashboard(req.user.id);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};