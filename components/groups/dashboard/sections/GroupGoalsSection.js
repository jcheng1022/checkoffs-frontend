import styled from "styled-components";
import {DashboardSection} from "@/components/groups/dashboard/shared/DashboardSection";
import {useDashboardGroupGoals} from "@/hooks/dashboard";
import {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {Plus} from "react-feather";
import CreateGroupGoal from "@/components/groups/dashboard/drawers/CreateGroupGoal";
import {DashboardTable} from "@/components/groups/dashboard/shared/DashboardTable";
import dayjs from "dayjs";

const SIZE_PER_PAGE = 10;
const GroupGoalsSection = () => {
    const {groupId} = useParams();
    const router = useRouter();
    const [page, setPage] = useState(1)
    const {data: goals} = useDashboardGroupGoals(groupId, {
        page,
        size: SIZE_PER_PAGE
    })
    const [showDrawer, setShowDrawer] = useState(false)

    const actions = [
        {
            label: 'New Goal',
            icon: <Plus size={20} color={'black'}/>,
            onClick: () => setShowDrawer(true)
        }
    ]

    const handleCloseDrawer = () => {
        setShowDrawer(false)
    }

    const columns = [
        {
            title: 'Name',
            key: 'name',
            render: (text) => <div>{text?.name}</div>,
        },
        {
            title: 'Start Date',
            key: 'start_date',
            render: (text) => <div>{dayjs(text?.createdAt).format('YYYY-MM-DD')}</div>,
        },
        {
            title: 'End Date',
            key: 'end_date',
            render: (text) => text?.endDate ? <div>{dayjs(text?.endDate).format('YYYY-MM-DD')}</div> : <div>N/A</div>,
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

    return (
        <DashboardSection
            title={'Goals'}
            // subtitle={'Group Members'}
            description={'Manage goals for your group members to participate in'}
            openDrawer={showDrawer}
            drawerContent={ <CreateGroupGoal onClose={handleCloseDrawer}/>}
            onDrawerClose={handleCloseDrawer}
            actions={actions}
        >
            <Container>
                <DashboardTable data={goals?.results}
                                onRow={(entry, index) => ({
                                    onClick: () => {
                                        console.log(`hit`)
                                        router.push(`/group/${groupId}/goal/${entry.id}`)
                                    },
                                })}
                                columns={columns}
                                paginationOptions={{
                                    total: goals?.total,
                                    current: page,
                                    pageSize: SIZE_PER_PAGE,
                                    onChange: (page) => setPage(page)
                                }}
                />
            </Container>
        </DashboardSection>
    )
}

export default GroupGoalsSection;

const Container = styled.div``
