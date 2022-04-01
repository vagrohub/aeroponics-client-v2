import { getDateDifference } from '../../../../utils/date';
import { Measurement } from '../../../../interface/User';
import { useMeasurementContext } from '../../hooks';
import IndicatorsRow from './IndicatorsRow';
import './indicators.scss'
import CardInfo from '../../../CardInfo';

interface IndicatorsProps {
    measurement: Measurement;

}
const Indicators = ({ measurement }: IndicatorsProps) => {
    const { isMobile } = useMeasurementContext();

    const lightOnTime = getDateDifference(
        measurement.lightOffTime,
        measurement.lightWorkingTime
    ).toLocaleDateString();
    const { tempWater, tempRoom } = measurement;
    const error = measurement.danger ? 'Да' : 'Нет';

    return (
        <div className='indicators'>
            <CardInfo isMobile={isMobile}>
                <CardInfo.Title>Последние измерения</CardInfo.Title>

                <CardInfo.Body>
                    <CardInfo.Group>
                        <CardInfo.Row>
                            <IndicatorsRow label='Температура помещения' value={`${tempRoom}`} />
                        </CardInfo.Row>
                        <CardInfo.Row>
                            <IndicatorsRow label='Температура воды' value={`${tempWater}`} />
                        </CardInfo.Row>
                    </CardInfo.Group>
                    <CardInfo.Group>
                        <CardInfo.Row>
                            <IndicatorsRow label='Время включения светя' value={lightOnTime} />
                        </CardInfo.Row>
                    </CardInfo.Group>
                    <CardInfo.Group>
                        <CardInfo.Row>
                            <IndicatorsRow label='Ошибки' value={error} />
                        </CardInfo.Row>
                    </CardInfo.Group>
                </CardInfo.Body>
            </CardInfo>
        </div>
    );
};

export default Indicators;
