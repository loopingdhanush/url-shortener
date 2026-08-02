import { z } from "zod";

const envSchema = z.object({

    PORT: z.coerce.number()
        .default(5000),

    NODE_ENV: z.enum([
        "development",
        "production",
        "test"
    ])
        .default("development"),

    DATABASE_URL: z.string()
        .optional(),

    REDIS_URL: z.string()
        .optional()
});


export const env = envSchema.parse(process.env);