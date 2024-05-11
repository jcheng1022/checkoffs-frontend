'use client'

import {useActivitiesByUser} from "@/hooks/activity.hook";
import CoreTable from "@/components/CoreTable";
import {useMemo, useState} from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import {createColumnHelper} from "@tanstack/react-table";
import ImageViewerModal from "@/components/modals/ImageViewerModal";
import {useUserIsLoggedIn} from "@/hooks/user.hook";
import {theme} from "@/styles/themes";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import {useParams} from "next/navigation";
import {FlexBox} from "@/components/core";
import {DashboardTable} from "@/components/groups/dashboard/shared/DashboardTable";

const  advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)
const UserHistoryTable = () => {
    // const { user } = useAuthContext()
    const isLoggedIn = useUserIsLoggedIn();

    const [openImageModal, setOpenImageModal] = useState(null)
    const [initializingData, setInitializingData] = useState(true)

    const { user:userId } = useParams();


    const {data: activities, isFetching, isLoading } = useActivitiesByUser( isLoggedIn,{
        userId
    })

    const columns = [
        {
            title: 'Date',
            key: 'date',
            render: (text) => <div className={'date-column'}>{text?.date}</div>,
        },
        {
            title: 'Description',
            key: 'description',
            render: (text) => <div className={'description-column'}> {text?.description}</div>
        },
        {
            title: 'Media',
            key: 'activity_media',
            render: (text) => text?.mediaUrl ? <div onClick={ () => {
                setOpenImageModal(text?.mediaUrl)
            }
            } style={{padding: '0px 18px'}}> View </div> : <div> No media </div>
        },
        //
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <div size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </div>
        //     ),
        // },
    ];
    const {data: tableData} = useMemo(() => {
        const data =  activities?.map(o => {
            return {
                date: dayjs(o.date).format('M/DD/YYYY'),
                description: o.description,
                image: o.mediaUrl,
            }

        })
    //
    //     const columnHelper = createColumnHelper()
    //
    //     const columns = [
    //         columnHelper.accessor('date', {
    //             header: () => <span>Date</span>,
    //             cell: info => <div style={{padding: '0px 18px'}}> {info.renderValue()} </div>,
    //         }),
    //         columnHelper.accessor('description', {
    //             id: 'description',
    //             cell: info => <div  style={{padding: '0px 18px'}}>{info.getValue()}</div>,
    //             header: () => <span>Description</span>,
    //         }),
    //         columnHelper.accessor('image', {
    //             header: () => 'Image',
    //             cell: info => !!info.getValue() ? <div onClick={ () => {
    //                 setOpenImageModal(info.getValue())
    //             }
    //             } style={{padding: '0px 18px'}}> View </div> : <div> No media </div>,
    //         })
    //     ]
    //
    //
        return {
            data,
            // columns
        }
    }, [activities])
    return (
        <Container >
            {(isFetching || isLoading) ?
                <TableSkeleton />  :

                (tableData?.length === 0) ?
                <>
                    <CoreTable initialData={tableData} columns={columns}/>
                    <EmptyTableContainer justify={'center'}>
                        <div className={'text'}>
                            No data yet! Make an entry to get started
                        </div>
                    </EmptyTableContainer>
                </> :
                    <DashboardTable paginationOptions={false} data={tableData} columns={columns} />
                    // <CoreTable initialData={tableData} columns={columns}/>



            }
            {/*<CoreTable initialData={tableData} columns={columns}/>*/}
            {!!openImageModal && <ImageViewerModal image={openImageModal} onCancel={() => setOpenImageModal(null)} open={!!openImageModal} /> }

        </Container>
    )
}

export default UserHistoryTable;


const Container = styled.div`
    height: 500px;
    background-color: ${theme.backgroundBlack};
  padding: 24px 48px;

   .ant-table-content {
    background-color: ${theme.jetGrey};
     color: white;

    
  }

  
  @media only screen and (max-width: 600px) {
    padding: 24px 36px;
    
    
  .ant-table-cell {
    white-space: nowrap;
    padding: 0px 12px;

  }

  .ant-pagination-options {
    display: none;
  }

  td {
    //padding-top: 20px;
    //padding-bottom: 20px;
    //padding-right: 20px;
    font-size: 12px;
    max-width: 10px;
    //white-space: nowrap; /* Prevent text from wrapping */
    overflow: auto; /* Hide overflow */
    //text-overflow: ellipsis;
    
    

    
  }
  
  .description-column {
    //padding: 0px 12px;

  }

  td:first-child {
    padding-left: 20px;
    padding-right: 0;
  }


  .action-column {
    padding-left: 0 !important;
  }

  .hold-row, .hold-row:hover {
    background-color: ${theme.steel10} !important;
  }

  .cancelled-row, .cancelled-row:hover {
    background-color: rgba(255, 183, 169, 0.19) !important;
  }

  .ant-table-container {
    border: none !important;

    .ant-table-content {
      table, .ant-table-cell {
        border: none !important;
      }

      table thead .ant-table-cell {
        border-bottom: thin solid ${theme.steel20} !important;
        color: ${theme.steel40};
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        padding-bottom: 8px;
      }

      table tbody {
        .ant-table-row {
          font-size: 14px;
          font-weight: 400;
          line-height: 21px;

          // .ant-table-cell:first-child {
          //   // color: ${theme.steel20};
          //   font-size: 12px;
          //   font-weight: 400;
          //   line-height: 18px;
          // }

          &:hover {
            box-shadow: 0px 4px 4px rgba(190, 194, 217, 0.5);
            background-color: white !important;
            cursor: pointer;
          }
        }

        .ant-table-cell {
          border-bottom: thin solid ${theme.steel10} !important;
          height: 54px;
        }
      }

      .ant-table-row:last-child {
        .ant-table-cell {
          border-bottom: none !important;
          height: 54px;
        }
      }

      .ant-table-column-title {
        flex: 0 !important;
        white-space: nowrap;
      }

      .ant-table-filter-trigger, .ant-table-column-sorter {
        margin-right: auto;
      }
    }

    .ant-table-cell {
      background-color: transparent;
    }
  }
  }

`

const EmptyTableContainer = styled(FlexBox)`
  height: 100px;
  background-color: ${theme.jetGrey};
  
  .text {
    font-size: 14px;
  }
`

