import prisma from "../config/prisma.ts";

export const getAllComplaints = async ({ status } = {}) => {
  return prisma.complaint.findMany({
    where: status ? { status } : undefined,

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      category: true,
      subject: true,
      description: true,
      priority: true,
      status: true,
      resolvedAt: true,
      createdAt: true,
      updatedAt: true,

      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });
};

export const updateComplaintStatus = async ({
  complaintId,
  status,
}) => {
  const complaint = await prisma.complaint.findUnique({
    where: {
      id: complaintId,
    },
  });

  if (!complaint) {
    const error = new Error("Complaint not found");
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = complaint.status;

  const allowedTransitions = {
    OPEN: ["IN_PROGRESS"],
    IN_PROGRESS: ["RESOLVED"],
    RESOLVED: ["CLOSED"],
    CLOSED: [],
  };

  if (!allowedTransitions[currentStatus].includes(status)) {
    const error = new Error(
      `Cannot change complaint status from ${currentStatus} to ${status}`
    );
    error.statusCode = 400;
    throw error;
  }

  const data = {
    status,
  };

  if (status === "RESOLVED") {
    data.resolvedAt = new Date();
  }

  return prisma.complaint.update({
    where: {
      id: complaintId,
    },
    data,
  });
};