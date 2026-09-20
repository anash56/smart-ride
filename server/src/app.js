import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import addressRoutes from "./routes/address.routes.js";
import routeRoutes from "./routes/route.routes.js";
import routeStopRoutes from "./routes/routeStop.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import routeAssignmentRoutes from "./routes/routeAssignment.routes.js";
import subscriptionPlanRoutes from "./routes/subscriptionPlan.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import driverDashboardRoutes from "./routes/driverDashboard.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/routes",routeRoutes);
app.use(
  "/api/routes/:routeId/stops",
  routeStopRoutes
);

app.use(
  "/api/routes/:routeId/schedules",
  scheduleRoutes
);

app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/route-assignments", routeAssignmentRoutes);
app.use("/api/subscription-plans", subscriptionPlanRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/driver/dashboard", driverDashboardRoutes);
app.use("/api/driver/attendance", attendanceRoutes);


app.use((error, req, res, next) => {
  console.error(error);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Smart Ride API is running",
  });
});

export default app;