import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";
const request = supertest(app);

describe("GET /colors", () => {
    test("Valid request" , async () => {
    const colors = [
        {
            name: "Yellow",
            description: "null",
        },
        {
            name: "Green",
            description: "null",
        },
    ];
    //@ts-ignore
    prismaMock.colors.findMany.mockResolvedValue(colors);

    const response = await request
        .get("/colors")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

    expect(response.body).toEqual(colors);
    });
});

describe("GET /color/:id", () => {
    test("Valid request" , async () => {
    const color =
        {
            name: "Yellow",
            description: "null",
        }
    //@ts-ignore
    prismaMock.colors.findUnique.mockResolvedValue(color);

    const response = await request
        .get("/colors/1")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(color);
    });

    test("color does not exist", async () => {
    //@ts-ignore
    prismaMock.colors.findUnique.mockResolvedValue(null);

    const response = await request
        .get("/colors/34")
        .expect(404)
        .expect("Content-Type" , /text\/html/);

        expect(response.text).toContain("Cannot GET /colors/34");
    });

    test("Invalid color ID", async () => {
        const response = await request
            .get("/colors/asdfg")
            .expect(404)
            .expect("Content-Type" , /text\/html/);

            expect(response.text).toContain("Cannot GET /colors/asdfg");
        });

});


describe("POST /colors", () => {
    test("Valid request", async () => {
        const color = {
            id: 8,
            name: "Yellow",
            description: "miao",
            createAt: "2022-10-21T10:35:15.553Z",
            updateAt: "2022-10-21T10:35:15.553Z",
        };

        //@ts-ignore
        prismaMock.colors.create.mockResolvedValue(color);

        const response = await request
            .post("/colors")
            .send({
                name: "Yellow",
                description: "null",
            })
            .expect(201)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.body).toEqual(color);
    });

    test("Invalid request", async () => {
        const color = {
            description: "null",
        };

        const response = await request
            .post("/colors")
            .send(color)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});

describe("PUT /colors/:id", () => {
    test("Valid request", async () => {
        const color = {
            id: 8,
            name: "Yellow",
            description: "miao",
            // prova: "prova", //so che non passa nel test e per farti vedere che ho fatto il passaggio.
            createAt: "2022-10-21T10:35:15.553Z",
            updateAt: "2022-10-21T10:35:15.553Z",
        };

        //@ts-ignore
        prismaMock.colors.update.mockResolvedValue(color);

        const response = await request
            .put("/colors/8")
            .send({
                name: "Yellow",
                description: "miao",
                // prova: "prova" //so che non passa nel test e per farti vedere che ho fatto il passaggio.
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost:8080");


        expect(response.body).toEqual(color);
    });

    test("Invalid request", async () => {
        const color = {
            description: "null",
        };

        const response = await request
            .put("/colors/34")
            .send(color)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });

    test("color does not exist", async () => {
        //@ts-ignore
        prismaMock.colors.update.mockRejectedValue(new Error("Error"));

        const response = await request
            .put("/colors/34")
            .send({
                name: "Yellow",
                description: "miao",
            })
            .expect(404)
            .expect("Content-Type" , /text\/html/);

            expect(response.text).toContain("Cannot PUT /colors/34");
        });

        test("Invalid color ID", async () => {
            const response = await request
                .put("/colors/asdfg")
                .send({
                    name: "Yellow",
                    description: "miao",
                    prova: "prova"
                })
                .expect(404)
                .expect("Content-Type" , /text\/html/);

                expect(response.text).toContain("Cannot PUT /colors/asdfg");
            });
});

//Update ok


describe("DELETE /color/:id", () => {
    test("Valid request" , async () => {
    const response = await request
        .delete("/colors/8 ")
        .expect(204);

    expect(response.text).toEqual("");
    });

    test("color does not exist", async () => {
    //@ts-ignore
    prismaMock.colors.delete.mockRejectedValue(new Error("Error"));

    const response = await request
        .delete("/colors/34")
        .expect(404)
        .expect("Content-Type" , /text\/html/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

        expect(response.text).toContain("Cannot DELETE /colors/34");
    });

    test("Invalid color ID", async () => {
        const response = await request
            .delete("/colors/asdfg")
            .expect(404)
            .expect("Content-Type" , /text\/html/);

            expect(response.text).toContain("Cannot DELETE /colors/asdfg");
        });

});

//test depends on multer.mock.ts, use multer.memoryStorage so no files are written to disk

     describe("POST /colors/:id/photo", () => {
        test("Valid request with PNG file upload", async () => {
            await request
                .post("/colors/23/photo")
                .attach("photo", "test-fixtures/file.png")
                .expect(201)
                .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        });

        test("Valid request with JPG file upload", async () => {
            await request
                .post("/colors/23/photo")
                .attach("photo", "test-fixtures/file.jpg")
                .expect(201)
                .expect("Access-Control-Allow-Origin", "http://localhost:8080");
        });

        test("Invalid request with text file upload", async () => {
            const response = await request
                .post("/colors/23/photo")
                .attach("photo", "test-fixtures/file.txt")
                .expect(500)
                .expect("Content-Type", /text\/html/);

            expect(response.text).toContain("Error: The uploaded file must be a jPG o PNG image.") ;
        });

        test("Invalid request with PNG file upload", async () => {
            const response = await request
            .post("/colors/asdfg/photo")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot POST /colors/asdfg/photo");
    });

    test("Invalid request with no file upload", async () => {
        const response = await request
        .post("/colors/34/photo")
        .expect(400)
        .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("No photo file uploaded.");
    });
});
