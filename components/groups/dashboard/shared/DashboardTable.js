'use client'

import {Table} from "antd";
import styled from "styled-components";

export const DashboardTable = ({data, columns}) => {

    if (!data || !columns) return null;
    //
    // const data = [
    //     {
    //         "key": "1",
    //         "username": "john_doe",
    //         "joinDate": "2023-05-15",
    //         "role": "Admin",
    //         "actions": ["Edit", "Delete"]
    //     },
    //     {
    //         "key": "2",
    //         "username": "jane_smith",
    //         "joinDate": "2023-08-20",
    //         "role": "User",
    //         "actions": ["Edit", "Delete"]
    //     },
    //     {
    //         "key": "3",
    //         "username": "alex_jones",
    //         "joinDate": "2024-01-10",
    //         "role": "User",
    //         "actions": ["Edit", "Delete"]
    //     },
    //     {
    //         "key": "4",
    //         "username": "emma_jackson",
    //         "joinDate": "2024-03-02",
    //         "role": "Moderator",
    //         "actions": ["Edit", "Delete"]
    //     }
    // ]
    //
    //
    // const columns = [
    //     {
    //         title: 'Username',
    //         dataIndex: 'username',
    //         key: 'username',
    //         render: (text) => <div>{text}</div>,
    //     },
    //     {
    //         title: 'Join Date',
    //         dataIndex: 'joinDate',
    //         key: 'join_date',
    //     },
    //     {
    //         title: 'Role',
    //         dataIndex: 'role',
    //         key: 'role',
    //     },
    //
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: (_, record) => (
    //             <div size="middle">
    //                 <a>Invite {record.name}</a>
    //                 <a>Delete</a>
    //             </div>
    //         ),
    //     },
    // ];

    return (
        <StyledTable columns={columns} dataSource={data}/>
    )
}

const StyledTable = styled(Table)`
  
    .ant-table-body {
      color: red;
    }

`
