import express, { Router } from "express";
import prisma from "../lib/prisma/client";
import { validate, colorSchema, ColorData} from "../lib/middleware/validation";
import { initMulterMiddleware } from "../lib/middleware/multer";

const upload = initMulterMiddleware();

const router = Router();
router.get("/", async (request, response) => {
    const colors = await prisma.colors.findMany();
    response.json(colors)
    });

    router.get("/:id(\\d+)", async (request, response, next) => {
        const colorId = Number(request.params.id)
        const color = await prisma.colors.findUnique({
            where: {id : colorId}});

            if(!color){
                response.status(404);
                return next(`Cannot GET /colors/${colorId}`)
            }
            response.json(color)
        });



    router.post("/", validate({ body: colorSchema}), async (request, response) => {
        const colorData : ColorData = request.body;

        const color = await prisma.colors.create({
            data : colorData
        })
        response.status(201).json(color)
        });

    router.put("/:id(\\d+)", validate({ body: colorSchema}), async (request, response, next) => {
        const colorId = Number(request.params.id);
        const colorData : ColorData = request.body;

        try{
            const color = await prisma.colors.update({
                where: { id: colorId },
                data : colorData
            });
            response.status(200).json(color)
        } catch(error) {
            response.status(404);
            next(`Cannot PUT /colors/${colorId}`);
        };
    });

    router.delete("/:id(\\d+)", async (request, response, next) => {
        const colorId = Number(request.params.id);
        try {
            await prisma.colors.delete({
                where: { id: colorId }
            });
            response.status(204).end()
        } catch(error) {
            response.status(404);
            next(`Cannot DELETE /colors/${colorId}`);
        };
    });

    router.post("/:id(\\d+)/photo",
        upload.single("photo"),
    async (request, response, next) => {

        if(!request.file) {
            response.status(400)
            return next("No photo file uploaded.");
        }

        const photoFilename = request.file.filename;
        response.status(201).json({ photoFilename })
    });

router.use("/colors/photos", express.static("uploads"));


export default router;


