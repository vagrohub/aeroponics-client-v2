import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader/Preloader';
import UserService from '../serverServices/User';
import { User } from '../interface/User';
import ResponseError from '../elementaryEntities/ResponseError';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

interface WithDashboardProps {
    Component: any;
    isMobile: boolean;
}

const WithDashboard = ({ Component, isMobile }: WithDashboardProps) => {
    const [user, setUser] = useState<User | undefined>();
    const authContext = useAuthContext();

    useEffect(() => {
        const getUser = async () => {
            const userService = new UserService();
            const response = await userService.getFullData();

            if (response instanceof ResponseError) {
                // ignore
            } else {
                console.log(response.user)
                setUser(response.user)
            }
        };

        getUser();
    });

    if (!authContext.token) {
        return (
            <Navigate to='/auth' />
        );
    }

    if (user) {
        return (
            <Component user={user} isMobile={isMobile} />
        );
    }

    return (
        <Preloader isMobile={isMobile}>
            Данные загружаются. Пожалйста подождите
        </Preloader>
    )
}

export default WithDashboard;