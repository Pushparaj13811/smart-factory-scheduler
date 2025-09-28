import { App } from "./app";
import { PrismaService } from "./core/prisma";
import { RedisService } from "./core/redis";

class Server {
    private app: App;
    private port: number;

    constructor(port?: number) {
        this.app = new App();
        this.port = port || (process.env['PORT'] ? parseInt(process.env['PORT']) : 3000);
    }

    public async start() {
        await PrismaService.connect();
        await RedisService.connect();

        const server = await this.app.getInstance().listen({ port: this.port });
        console.log(`🚀 Server running at http://localhost:${this.port}`);

        const shutdown = async () => {
            console.log("⚡ Shutting down server...");
            await PrismaService.disconnect();
            await RedisService.disconnect();
            server.stop();
            process.exit(0);
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    }
}

// Start server
new Server().start();
