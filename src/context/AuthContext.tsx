import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Check if user is already authenticated on mount
    useEffect(() => {
        const saved = localStorage.getItem('auth_token');
        if (saved) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (password: string): boolean => {
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        if (password === correctPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('auth_token', 'authenticated');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsEditing(false);
        localStorage.removeItem('auth_token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isEditing, setIsEditing }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
