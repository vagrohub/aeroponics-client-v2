import { Token } from './interface';
import config from '../config';

class Services {
    host = config.HOST;

    checkAuth(): void {
        if (!localStorage.getItem('token')) {
            throw new Error('User not authorized');
        }
    }

    getToken(): Token {
        return { token: localStorage.getItem('token') || 'untoken' }
    }
}

export default Services;