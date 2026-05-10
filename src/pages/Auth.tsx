import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminPanel from '../components/AdminPanel';
import '../styles/Auth.css';

export default function Auth() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            setPassword('');
            setError('');
        } else {
            setError('Invalid password');
            setPassword('');
        }
    };

    // If authenticated, show admin panel
    if (isAuthenticated) {
        return <AdminPanel />;
    }

    // Otherwise show login form
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>🔐 Admin Access</h1>
                <p className="auth-subtitle">Enter password to access content management</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        placeholder="Enter password"
                        className="auth-input"
                        autoFocus
                    />

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>

                <p className="auth-hint">
                    💡 Password is stored in .env file (VITE_ADMIN_PASSWORD)
                </p>
            </div>
        </div>
    );
}
