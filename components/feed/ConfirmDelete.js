import {Button, Modal} from "antd";
import {FlexBox, Gap} from "@/components/core";

const ConfirmDelete = ({open, onCancel, onSubmit}) => {
    return (
        <Modal open={open} onCancel={onCancel} footer={[]} closeIcon={false} centered>
            <div style={{textAlign: 'center', fontSize: 16, marginBottom: 8}}> Are you sure you want to delete this activity? </div>
            <div style={{textAlign: 'center', fontSize: 12}}> This is a irreversible action and this activity can not be recovered.
                We suggest archiving the activity instead if needed  </div>
            <Gap gap={24}/>
            <FlexBox gap={12} justify={'center'} >
                <Button onClick={onCancel} width={500}> Cancel </Button>

                <Button onClick={onSubmit}  className={'btns'} danger> Delete </Button>
            </FlexBox>
        </Modal>
    )
}

export default ConfirmDelete


