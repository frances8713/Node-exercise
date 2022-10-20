import { Static, Type } from "@sinclair/typebox";

export const colorSchema = Type.Object({
    name: Type.String(),
    description: Type.Optional(Type.String()),
}, { additionalProperties: false});

export type ColorData = Static<typeof colorSchema>;
