import { createAddressSchema,updateAddressSchema, } from "../validators/address.validator.js";
import { createAddress ,getUserAddresses,getAddressById, updateAddress, deleteAddress,} from "../services/address.service.js";

export const create = async (req, res) => {
  try {
    const result = createAddressSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const address = await createAddress({
      userId: req.user.id,
      ...result.data,
    });

    return res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  } catch (error) {
    console.error("Create address error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getMine = async (req, res) => {
  try {
    const addresses = await getUserAddresses(req.user.id);

    return res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("Get addresses error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const address = await getAddressById(
      req.params.id,
      req.user.id
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error("Get address error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const update = async (req, res) => {
  try {
    const result = updateAddressSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    if (Object.keys(result.data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    const address = await updateAddress(
      req.params.id,
      req.user.id,
      result.data
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    console.error("Update address error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await deleteAddress(
      req.params.id,
      req.user.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};