import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import WithDashboard from '../hoc/WithDashboard';
import AuthProvider from '../hoc/AuthProvider';
import './app.scss';

const getWindowWidth = (): number => document.documentElement.clientWidth;

(async function () {

})();

const App = () => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());
    const isMobile = windowWidth <= 858;

    const onResizeEvent = () => setWindowWidth(getWindowWidth());
    useEffect(() => {
        window.addEventListener('resize', onResizeEvent);

        return () => window.removeEventListener('resize', onResizeEvent);
    }, []);

    return (
        <AuthProvider>
            <Routes>
                <Route
                    path='/'
                    element={
                        <WithDashboard Component={Dashboard} isMobile={isMobile} />
                    }
                />
                <Route path='/auth' element={<Auth isMobile={isMobile} />} />
                <Route path='/registration' element={<Registration isMobile={isMobile} />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
