import ResponseError from '../elementaryEntities/ResponseError';
import Services from './Services';
import { User as IUser } from '../interface/User';

interface ResponseUser {
    user: IUser;
}

class User extends Services {
    path = '/user'

    async getData(): Promise<ResponseUser | ResponseError> {
        try {
            this.checkAuth();
            const response = await fetch(`${this.host}${this.path}/`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
            const serializeResponse = await response.json();


            return serializeResponse;
        } catch (error: any) {
            return new ResponseError(error.message);
        }
    }

    async getFullData(): Promise<ResponseUser | ResponseError> {
        try {
            this.checkAuth();
            const response = await fetch(`${this.host}${this.path}/full`, {
                headers: {
                    Authorization: `Bearer ${this.getToken().token}`
                }
            });
            const serializeResponse = await response.json();


            return serializeResponse;
        } catch (error: any) {
            return new ResponseError(error.message);
        }
    }

    async changePassword(password: string): Promise<boolean> {
        try {
            this.checkAuth();
            const response = await fetch(`${this.host}${this.path}/password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    password
                })
            });

            return response.ok
        } catch {
            return false;
        }
    }

    async changeUsername(username: string): Promise<boolean> {
        try {
            this.checkAuth();
            const response = await fetch(`${this.host}${this.path}/username/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${this.getToken().token}`
                },
                body: JSON.stringify({
                    username
                })
            });

            return response.ok
        } catch {
            return false;
        }
    }
}

export default User;