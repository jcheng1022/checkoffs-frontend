'use client'

import {flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table'
import styled from "styled-components";

const CoreTable = ({ initialData = [], columns = []}) => {
    // console.log(initialData, 'gsds', 'neiong rerenders')



    const table = useReactTable({
        data: initialData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Container>
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>

            </table>

        </Container>
    )
}


export default CoreTable;

const Container = styled.div`


  table {
    //min-width: 800px;
    max-width: 100%;
    border: 1px solid lightgray;
  }

  tbody {
    border-bottom: 1px solid lightgray;
  }

  th {
    max-width: 100px;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    padding: 2px 12px;
  }

  tfoot {
    color: gray;
  }

  tfoot th {
    font-weight: normal;
  }

`
