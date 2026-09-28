export interface AnalyticsEvent {
    urlId: string;

    browser?: string;
    operatingSystem?: string;
    device: string;

    ipAddress?: string;
    userAgent?: string;
    referrer?: string | null;

    clickedAt: Date;
}