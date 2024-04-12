import SettingTabWrapper from "@/components/settingTabs/SettingTabWrapper";
import {useEffect, useState} from "react";
import {ColorPicker, Input} from "antd";
import styled from "styled-components";
import {theme} from "@/styles/themes";
import {useCurrentUser, useUserIsLoggedIn, useUserSettings} from "@/hooks/user.hook";
import APIClient from '@/services/api'
import {useQueryClient} from "@tanstack/react-query";
const ProfileSettings = () => {

    const [form, setForm] = useState({})
    const isLoggedIn = useUserIsLoggedIn();
    const {data: user} = useCurrentUser();
    const {data: profileSettings} = useUserSettings(isLoggedIn, 'profile')

     const [colorPickerOpen, setColorPickerOpen] = useState(true)
    const client = useQueryClient();
    useEffect(() => {

        if (profileSettings) {
            console.log(profileSettings,2)
            setForm({
                username: profileSettings.username,
                profileColor: profileSettings.profileColor
            })
        }

    }, [profileSettings])



    const handleInputChange = (name) => (e) => {
        console.log(e,222)
        const val = typeof e === 'object' ? e.target.value : e
        setForm({
            ...form,
            [name]: val
        })
    }

    const onSubmit = () => {
        return APIClient.api.patch(`/user/settings`, form).then(() => {
            console.log(`refetch hit`)
            client.refetchQueries({queryKey: ['settings', 'profile']})
            client.refetchQueries({queryKey: ['currentUser']})
            client.refetchQueries({queryKey: ['user', user?.id, 'profile']})

        })
        console.log('submitting form', form)
    }

    const onClear = () => {
        setForm({})
    }

    console.log(form?.profileColor, 928, typeof form?.profileColor)
    return (
        <SettingTabWrapper onSubmit={onSubmit } onClear={onClear}>
            <Container>

                {/* TODO*/}
                {/*<div className={'form-cluster'}>*/}
                {/*    <div className={'label'}>*/}
                {/*        Avatar*/}
                {/*    </div>*/}
                {/*    <Input />*/}
                {/*    <div className={'description'}>*/}
                {/*        This username will be shown to other users across the website. Every username is unique and references a specific user.*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={'form-cluster'}>
                    <div className={'label'}>
                        Username
                    </div>
                    <Input value={form?.username} onChange={handleInputChange('username')} />
                    <div className={'description'}>
                        This username will be shown to other users across the website. Every username is unique and references a specific user.
                    </div>
                </div>

                <div className={'form-cluster'}>
                    <div className={'label'}>
                        Profile Color
                    </div>
                    <ColorPicker value={form?.profileColor} onChangeComplete={(color => setForm({...form, profileColor: color?.toHex()}))} />
                    <div className={'description'}>
                        This color will be used to decorate your profile
                    </div>
                </div>

            </Container>
        </SettingTabWrapper>
    )
}

export default ProfileSettings;


const Container = styled.div`
  .form-cluster { 
    margin: 12px 0px;
  }
  
  .description {
    font-size: 10px;
    font-style: italic;
    color: ${theme.GREY};
  }
`
