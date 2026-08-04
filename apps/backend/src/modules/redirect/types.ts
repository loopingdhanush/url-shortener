export interface RedirectTarget {
    id: string;
    originalUrl: string;
    isActive: boolean;
    expiresAt: Date | null;
}

export interface IRedirectRepository {

    findBySlug(
        slug: string
    ): Promise<RedirectTarget | null>;

}