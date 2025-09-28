import { Elysia } from "elysia";
import routes from "./routes/index"
export class App {
    private app: Elysia;

    constructor() {
        this.app = new Elysia();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware() {
        this.app.onRequest(({ request }) => {
            console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
        });
    }

    private setupRoutes() {
        routes(this.app);
    }

    public getInstance(): Elysia {
        return this.app;
    }
}
