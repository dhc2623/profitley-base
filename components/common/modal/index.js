import { Modal } from 'antd';
const ModalWrapper = (props) => {
    return (
        <Modal {...props} cancelButtonProps={{ type: 'ghost' }}>
            {props.children}
        </Modal>
    );
};
export default ModalWrapper;
