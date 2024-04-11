'use client'
import styled from "styled-components";
import {Button, DatePicker, Input, Modal, Spin} from "antd";
import {Controller, useForm} from "react-hook-form";
import ImageUploader from "@/components/ImageUploader";
import {Gap} from "@/components/core";
import dayjs from "dayjs";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import APIClient from '../../services/api'
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useCurrentUser} from "@/hooks/user.hook";

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
    // const {user } = useAuthContext();
    const pathname = usePathname();
    const params = useParams();
    const {user: userId} = params;

    const [loading, setLoading] = useState(false)
    const router = useRouter();


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

            }
            client.refetchQueries({queryKey: ['feed', user?.id]})


            // client.refetchQueries({queryKey: ['activities', {
            //         dateOnly: true
            //     }]})
            onCancel();
            router.push(`/feed`)
        })


    };

    // Callback function to update formData with the uploaded image file
    const handleFileUpload  = (file) => {

        setImage(file); // Update formData with the uploaded image file
    };
    return (
        <ModalContainer width={1000} open={open} onCancel={onCancel} footer={[]}>
           <Spin spinning={loading}>
               <div> Create </div>

               <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

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
