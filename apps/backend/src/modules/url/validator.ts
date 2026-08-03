import { z } from "zod";


export const createUrlSchema =
    z.object({

        originalUrl:
            z.string()
                .url(),


        customAlias:
            z.string()
                .min(3)
                .max(20)
                .optional(),


        expiresAt:
            z.coerce.date()
                .optional(),


        password:
            z.string()
                .min(4)
                .optional()

    });