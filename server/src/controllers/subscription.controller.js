import {
  createSubscription,
  getMySubscription,
} from "../services/subscription.service.js";

import {
  createSubscriptionSchema,
} from "../validators/subscription.validator.js";

export const create = async (req, res, next) => {
  try {
    const result = createSubscriptionSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const subscription = await createSubscription({
      userId: req.user.id,
      ...result.data,
    });

    return res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getMine = async (req, res, next) => {
  try {
    const subscription = await getMySubscription(req.user.id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No subscription found",
      });
    }

    return res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};