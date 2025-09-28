import { createClient, type RedisClientType } from "redis";

export class RedisService {
    private static instance: RedisClientType | any = null;

    private constructor() {}

    public static getInstance(): RedisClientType {
        if (!RedisService.instance) {
            const redisOptions: Parameters<typeof createClient>[0] = {
                socket: {
                    host: process.env['REDIS_HOST'] || "127.0.0.1",
                    port: process.env['REDIS_PORT'] ? parseInt(process.env['REDIS_PORT']) : 6379,
                },
                ...(process.env['REDIS_PASSWORD'] ? { password: process.env['REDIS_PASSWORD'] } : {}),
            };

            RedisService.instance = createClient(redisOptions);

            RedisService.instance.on("error", (err: Error) => {
                console.error("❌ Redis client error:", err);
            });
        }

        return RedisService.instance;
    }

    public static async connect(): Promise<void> {
        try {
            const client = RedisService.getInstance();
            await client.connect();
            await client.set("ping", "pong");
            console.log("✅ Connected to Redis");
        } catch (err) {
            console.error("❌ Redis connection failed:", err);
            process.exit(1);
        }
    }

    public static async disconnect(): Promise<void> {
        try {
            const client = RedisService.getInstance();
            await client.disconnect();
            console.log("⚡ Redis disconnected");
        } catch (err) {
            console.error("❌ Redis disconnect failed:", err);
        }
    }
}
