import { Form } from 'antd';
const FormInputWrapper = ({ label = '', name = '', rules = '', className = '', ...props }) => {
    return (
        <Form.Item
            {...props}
            label={label}
            name={name}
            rules={rules}
            className={`input-wrapper ${className}`}>
            {props.children}
        </Form.Item>
    );
};
export default FormInputWrapper;
