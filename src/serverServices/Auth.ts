import ResponseError from '../elementaryEntities/ResponseError';
import Token from '../elementaryEntities/Token';
import Services from './Services';

class Auth extends Services {
    path = '/auth'

    async registration(
        email: string,
        username: string,
        password: string
    ): Promise<Token | ResponseError> {
        try {
            const response = await fetch(`${this.host}${this.path}/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });
            const serializeResponse = await response.json();

            if (serializeResponse.token) {
                const { token } = serializeResponse;
                localStorage.setItem('token', token);

                return new Token(token);
            }

            return new ResponseError(serializeResponse.error);
        } catch (error: any) {
            return new ResponseError(error.message);
        }
    }

    async login(email: string, password: string): Promise<Token | ResponseError> {
        try {
            const response = await fetch(`${this.host}${this.path}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const serializeResponse = await response.json();

            if (serializeResponse.token) {
                const { token } = serializeResponse;
                localStorage.setItem('token', token);

                return new Token(token);
            }

            return new ResponseError(serializeResponse.error);
        } catch (error: any) {
            return new ResponseError(error.message);
        }
    }

    logout(): boolean {
        this.checkAuth();
        localStorage.removeItem('token');
        return true;
    }
}

export default Auth;