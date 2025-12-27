import { useState } from 'react';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
}

const useAuth = () => {
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
    });

    const login = (username: string) => {
        setAuth({
            isAuthenticated: true,
            user: username,
        });
    };

    const logout = () => {
        setAuth({
            isAuthenticated: false,
            user: null,
        });
    };

    return {
        ...auth,
        login,
        logout,
    };
};

export default useAuth;