'use client'

import {Table} from "antd";
import styled from "styled-components";
import {theme} from "@/styles/themes";

export const DashboardTable = ({data, columns, paginationOptions = {}, ...rest}) => {

    if (!data || !columns) return null;

    return (
        <StyledTable columns={columns}
                     dataSource={data}
                     pagination={paginationOptions}
                     {...rest}
        />
    )
}

export const StyledTable = styled(Table)`
  background-color: transparent;
  
  ${props => props.transparent ? `
    .ant-table {
    background-color: transparent !important;
  }
  ` : ''}

  .ant-table {
    overflow-x: auto;
  }

  .collapse {
    width: 0;
  }

  .ant-pagination .ant-pagination-item-link, .ant-pagination-item {
    background-color: transparent;
  }

  .ant-pagination-item-active {
    // background-color: ${theme.lightBlue_2};
  }


  .ant-table-cell {
    white-space: nowrap;
  }

  .ant-pagination-options {
    display: none;
  }

  td {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 20px;
  }

  td:first-child {
    padding-left: 20px;
    padding-right: 0;
  }


  .action-column {
    padding-left: 0 !important;
  }

  .hold-row, .hold-row:hover {
    // background-color: ${theme.steel10} !important;
  }

  .cancelled-row, .cancelled-row:hover {
    //background-color: rgba(255, 183, 169, 0.19) !important;
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
          .ant-table-cell-row-hover {
            background-color: transparent;
            
          }
          &:hover {
            //box-shadow: 0px 4px 4px rgba(190, 194, 217, 0.5);
            color: ${theme.primaryBlue};
            //background-color: white !important;
            //cursor: pointer;
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
`




