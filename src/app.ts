import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client"


const app = express();

app.use(express.json());

app.get("/colors", async (request, response) => {
const colors = await prisma.colors.findMany();
response.json(colors)
});

app.post("/colors", async (request, response) => {
    const color = request.body;
    response.status(201).json(color)
    });

export default app;
