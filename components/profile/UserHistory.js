'use client'

import {useActivitiesByUser} from "@/hooks/activity.hook";
import CoreTable from "@/components/CoreTable";
import {useMemo, useState} from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {createColumnHelper} from "@tanstack/react-table";
import ImageViewerModal from "@/components/modals/ImageViewerModal";
import {useCurrentUser} from "@/hooks/user.hook";

const  advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
const UserHistoryTable = () => {
    // const { user } = useAuthContext()
    const { data: user } = useCurrentUser();

    const [openImageModal, setOpenImageModal] = useState(null)


    const {data: activities } = useActivitiesByUser( user?.id,{
    })
    const {data: tableData, columns} = useMemo(() => {
        const data =  activities?.map(o => {
            return {
                date: dayjs(o.date).format('M/DD/YYYY'),
                description: o.description,
                image: o.mediaUrl,
            }

        })

        const columnHelper = createColumnHelper()

        const columns = [
            columnHelper.accessor('date', {
                header: () => <span>Date</span>,
                cell: info => <div style={{padding: '0px 18px'}}> {info.renderValue()} </div>,
            }),
            columnHelper.accessor('description', {
                id: 'description',
                cell: info => <div  style={{padding: '0px 18px'}}>{info.getValue()}</div>,
                header: () => <span>Description</span>,
            }),
            columnHelper.accessor('image', {
                header: () => 'Image',
                cell: info => !!info.getValue() ? <div onClick={ () => {
                    setOpenImageModal(info.getValue())
                }
                } style={{padding: '0px 18px'}}> View </div> : <div> No media </div>,
            })
        ]

        return {
            data,
            columns
        }
    }, [activities])
    return (
        <Container align={'center'} direction={'column'}>

            <CoreTable initialData={tableData} columns={columns}/>
            {!!openImageModal && <ImageViewerModal image={openImageModal} onCancel={() => setOpenImageModal(null)} open={!!openImageModal} /> }

        </Container>
    )
}

export default UserHistoryTable;


const Container = styled(FlexBox)`

`

