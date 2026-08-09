export async function signup(
    app: any,
    email: string,
    password: string
) {

}

export function createTestUser() {
    return {
        name: "Test User",
        email: `test-${crypto.randomUUID()}@example.com`,
        password: "Password123!"
    };
}

export const TEST_USER = createTestUser();