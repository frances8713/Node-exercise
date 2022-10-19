import express from "express";
import "express-async-errors"
import prisma from "./lib/prisma/client";

const app = express();

app.get("/colors", async (request, response) => {
const colors = await prisma.colors.findMany();
response.json(colors)
});

export default app;
