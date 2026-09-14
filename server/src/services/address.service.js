import prisma from "../config/prisma.ts";

export const createAddress = async ({
  userId,
  label,
  address,
  latitude,
  longitude,
  type,
}) => {
  const newAddress = await prisma.address.create({
    data: {
      userId,
      label,
      address,
      latitude,
      longitude,
      type,
    },
  });

  return newAddress;
};

export const getUserAddresses = async (userId) => {
  const addresses = await prisma.address.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return addresses;
};

export const getAddressById = async (addressId, userId) => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });

  return address;
};

export const updateAddress = async (
  addressId,
  userId,
  data
) => {
  const existingAddress = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });

  if (!existingAddress) {
    return null;
  }

  const updatedAddress = await prisma.address.update({
    where: {
      id: addressId,
    },
    data,
  });

  return updatedAddress;
};

export const deleteAddress = async (addressId, userId) => {
  const existingAddress = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });

  if (!existingAddress) {
    return null;
  }

  await prisma.address.delete({
    where: {
      id: addressId,
    },
  });

  return true;
};