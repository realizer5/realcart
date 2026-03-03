import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

const app = new Elysia()
  .use(cors())
  .use(
    jwt({
      name: "accessJwt",
      secret: process.env.ACCESS_TOKEN_SECRET!,
      exp: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    }),
  )
  .use(
    jwt({
      name: "refreshJwt",
      secret: process.env.REFRESH_TOKEN_SECRET!,
      exp: process.env.REFRESH_TOKEN_EXPIRY || "30d",
    }),
  );

export { app };
