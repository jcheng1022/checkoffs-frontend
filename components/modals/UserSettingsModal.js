import {Modal, Tabs} from "antd";
import {useState} from "react";
import styled from "styled-components";
import ProfileSettings from "@/components/settingTabs/ProfileSettings";
import PrivacySettings from "@/components/settingTabs/PrivacySettings";

const UserSettingsModal = ({open, onCancel}) => {

    const [tabPosition, setTabPosition] = useState('top');


    const items = [
        {
            label: 'Profile',
            key: 'profile-settings-tab',
            children: <ProfileSettings />
        },
        {
            label: 'Privacy',
            key: 'privacy-settings-tab',
            children: <PrivacySettings />
        },
    ]


    let isMobile = false;
    if (window) {
        isMobile = window.matchMedia("(max-width: 600px)").matches;

    }

    return (
        <ModalContainer width={900} maskClosable={false} open={open} onCancel={onCancel} footer={null} centered>
          <div> My Settings</div>

            <Tabs
                tabPosition={isMobile ? 'top' : 'left'}
                items={items}
                className={'setting-container'}
            />
        </ModalContainer>
    )
}

export default UserSettingsModal


const ModalContainer = styled(Modal)`
    //.ant-tabs-tab {
    //  padding: 0px;
    //  margin: 0px;
    //  
    //}
    .setting-container {
      height: 500px;
        margin: 24px 0px;
    }
`


