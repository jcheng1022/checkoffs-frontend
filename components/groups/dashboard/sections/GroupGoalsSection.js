import styled from "styled-components";
import {DashboardSection} from "@/components/groups/dashboard/shared/DashboardSection";
import {useDashboardGroupGoals} from "@/hooks/dashboard";
import {useState} from "react";
import {useParams} from "next/navigation";
import {UserPlusIcon} from "lucide-react";
import {Plus} from "react-feather";
import InviteGroupMemberForm from "@/components/groups/dashboard/drawers/InviteGroupMemberForm";
import CreateGroupGoal from "@/components/groups/dashboard/drawers/CreateGroupGoal";
import {DashboardTable} from "@/components/groups/dashboard/shared/DashboardTable";
import {getTagColorByRole, STATUS} from "@/constants";
import {Tag} from "antd";
import dayjs from "dayjs";

const SIZE_PER_PAGE = 10;
const GroupGoalsSection = () => {
    const {groupId} = useParams();
    const [page, setPage] = useState(1)
    const {data: goals} = useDashboardGroupGoals(groupId, {
        page,
        size: SIZE_PER_PAGE
    })
    const [showDrawer, setShowDrawer] = useState(false)

    const actions = [
        {
            label: 'New Goal',
            icon: <Plus size={20}/>,
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
            subtitle={'Group Members'}
            description={'View and manage group members'}
            openDrawer={showDrawer}
            drawerContent={ <CreateGroupGoal onClose={handleCloseDrawer}/>}
            onDrawerClose={handleCloseDrawer}
            actions={actions}
        >
            <Container>
                <DashboardTable data={goals?.results}
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
