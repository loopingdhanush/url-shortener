export interface AnalyticsEvent {

    urlId: string;

    ipAddress?: string;

    userAgent?: string;

    referrer?: string | null;

    clickedAt: Date;

}