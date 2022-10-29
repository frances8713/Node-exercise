import express from "express";
import "express-async-errors";
import { validationErrorMiddleware } from "./lib/middleware/validation";
import colorsRoutes from "./routes/colors";
import { initCorseMiddleware } from "./lib/middleware/cors";


const app = express();

app.use(express.json());

app.use(initCorseMiddleware());

app.use("/colors", colorsRoutes);

app.use(validationErrorMiddleware);

export default app;
