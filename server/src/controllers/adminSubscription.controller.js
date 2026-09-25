import {
  getAllSubscriptions,
  updateSubscriptionStatus,
} from "../services/adminSubscription.service.js";

import {
  updateSubscriptionStatusSchema,
  subscriptionFilterSchema,
} from "../validators/adminSubscription.validator.js";

export const getAll = async (req, res, next) => {
  try {
    const result = subscriptionFilterSchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription filter",
        errors: result.error.flatten(),
      });
    }

    const subscriptions = await getAllSubscriptions({
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
export const updateStatus = async (req, res, next) => {
  try {
    const result = updateSubscriptionStatusSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const subscription = await updateSubscriptionStatus({
      subscriptionId: req.params.id,
      status: result.data.status,
    });

    return res.status(200).json({
      success: true,
      message: "Subscription status updated successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
