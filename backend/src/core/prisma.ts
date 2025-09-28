import { PrismaClient } from "../../generated/prisma"

export class PrismaService {
    private static instance: PrismaClient;

    private constructor() { }

    public static getInstance(): PrismaClient {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaClient();
        }
        return PrismaService.instance;
    }

    public static async connect() {
        try {
            await PrismaService.getInstance().$connect();
            console.log("✅ Connected to PostgreSQL");
        } catch (err) {
            console.error("❌ Prisma connection failed:", err);
            process.exit(1);
        }
    }

    public static async disconnect() {
        await PrismaService.getInstance().$disconnect();
        console.log("⚡ Prisma disconnected");
    }
}
