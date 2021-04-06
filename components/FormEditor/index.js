import React, { memo, RefObject, useEffect, useMemo } from 'react';
import { Form, Select, InputNumber, Input, Radio } from 'antd';
// import Upload from '../Upload';
// import DataList from '../DataList';
// import MutiText from '../MutiText';
import Color from './Color';
import Upload from './Uploads';
// import CardPicker from '../CardPicker';
// import Table from '../Table';
// import Pos from '../Pos';
// import { Store } from 'antd/lib/form/interface';
// import RichText from '../XEditor';
// import FormItems from '../FormItems';
import styles from './styles.module.css';
const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    //待修改
    return e;
  }
  return e && e.imgUrl;
};

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  labelAlign: 'left'
};

const FormEditor = (props) => {
  const { config, defaultValue, onSave, uid, rightPannelRef } = props;
  console.log(config, 'config');
  const onFinish = (values) => {
    onSave && onSave(values);
  };
  const [form] = Form.useForm();
  useMemo(()=>{
    form.setFieldsValue(defaultValue)
  },[defaultValue]);
  
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [uid, form]);

  const handlechange = () => {
    console.log(form.getFieldsValue(), '===form.getFieldsValue()==');
    onFinish(form.getFieldsValue());
  };
  //const dispatch = useDispatch();
  // const {count} = useClock();
  return (
    <Form
      form={form}
      name={`form_editor`}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={defaultValue}
      onValuesChange={handlechange}
      className={styles.formEditor}
    >
      {config.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {item.type === 'Number' && (
              <Form.Item label={item.name} name={item.key}>
                <InputNumber max={item.range && item.range[1]} />
              </Form.Item>
            )}
            {item.type === 'Text' && (
              <Form.Item label={item.name} name={item.key}>
                <Input />
              </Form.Item>
            )}
            {item.type === 'TextArea' && (
              <Form.Item label={item.name} name={item.key}>
                <TextArea rows={4} />
              </Form.Item>
            )}
            {item.type === 'MutiText' && (
              <Form.Item label={item.name} name={item.key}>
                <MutiText />
              </Form.Item>
            )}
            {item.type === 'DataList' && (
              <Form.Item label={item.name} name={item.key}>
                <DataList cropRate={item.cropRate} />
              </Form.Item>
            )}
            {item.type === 'Color' && (
              <Form.Item label={item.name} name={item.key}>
                <Color />
              </Form.Item>
            )}

            {item.type === 'Select' && (
              <Form.Item label={item.name} name={item.key}>
                <Select placeholder="请选择">
                  {item.range.map((v, i) => {
                    return (
                      <Option value={v.key} key={i}>
                        {v.text}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            {item.type === 'Radio' && (
              <Form.Item label={item.name} name={item.key}>
                <Radio.Group>
                  {item.range.map((v, i) => {
                    return (
                      <Radio value={v.key} key={i}>
                        {v.text}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            )}
            {item.type === 'Switch' && (
              <Form.Item label={item.name} name={item.key} valuePropName="checked">
                {/* <Switch /> */}
              </Form.Item>
            )}
            {item.type === 'Upload' && (
              <Form.Item
                label={item.name}
                name={item.key}
                valuePropName="imgUrl"
                getValueFromEvent={normFile}
              >
                <Upload/>
              </Form.Item>
            )}
            {item.type === 'CardPicker' && (
              <Form.Item label={item.name} name={item.key} valuePropName="type">
                {/* <CardPicker icons={item.icons} type={defaultValue['type']} /> */}
              </Form.Item>
            )}
            {item.type === 'Table' && (
              <Form.Item label={item.name} name={item.key} valuePropName="data">
                {/* <Table data={item.data} /> */}
              </Form.Item>
            )}
            {item.type === 'Pos' && (
              <Form.Item label={item.name} name={item.key}>
                {/* <Pos /> */}
              </Form.Item>
            )}
            {item.type === 'FormItems' && (
              <Form.Item name={item.key} valuePropName="formList">
                {/* <FormItems data={item.data} rightPannelRef={rightPannelRef} /> */}
              </Form.Item>
            )}
            {item.type === 'RichText' && (
              <Form.Item label={item.name} name={item.key} noStyle={true}>
                {/* <RichText /> */}
              </Form.Item>
            )}
          </React.Fragment>
        );
      })}
    </Form>
  );
};

export default memo(FormEditor);
