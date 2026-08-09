export interface CountResult {
    label: string | null;
    count: number;
}

export interface DailyClick {
    date: string;
    clicks: number;
}

export interface ReportSummary {
    totalClicks: number;
}

export interface ReportBreakdown {
    browsers: CountResult[];
    countries: CountResult[];
    devices: CountResult[];
    referrers: CountResult[];
}

export interface ReportCharts {
    dailyClicks: DailyClick[];
}

export interface UrlReport {
    summary: ReportSummary;
    charts: ReportCharts;
    breakdown: ReportBreakdown;
}