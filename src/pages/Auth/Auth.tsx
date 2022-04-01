import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Headline, { Levels } from '../../components/Headline';
import ResponseError from '../../elementaryEntities/ResponseError';
import useAuthContext from '../../hooks/useAuthContext';
import '../admission.scss';

interface AuthProps {
    isMobile: boolean;
}
const Auth = ({ isMobile }: AuthProps) => {
    const [error, setError] = useState<string>('');
    const authContext = useAuthContext();
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm({
        mode: 'onBlur'
    });
    const navigate = useNavigate();
    const goHome = () => navigate('/', { replace: true })

    const onSubmitHandler = (data: any) => {

        authContext.login(data.email, data.password, (error: ResponseError) => {
            if (error) {
                setError(error.error)
            } else {
                setError('')
                goHome();
            }
        });
    };

    return (
        <div className='admission-page'>
            <div className='admission-page__body'>
                <Headline
                    img={require('./enter.png')}
                    level={Levels.Second}
                    isMobile={isMobile}
                    value='Вход в аккаунт'
                />

                <div className='admission-page__response-server'>
                    {error}
                </div>

                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className='admission-page__form'
                >
                    <label className='admission-page__field'>
                        <span className='admission-page__label'>Почта:</span>

                        <input
                            className='admission-page__input'
                            {...register('email', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 6,
                                    message: 'минимум 6 символов'
                                }
                            })}
                        />

                        <span className='admission-page__error-message'>
                            {errors?.email?.message}
                        </span>
                    </label>

                    <label className='admission-page__field'>
                        <span className='admission-page__label'>Почта:</span>

                        <input
                            className='admission-page__input'
                            {...register('password', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 6,
                                    message: 'минимум 6 символов'
                                }
                            })}
                        />

                        <span className='admission-page__error-message'>
                            {errors?.password?.message}
                        </span>
                    </label>

                    <div className='admission-page__submit'>
                        <input type='submit' disabled={!isValid} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;



/* authContext.login('', '', (error: ResponseError) => {
    if (error) {
        // ашибка здесь
    } else {
        // redirect здесь
    }
}); */