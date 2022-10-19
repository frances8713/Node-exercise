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

//facendo npm test compare l'errore :
// TypeError: mock.mockReset is not a function

// 10 |
// 11 | beforeEach(() => {
// > 12 |   mockReset(prismaMock)
//    |            ^
// 13 | })
// 14 |
// 15 | export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

//ma questo dovrebbe far parte da ciò che dal codice presente in client.mock.ts che sarebbe quello copiato
//dal sito di jest.
