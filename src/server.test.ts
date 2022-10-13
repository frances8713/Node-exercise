import supertest from "supertest";
import app from "./app";

const request = supertest(app)

test("GET /colors", async() => {
    const response = await request
    .get("/colors")
    .expect(200)
    .expect("Content-Type", /application\/json/)

    expect(response.body).toEqual ([
        { name: "Green"},
        { name: "Yellow"}
    ])
});
