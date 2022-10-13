import express from "express";
import "express-async-errors"

const app = express();

app.get("/colors", (request, response) => {
    response.json([
        { name: "Green"},
        { name: "Yellow"}
    ]);
});

export default app;
