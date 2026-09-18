import {
  createPayment,
  completePayment,
} from "../services/payment.service.js";
import { createPaymentSchema } from "../validators/payment.validator.js";

export const create = async (req, res, next) => {
  try {
    const result = createPaymentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const payment = await createPayment({
      userId: req.user.id,
      ...result.data,
    });

    return res.status(201).json({
      success: true,
      message: "Payment initiated successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const complete = async (req, res, next) => {
  try {
    const { paymentId, transactionId } = req.body;

    if (!paymentId || !transactionId) {
      return res.status(400).json({
        success: false,
        message: "paymentId and transactionId are required",
      });
    }

    const result = await completePayment({
      userId: req.user.id,
      paymentId,
      transactionId,
    });

    return res.status(200).json({
      success: true,
      message: "Payment completed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};