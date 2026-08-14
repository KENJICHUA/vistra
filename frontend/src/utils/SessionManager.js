const SESSION_KEYS = {
    ACCESS_TOKEN: "access_token",
    USER: "user",
};

export const sessionManager = {
    set(key, value) {
        sessionStorage.setItem(
            key,
            typeof value === "string" ? value : JSON.stringify(value)
        );
    },

    get(key) {
        const value = sessionStorage.getItem(key);

        if (value === null) {
            return null;
        }

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    },

    remove(key) {
        sessionStorage.removeItem(key);
    },

    clear() {
        sessionStorage.clear();
    },

    setLogin(accessToken, user) {
        this.set(SESSION_KEYS.ACCESS_TOKEN, accessToken);
        this.set(SESSION_KEYS.USER, user);
    },

    getAccessToken() {
        return sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN);
    },

    getUser() {
        return this.get(SESSION_KEYS.USER);
    },

    isAuthenticated() {
        return !!this.getAccessToken();
    },

    logout() {
        this.remove(SESSION_KEYS.ACCESS_TOKEN);
        this.remove(SESSION_KEYS.USER);
    },
};