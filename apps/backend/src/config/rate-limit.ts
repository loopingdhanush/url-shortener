export const rateLimitConfig = {
    general: {
        keyPrefix: "general",
        windowSeconds: 60,
        maxRequests: 100,
    },

    auth: {
        keyPrefix: "auth",
        windowSeconds: 60,
        maxRequests: 10,
    },

    createUrl: {
        keyPrefix: "create-url",
        windowSeconds: 60,
        maxRequests: 20,
    },

    redirect: {
        keyPrefix: "redirect",
        windowSeconds: 60,
        maxRequests: 300,
    },
};