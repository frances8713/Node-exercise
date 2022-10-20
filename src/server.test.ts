import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

test("GET /colors", async () => {
    const colors = [
        {
            "id": 6,
            "name": "Yellow",
            "description": null,
            "createAt": "2022-10-19T14:02:16.861Z",
            "updateAt": "2022-10-19T14:02:02.610Z"
        },
        {
            "id": 7,
            "name": "Green",
            "description": null,
            "createAt": "2022-10-19T14:02:16.861Z",
            "updateAt": "2022-10-19T14:02:06.822Z"
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

describe("POST /colors", () => {
    test("Valid request", async () => {
        const color =
            {
                "name": "Yellow",
                "description": null,
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
                // "name": "Yellow",
                "description": null,
            };

        const response = await request
            .post("/colors")
            .send(color)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            error: {
                body: expect.any(Array)
            }
        });
    });
});
