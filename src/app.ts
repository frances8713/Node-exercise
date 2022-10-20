import express from "express";
import "express-async-errors"
import prisma from "./lib/prisma/client";
import { validate, validationErrorMiddleware, colorSchema, ColorData} from "./lib/validation";

const app = express();

app.use(express.json());

app.get("/colors", async (request, response) => {
const colors = await prisma.colors.findMany();
response.json(colors)
});

app.post("/colors", validate({ body: colorSchema}), async (request, response) => {
    const color: ColorData = request.body;
    response.status(201).json(color);
    });

app.use(validationErrorMiddleware);

export default app;
