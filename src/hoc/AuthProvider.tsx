import { createContext, useState } from 'react';
import ResponseError from '../elementaryEntities/ResponseError';
import Token from '../elementaryEntities/Token';
import AuthService from '../serverServices/Auth';

const AuthContext = createContext({
    token: localStorage.getItem('token') || null,
    async login(email: string, password: string, cb: Function) { },
    async registration(email: string, username: string, password: string, cb: Function) { },
    signout(cb: Function) { }
});

interface AuthProviderProps {
    children: JSX.Element[] | JSX.Element
}
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token') || '');
    const authService = new AuthService();

    const responseHandler = (response: Token | ResponseError, cb: Function) => {
        if (response instanceof ResponseError) {
            cb(response);
        } else {
            setToken(response.token);
            cb(null);
        }
    };

    const login = async (
        email: string,
        password: string,
        cb: Function
    ) => {
        const response = await authService.login(email, password);

        responseHandler(response, cb);
    };
    const registration = async (
        email: string,
        username: string,
        password: string,
        cb: Function
    ) => {
        const response = await authService.registration(email, username, password);

        responseHandler(response, cb);
    };
    const signout = async (cb: Function) => {
        setToken(null);
        authService.logout();
        cb();
    };

    const value = {
        token,
        login,
        registration,
        signout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export {
    AuthContext
}