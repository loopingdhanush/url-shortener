// jobs/types.ts

export interface ClickEventJob {
    urlId: string;

    ipAddress?: string;

    userAgent?: string;

    referrer?: string;

    clickedAt: Date;
}