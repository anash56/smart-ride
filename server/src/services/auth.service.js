import prisma from "../config/prisma.ts";
import { hashPassword , comparePassword} from "../utils/password.js";

export const registerUser = async ({ name, email, phone, password }) => {
  // 1. Check whether email or phone already exists
  /*alternative to findFirst is findUnique, but since we are checking for both email and phone,
   findFirst is appropriate here as it allows us to use the OR condition to check for either 
   email or phone in a single query unlike findunique which needs 2 seperate queries to check for both email and phone.*/
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { phone },
      ],
    },
  });

  if (existingUser) {
    const error = new Error("Email or phone number already registered");
    error.statusCode = 409;
    throw error;
  }

  // 2. Hash password
  const passwordHash = await hashPassword(password);

  // 3. Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      passwordHash,
    },
  });

  // 4. Never return passwordHash
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await comparePassword(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};