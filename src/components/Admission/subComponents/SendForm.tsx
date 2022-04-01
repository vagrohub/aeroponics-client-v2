import SimpleButton from '../../SimpleButton';
import useAdmissionContext from '../hooks';

interface SendFormProps {
    children: string;
    onSubmitHandler(event: SubmitEvent): void
}
const SendForm = ({ children, onSubmitHandler }: SendFormProps) => {
    const { isMobile } = useAdmissionContext();

    return (
        <div className='admission__submit'>
            <SimpleButton
                isMobile={isMobile}
                isDisabled={false}
                isFill={isMobile}
                value={children}
                text={children}
                type='submit'
                onClick={onSubmitHandler}
            />
        </div>
    );
};

export default SendForm;