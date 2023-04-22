import './NewTimelineModal.style.scss';

import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import {
    Button,
    DatePicker, Form, Input, Modal, Select,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';

import useMobx from '@/app/stores/root-store';
import TimelineItem, {
    dateTimePickerTypes,
    HistoricalContext, selectDateOptions,
} from '@/models/timeline/chronology.model';

const NewTimelineModal:React.FC<{ timelineItem?:TimelineItem, open:boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = observer(({ timelineItem, open, setIsModalOpen }) => {
    const { timelineItemStore, historicalContextStore } = useMobx();
    const [form] = Form.useForm();
    const selectedContext = useRef<HistoricalContext[]>([]);
    const [dateTimePickerType, setDateTimePickerType] = useState<
    'date' | 'month' | 'year' | 'season-year'>('date');
    useEffect(() => {
        if (timelineItem && open) {
            form.setFieldsValue({
                title: timelineItem.title,
                description: timelineItem.description,
                date: dayjs(timelineItem.date),
                historicalContexts: timelineItem.historicalContexts.map((c) => c.title),
            });
            selectedContext.current = timelineItem.historicalContexts;
        } else {
            selectedContext.current = [];
        }
    }, [timelineItem, open, form]);
    useEffect(() => {
        historicalContextStore.fetchHistoricalContextAll();
    }, []);

    const onSuccesfulSubmit = (formValues:any) => {
        if (timelineItem) {
            const item = timelineItemStore.timelineItemMap.get(timelineItem.id);
            if (item) {
                item.date = new Date(formValues.date);
                item.title = formValues.title;
                item.description = formValues.description;
                item.historicalContexts = selectedContext.current;
            }
        } else {
            const newTimeline:TimelineItem = { date: formValues.date,
                                               id: timelineItemStore.timelineItemMap.size,
                                               title: formValues.title,
                                               description: formValues.description,
                                               historicalContexts: selectedContext.current,
                                               dateViewPattern: dateTimePickerTypes.indexOf(dateTimePickerType) };
            timelineItemStore.addTimeline(newTimeline);
        }

        setIsModalOpen(false);
        form.resetFields();
    };
    const onContextSelect = (value:string) => {
        const index = historicalContextStore.historicalContextArray.findIndex((c) => c.title === value);
        if (index < 0) {
            if (value.length > 50) {
                form.setFieldValue('historicalContexts', selectedContext.current.map((c) => c.title));
                return;
            }
            const newItem = { id: 0, title: value };
            historicalContextStore.addItemToArray(newItem);
            selectedContext.current.push(newItem);
        } else {
            selectedContext.current.push(historicalContextStore.historicalContextArray[index]);
        }
    };
    const onContextDeselect = (value:string) => {
        selectedContext.current = selectedContext.current.filter((s) => s.title !== value);
    };
    return (
        <Modal
            className="timeline-modal"
            open={open}
            onCancel={() => {
                setIsModalOpen(false);
            }}
            footer={[]}
        >
            <Form
                form={form}
                onFinish={onSuccesfulSubmit}
                labelCol={{ span: 5 }}
            >
                <Form.Item
                    name="title"
                    label="Назва: "
                    rules={[{ required: true, message: 'Введіть назву', max: 50 }]}
                >
                    <Input maxLength={50} showCount />
                </Form.Item>
                <div className="data-input-container">
                    <Form.Item
                        label="Дата: "
                        className="data-input-select-type"
                    >
                        <Select
                            className="date-picker-type-input"
                            options={selectDateOptions}
                            defaultValue={dateTimePickerType}
                            onChange={(val) => {
                                setDateTimePickerType(val);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        className="data-input"
                        rules={[{ required: true, message: 'Введіть дату' }]}
                    >
                        <DatePicker
                            picker={(dateTimePickerType !== 'season-year') ? dateTimePickerType : 'month'}
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    name="historicalContexts"
                    label="Контекст: "
                    className="historical-contexts-form-item"
                >
                    <Select
                        mode="tags"
                        onSelect={onContextSelect}
                        onDeselect={onContextDeselect}
                        maxLength={20}
                    >
                        {historicalContextStore.historicalContextArray
                            .map((cntx, index) => (
                                <Option
                                    key={`${cntx.id + index}`}
                                    value={cntx.title}
                                />
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Опис: "
                    rules={[{ required: true, message: 'Введіть опис' }]}
                >
                    <TextArea maxLength={400} showCount />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Зберегти
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
});
export default NewTimelineModal;
