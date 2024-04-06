import styled from "styled-components";
import {Modal} from "antd";

const ImageViewerModal = ({open = false, onCancel = () => {}, image = ''}) => {

    return (
        <ModalContainer open={open} onCancel={onCancel}>
            <img src={image} alt={'image'} style={{width: '100%'}}/>
        </ModalContainer>
    )
}

export default ImageViewerModal;

const ModalContainer = styled(Modal)``
