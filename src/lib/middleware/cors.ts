import cors from "cors";

export function initCorseMiddleware() {
    const corsOptions = {
        origin: "http://localhost:8080",
        credentials: true,
     };
     return cors(corsOptions);
}
