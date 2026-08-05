export const CacheKeys = {

    url: (slug: string) =>
        `url:${slug}`,

    user: (id: string) =>
        `user:${id}`,

    session: (id: string) =>
        `session:${id}`

} as const;