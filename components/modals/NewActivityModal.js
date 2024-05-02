'use client'
import styled from "styled-components";
import {Button, DatePicker, Input, Modal, Select, Spin, Tag} from "antd";
import {Controller, useForm} from "react-hook-form";
import ImageUploader from "@/components/ImageUploader";
import {Gap} from "@/components/core";
import dayjs from "dayjs";
import {useMemo, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import APIClient from '../../services/api'
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useCurrentUser} from "@/hooks/user.hook";
import {useActivitySharingOptions} from "@/hooks/activity.hook";

const {TextArea} = Input;

const NewActivityModal = ({open = false, onCancel = () => {}}) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm()
    const client = useQueryClient();
    const {data: user} = useCurrentUser()
    const { data: options} = useActivitySharingOptions(!!user)

    // const {user } = useAuthContext();
    const pathname = usePathname();
    const params = useParams();
    const {user: userId} = params;

    const [loading, setLoading] = useState(false)
    const router = useRouter();

    console.log(pathname, 232)
    const [image, setImage] = useState(null);


    const onSubmit =  async (data) => {

        const {date, description} = data;

        if (!date || !description ) return;
        setLoading(true)

        const formData = new FormData();
        formData.set("image", image)
        formData.set('data', JSON.stringify(data))

        await APIClient.api.post('/activity', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            setLoading(false)

            console.log(user?.id)
            // if (pathname === '/feed') {
            // }


            if (user?.id === userId) {
                // user is viewing their own profile
                client.refetchQueries({queryKey: ['activities', {
                    dateOnly: true,
                        userId
                }]})
                client.refetchQueries({queryKey: ['activities', {
                        userId
                    }]})

            } else if (pathname.includes('feed')) {
                client.refetchQueries({queryKey: ['feed', user?.id]})
            } else if (pathname.includes('group')){
                const {groupId} = params;

                client.refetchQueries({queryKey: ['group-feed', params?.groupId]})
            }


            // client.refetchQueries({queryKey: ['activities', {
            //         dateOnly: true
            //     }]})
            onCancel();
            // router.push(`/feed`)
        })


    };

    // Callback function to update formData with the uploaded image file
    const handleFileUpload  = (file) => {

        setImage(file); // Update formData with the uploaded image file
    };
    const SHARING_OPTIONS = {
        ALL: 'ALL',
        GROUP: 'GROUP',
    }

    const selectOptions = useMemo(() => {
        const base = [
            {
                label: 'General',
                value: 'general',
                options: [
                    {
                        label: 'All',
                        value: SHARING_OPTIONS.ALL
                    }
                ]
            }
        ]

        let personalizedOptions = []
       if (options) {
            personalizedOptions = options?.map(option => {
                base[0].options?.push(   {
                    label: `Group - ${option.name}`,
                    value: `group=${option.groupId}`
                })
               return {
                   label: <span> Group - {option.name}</span>,
                   value: option.groupId,
                   options: option.goals.map(goal => {
                           return {
                               label: goal.name,
                               value: `group=${option.groupId}&goal=${goal.id}`
                           }
                       })
               }
           })
       }

        return  [...base, ...personalizedOptions]
    }, [options])

    return (
        <ModalContainer width={1000} open={open} onCancel={onCancel} footer={[]}>
           <Spin spinning={loading}>
               {/*<div> Create </div>*/}

               <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

                   <Controller
                       // defaultValue={} // Provide defaultValue here

                       control={control}
                       name='destination'
                       render={({ field }) => (
                           <Select
                               placeholderText='Select date'
                               options={selectOptions}
                               style={{width: '100%'}}
                               onChange={(val) => field.onChange(val)}
                               selected={field.value}
                               {...field}
                           />
                       )}
                   />

                   <Controller
                       defaultValue={dayjs()} // Provide defaultValue here

                       control={control}
                       name='date'
                       render={({ field }) => (
                           <DatePicker
                               placeholderText='Select date'

                               onChange={(date) => field.onChange(date)}
                               selected={field.value}
                               {...field}
                           />
                       )}
                   />

                   <Gap gap={24}/>

                   <Controller
                       control={control}
                       name='description'
                       render={({ field }) => (
                           <TextArea  value={field.value}  placeholder={'description'} {...field} />

                       )}
                   />
                   <Gap gap={24}/>

                   <ImageUploader register={register} onFileUpload={handleFileUpload}  />
                   <Gap gap={24}/>


                   <Button onClick={handleSubmit(onSubmit)}> Create</Button>
               </form>
           </Spin>
        </ModalContainer>
    )
}

export default NewActivityModal;

const ModalContainer = styled(Modal)`
  
`
