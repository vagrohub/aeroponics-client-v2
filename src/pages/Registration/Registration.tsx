import { Link } from 'react-router-dom';
import Admission from '../../components/Admission';

interface RegistrationProps {
    isMobile: boolean;
}
const Registration = ({ isMobile }: RegistrationProps) => {

    const onSubmitHandler = (event: SubmitEvent) => {
        event.preventDefault();
        console.log(event);
    }

    return (
        <Admission isMobile={isMobile}>
            <Admission.Title img={require('./registration.png')}>Регистрация</Admission.Title>

            <Admission.Login />

            <Admission.Password />

            <Admission.Footer>
                <Admission.SendForm
                    onSubmitHandler={onSubmitHandler}
                >
                    Зарегистрироваться
                </Admission.SendForm>

                <span>Есть аккаунта? <Link to='/auth'>Войти</Link></span>
            </Admission.Footer>
        </Admission>
    );
};

export default Registration;