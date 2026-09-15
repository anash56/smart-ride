import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import addressRoutes from "./routes/address.routes.js";
import routeRoutes from "./routes/route.routes.js";
import routeStopRoutes from "./routes/routeStop.routes.js";
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

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Smart Ride API is running",
  });
});

export default app;