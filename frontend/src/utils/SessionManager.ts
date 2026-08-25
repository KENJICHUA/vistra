export interface SessionUser {
    id: string;
    staff_id: string;
    email: string;
}

const SESSION_KEYS = {
    ACCESS_TOKEN: "access_token",
    USER: "user",
} as const;

type SessionKey =
    (typeof SESSION_KEYS)[keyof typeof SESSION_KEYS];

export const sessionManager = {
    set(key: SessionKey, value: unknown): void {
        sessionStorage.setItem(
            key,
            typeof value === "string"
                ? value
                : JSON.stringify(value)
        );
    },

        get<T = unknown>(key: SessionKey): T | string | null {
        const value = sessionStorage.getItem(key);

        if (value === null) {
            return null;
        }

        try {
            return JSON.parse(value) as T;
        } catch {
            return value;
        }
    },

    remove(key: SessionKey): void {
        sessionStorage.removeItem(key);
    },

        clear(): void {
        sessionStorage.clear();
    },

        setLogin(
            accessToken: string,
        user: SessionUser
    ): void {
        this.set(SESSION_KEYS.ACCESS_TOKEN, accessToken);
        this.set(SESSION_KEYS.USER, user);
    },

        getAccessToken(): string | null {
        return sessionStorage.getItem(
            SESSION_KEYS.ACCESS_TOKEN
        );
    },

    getUser(): SessionUser | null {
        return this.get<SessionUser>(
            SESSION_KEYS.USER
        ) as SessionUser | null;
    },

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    },

    logout(): void {
        this.remove(SESSION_KEYS.ACCESS_TOKEN);
        this.remove(SESSION_KEYS.USER);
    },
};