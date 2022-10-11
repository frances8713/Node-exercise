import supertest from "supertest";

import app1 from "./app1"

const request = supertest(app1)

test("GET /colors", async() => {
    const response = await request
    .get ("/colors")
    .expect (200)
    .expect("Content-Type" , /application\/json/);
    expect(response.body).toEqual([
        { name : "Green"},
        { name: "White"}
    ]);
})
