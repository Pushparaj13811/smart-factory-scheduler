// src/routes/index.ts
import { Elysia } from "elysia";
import ExampleRoute from "./exampleRoutes";

export default function registerRoutes(app: Elysia) {
    new ExampleRoute(app);
}
