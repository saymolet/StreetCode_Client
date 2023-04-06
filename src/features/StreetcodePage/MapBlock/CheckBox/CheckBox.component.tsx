import './CheckBox.styles.scss';

import { Checkbox , Radio, Space } from 'antd';
import useMobx from '@/app/stores/root-store';
import { observer } from 'mobx-react-lite';
import InfoComponent from '../Statistics/Info.component';

const CheckBoxComponent = () => {
    const { checkboxStore } = useMobx();
    const { setCheckBox, checkBoxesState: {streetcodes, streets, routes} } = checkboxStore;

    return (
        <div className="checkBoxContainer">
            <Radio.Group >
                <Space direction="horizontal">
                    <Checkbox className={"checkbox-line"} onChange={() => setCheckBox('streets')} checked={streets.isActive}> <h1 className="checkbox-text"> Вулиці </h1></Checkbox >
                    <Checkbox className={"checkbox-line"} onChange={() => setCheckBox('streetcodes')} checked={streetcodes.isActive}><h1 className="checkbox-text"> Стріткоди </h1></Checkbox >
                    {/* <Checkbox defaultChecked={false} disabled className={"checkbox-text"} onChange={() => setCheckBox('routes')} checked={routes.isActive}>Маршрути</Checkbox > */}
                    <InfoComponent/>
                </Space>
            </Radio.Group>
        </div>
    );
};
export default observer(CheckBoxComponent);
