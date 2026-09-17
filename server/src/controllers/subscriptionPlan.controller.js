import {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getActiveSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from "../services/subscriptionPlan.service.js";

import {
  createSubscriptionPlanSchema,
  updateSubscriptionPlanSchema,
} from "../validators/subscriptionPlan.validator.js";

export const create = async (req, res, next) => {
  try {
    const result = createSubscriptionPlanSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const plan = await createSubscriptionPlan(result.data);

    return res.status(201).json({
      success: true,
      message: "Subscription plan created successfully",
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const plans = await getAllSubscriptionPlans();

    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    next(error);
  }
};

export const getActive = async (req, res, next) => {
  try {
    const plans = await getActiveSubscriptionPlans();

    return res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const plan = await getSubscriptionPlanById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = updateSubscriptionPlanSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const plan = await updateSubscriptionPlan(
      req.params.id,
      result.data
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription plan updated successfully",
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteSubscriptionPlan(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription plan deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};