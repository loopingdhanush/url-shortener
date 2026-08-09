import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: [
            "./src/tests/setup.ts"
        ],
        fileParallelism: false,
        sequence: {
            concurrent: false
        },
        include: [
            "src/tests/**/*.test.ts"
        ],
        coverage: {
            provider: "v8",
            reporter: [
                "text",
                "html"
            ]
        },

    }
});