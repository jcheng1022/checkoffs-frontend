import SettingTabWrapper from "@/components/settingTabs/SettingTabWrapper";
import {useEffect, useState} from "react";
import {Select} from "antd";
import styled from "styled-components";
import {theme} from "@/styles/themes";
import {useCurrentUser, useUserIsLoggedIn, useUserSettings} from "@/hooks/user.hook";
import APIClient from '@/services/api'
import {useQueryClient} from "@tanstack/react-query";
import {PRIVACY_OPTIONS} from "@/constants";

const ProfileSettings = () => {

    const [form, setForm] = useState({})
    const isLoggedIn = useUserIsLoggedIn();
    const {data: user} = useCurrentUser();
    const {data: profileSettings} = useUserSettings(isLoggedIn, 'privacy')

    const client = useQueryClient();
    useEffect(() => {

        if (profileSettings) {
            console.log(profileSettings,2)
            setForm({
                postPrivacy: profileSettings?.postPrivacy,
                profilePrivacy: profileSettings?.profilePrivacy,
                friendPrivacy: profileSettings?.friendPrivacy,
            })
        }

    }, [profileSettings, user])



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
        onClear();
        console.log('submitting form', form)
    }

    const onClear = () => {
        setForm({})
    }

    const settingOptions = [
        {
            label: 'Everyone',
            value: PRIVACY_OPTIONS.EVERYONE
        },
        {
            label: 'Friends',
            value: PRIVACY_OPTIONS.FRIENDS
        },
        {
            label: 'Only Me',
            value: PRIVACY_OPTIONS.PRIVATE
        },
    ]

    console.log(form?.profileColor, 928, typeof form?.profileColor)
    return (
        <SettingTabWrapper onSubmit={onSubmit } onClear={onClear}>
            <Container>



                <div className={'form-cluster'}>
                    <div className={'label'}>
                        Who can see your <span style={{fontWeight:'bold'}}> profile </span>
                    </div>
                    <Select placeholder={'Activity Feed'} className={'setting-select'} options={settingOptions} value={form?.viewProfile} onChange={handleInputChange('viewProfile')} />
                    <div className={'description'}>
                        Only authorized users can see your profile. All users can visit profiles by default
                    </div>
                </div>

                <div className={'form-cluster'}>
                    <div className={'label'}>
                        Who can see your  <span style={{fontWeight:'bold'}}>posts </span>
                    </div>
                    <Select placeholder={'Posts'} className={'setting-select'} options={settingOptions} value={form?.viewPosts} onChange={handleInputChange('viewPosts')} />
                    <div className={'description'}>
                        This setting will determine who can see your posts
                    </div>
                </div>


                <div className={'form-cluster'}>
                    <div className={'label'}>
                       Who can see your  <span style={{fontWeight:'bold'}}> {`friends's list`}</span>
                    </div>
                    <Select placeholder={`Friend's list`} className={'setting-select'} options={settingOptions} value={form?.viewFriendsList} onChange={handleInputChange('viewFriendsList')} />
                    <div className={'description'}>
                        {`Disabling this will hide your friend's list from other users`}
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
  
  .setting-select {
    width: 300px;
  }
`
