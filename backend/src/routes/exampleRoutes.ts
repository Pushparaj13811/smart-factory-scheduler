// src/routes/exampleRoute.ts
import { Elysia } from "elysia";

class ExampleRoute {
    constructor(private app: Elysia) {
        this.registerRoutes();
    }

    private getPath(): string {
        return "/example";
    }

    private registerRoutes() {
        this.app.get(this.getPath(), () => {
            return { message: "This is an example route" };
        });
    }
}

export default ExampleRoute;
