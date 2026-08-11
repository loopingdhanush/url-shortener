import { setTimeout as sleep } from "node:timers/promises";

export async function waitFor<T>(
    fn: () => Promise<T>,
    options: {
        timeout?: number;
        interval?: number;
    } = {}
): Promise<T> {

    const timeout =
        options.timeout ?? 5000;

    const interval =
        options.interval ?? 100;

    const start =
        Date.now();

    let lastError: unknown;

    while (Date.now() - start < timeout) {

        try {

            return await fn();

        } catch (error) {

            lastError = error;

        }

        await sleep(interval);
    }

    throw lastError ??
    new Error("Timed out waiting for condition");
}