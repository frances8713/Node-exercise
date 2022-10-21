import express from "express";
import "express-async-errors";
import { AllowedSchema } from "express-json-validator-middleware";
import prisma from "./lib/prisma/client"

//da qui
import {
    validate,
    validationErrorMiddleware,
    colorSchema,
    ColorData
 } from "./lib/validation";
//a qui e poi aggiungo il validate body

const app = express();

app.use(express.json());

app.get("/colors", async (request, response) => {
const colors = await prisma.colors.findMany();
response.json(colors)
});


const addressSchema : AllowedSchema = {
    type: "object",
    required: ["number", "street", "type"],
    properties: {
      number: {
        type: "number",
      },
      street: {
        type: "string",
      },
      type: {
        type: "string",
        enum: ["Street", "Avenue", "Boulevard"],
      },
    },
  };


app.post("/colors", validate({ body: colorSchema}), async (request, response) => {
    const color : ColorData = request.body;
    response.status(201).json(color)
    });

// da qui
app.use(validationErrorMiddleware);
// a qui

export default app;
