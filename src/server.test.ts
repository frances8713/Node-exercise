import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";
const request = supertest(app);

test("GET /colors", async () => {
    const colors = [
        {
            name: "Yellow",
            description: "null",

        },
        {
            name: "Green",
            description: "null",

        }
    ];
    //@ts-ignore
    prismaMock.colors.findMany.mockResolvedValue(colors);

    const response = await request
        .get("/colors")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(colors);
    });

        // test("POST /colors", async () => {
        // const color =
        //     {
        //         name: "Yellow",
        //         description: "miao",
        //     };

        // const response = await request
        //     .post("/colors")
        //     .send(color)
        //     .expect(201)
        //     .expect("Content-Type", /application\/json/);

        // expect(response.body).toEqual(color);
        // });


    describe("POST /colors", () => {
        test("Valid request", async () => {
            const color =
                {
                    name: "Yellow",
                    description: "null",
                };


            const response = await request
                .post("/colors")
                .send(color)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual(color);
            });

        test("Invalid request", async () => {
            const color =
                {
                    description: "null",
                };


            const response = await request
                .post("/colors")
                .send(color)
                .expect(422)
                .expect("Content-Type", /application\/json/);

                expect(response.body).toEqual({
                    errors: {
                        body: expect.any(Array)
                    }
                });
            });
});
