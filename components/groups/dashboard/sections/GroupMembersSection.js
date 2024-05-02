import styled from "styled-components";
import {DashboardSection} from "@/components/groups/dashboard/shared/DashboardSection";
import {UserPlusIcon} from "lucide-react";
import {DashboardTable} from "@/components/groups/dashboard/shared/DashboardTable";
import {useDashboardGroupMembers} from "@/hooks/dashboard";
import {useParams} from "next/navigation";
import dayjs from "dayjs";
import {Tag} from "antd";
import {getTagColorByRole, STATUS} from "@/constants";
import {useState} from "react";
import InviteGroupMemberForm from "@/components/groups/dashboard/drawers/InviteGroupMemberForm";

const SIZE_PER_PAGE = 10;
const GroupMembersSection = () => {
    const {groupId} = useParams();
    const [page, setPage] = useState(1)
    const {data: members } = useDashboardGroupMembers(groupId, {
        page,
        size: SIZE_PER_PAGE
    })
    const [showDrawer, setShowDrawer] = useState(false)
    const actions = [
        {
            label: 'Add Member',
            icon: <UserPlusIcon size={20}/>,
            onClick: () => setShowDrawer(true)
        }
    ]


    const columns = [
        {
            title: 'Username',
            key: 'username',
            render: (text) => <div>{text?.user?.username}</div>,
        },
        {
            title: 'Join Date',
            key: 'join_date',
            render: (text) =>  (!text.joinDate && text.status === STATUS.PENDING) ? <Tag color={'grey'}> PENDING </Tag> : text?.status === STATUS.DECLINED ? <Tag color={'red'}> DECLINED</Tag>  : <div>{dayjs(text?.joinDate).format('YYYY-MM-DD')}</div>

        },

        {
            title: 'Role',
            key: 'role',
            render: (text) => {
                const {color} = getTagColorByRole(text.role)
                return (
                    <Tag  color={color}>
                        {text.role}
                    </Tag>
                )
            },

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
        <DashboardSection title={'Members'}
                          openDrawer={showDrawer}
                          drawerContent={<InviteGroupMemberForm open={showDrawer} onClose={() => setShowDrawer(false)} />}
                          onDrawerClose={() => setShowDrawer(false)}

                          description={'View and manage group members'}
                          actions={actions}
        >
            <Container>
                <DashboardTable data={members?.results}
                                columns={columns}
                                paginationOptions={{
                                    total: members?.total,
                                    current: page,
                                    pageSize: SIZE_PER_PAGE,
                                    onChange: (page) => setPage(page)
                                }}
                />

            </Container>

            {/*{showDrawer && (*/}
            {/*        <InviteGroupMemberForm open={showDrawer} onClose={() => setShowDrawer(false)} />*/}
            {/*)}*/}
        </DashboardSection>
    )
}

export default GroupMembersSection;

const Container = styled.div``
