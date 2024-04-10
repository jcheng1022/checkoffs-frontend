import styled from "styled-components";
import {theme} from "@/styles/themes";
import dayjs from "dayjs";
import {createColumnHelper} from "@tanstack/react-table";
import CoreTable from "@/components/CoreTable";

const TableSkeleton = () => {

    const fakeData = [
        {
            date: dayjs().format('M/DD/YYYY'),
            description: 'test',
            image: 'test'
        },
        {
            date: 'test',
            description: 'test',
            image: 'test'
        },
        {
            date: 'test',
            description: 'test',
            image: 'test'
        },
        {
            date: 'test',
            description: 'test',
            image: 'test'
        },
    ]



        const columnHelper = createColumnHelper()
        const skeletonDiv = () => {
        return (
            <SkeletonDiv />
        )
        }
        const  columns = () => {

            const columnHelper = createColumnHelper()

            const columns = [
                columnHelper.accessor('date', {
                    header: () => <span>Date</span>,
                    cell: info => <div className={'skeleton-cell'}> <span className={'hidden-text'}> {info.renderValue()}</span> </div>
                }),
                columnHelper.accessor('description', {
                    id: 'description',
                    cell: info => <div className={'skeleton-cell'}> <span className={'hidden-text'}> {info.renderValue()}</span> </div>,
                    header: () => <span>Description</span>,
                }),
                columnHelper.accessor('image', {
                    header: () => 'Image',
                    cell: info => <div className={'skeleton-cell'}> <span className={'hidden-text'}> {info.renderValue()}</span> </div>

                })
            ]

            return columns
        }




    return (
        <Container>
            <CoreTable initialData={fakeData} columns={columns()}/>

        </Container>
    )
}

export default TableSkeleton;

const Container = styled.div`
  width: 100%;
  height: 200px;
  // background-color: ${theme.skeleton};
  
  .skeleton-cell {
    background-color: ${theme.skeleton};
    padding: 0px 18px;
    color: ${theme.skeleton};
    margin: 2px;
  }
  
  .hidden-text {
    visibility: hidden;
  }
`

const SkeletonDiv = styled.div`
    background-color: ${theme.skeleton};
`
