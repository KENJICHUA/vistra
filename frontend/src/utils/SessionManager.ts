export interface SessionUser {
    id: string;
    user_id: string;
    email: string;
    role?: string;
}

const SESSION_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
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
    setTokens(
        accessToken: string,
        refreshToken: string,
    ):  void {
        this.set(SESSION_KEYS.ACCESS_TOKEN, accessToken);
        this.set(SESSION_KEYS.REFRESH_TOKEN, refreshToken);
    },
    setLogin(
        accessToken: string,
        refreshToken: string,
        user: SessionUser
    ): void {
        this.set(SESSION_KEYS.ACCESS_TOKEN, accessToken);
        this.set(SESSION_KEYS.REFRESH_TOKEN, refreshToken);
        this.set(SESSION_KEYS.USER, user);
    },

        getAccessToken(): string | null {
        return sessionStorage.getItem(
            SESSION_KEYS.ACCESS_TOKEN
        );
    },

    getRefreshToken(): string | null {
        return sessionStorage.getItem(
            SESSION_KEYS.REFRESH_TOKEN
        );
    },

    getUser(): SessionUser | null {
        return this.get<SessionUser>(
            SESSION_KEYS.USER
        ) as SessionUser | null;
    },

    setUser(user: SessionUser): void {
        this.set(SESSION_KEYS.USER, user);
    },

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    },

    getRole(): string | null {
        const user = this.getUser();
        const role = (user as { role?: unknown } | null)?.role;
        return typeof role === "string" && role.trim() ? role : null;
    },

    isStaff(): boolean {
        return this.getRole()?.toLowerCase() === "staff";
    },

    isPatientLike(): boolean {
        if (!this.isAuthenticated()) return false;
        const role = this.getRole()?.toLowerCase();
        if (!role) {
            // Sessions created before role was returned: infer from ID shape.
            // Patient IDs look like 20230518-S/F/A, staff look like UCC-xxx.
            const userId = this.getUser()?.user_id ?? "";
            return /^\d{8}-[SFA]$/i.test(userId.trim());
        }
        return role !== "staff";
    },

    logout(): void {
        this.remove(SESSION_KEYS.ACCESS_TOKEN);
        this.remove(SESSION_KEYS.USER);
    },
};