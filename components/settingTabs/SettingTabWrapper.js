import styled from "styled-components";
import {Button, message, notification, Spin} from "antd";
import {theme} from "@/styles/themes";
import {useState} from "react";
import {useAppContext} from "@/context/AppContext";

const SettingTabWrapper = ({children, onClear, onSubmit}) => {

    const [isLoading, setIsLoading]  = useState(false)
    const [messageApi] = message.useMessage();
    const {setOpenUserSettings} = useAppContext();



    const handleSubmit = () => {
        setIsLoading(true)
        onSubmit().then(() => {
            notification.success({
                message: 'Success',
                description: 'Settings updated successfully'
            })
        }).catch((e) => {
            setIsLoading(false)
           notification.error({
                message: 'Error',
                description: e.message
           })
        }).finally(() => {
            setIsLoading(false)

        })
    }

    const closeModal = () => {
        onClear();
        setOpenUserSettings(false)
    }
    return (
        <Container>
            { isLoading ? <Spin /> : (
                    <>
                        {children}

                        <ActionContainer align={'flex-end'}>
                            <Button className={'cancel-btn'} onClick={closeModal} >
                                Cancel
                            </Button>
                            <Button className={'save-btn'} onClick={handleSubmit}>
                                Save
                            </Button>
                        </ActionContainer>
                    </>
                )}

        </Container>
    )
}

export default SettingTabWrapper;

const Container = styled.div`
  width: 100%;
  height: 450px;
  position: relative;
`

const ActionContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  text-align: end;
  padding: 10px; /* Add some padding for spacing */

  button {
    margin: 0px 6px;
    height: 50px;
    border-radius: 14px;
    letter-spacing: 2px;
    font-size: 16px;
  }

  .cancel-btn {
    width: 100px;
    font-weight: 600;
    background-color: ${theme.skeleton};
    color: ${theme.darkBlue_1};

  }

  .save-btn {
    width: 125px;
    background-color: ${theme.darkBlue_1};
    color: white;
  }
  }
`
