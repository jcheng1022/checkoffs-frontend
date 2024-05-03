'use client';

import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {Drawer, Tooltip} from "antd";
import {theme} from "@/styles/themes";
import {ArrowLeft} from "react-feather";

export const DashboardSection = ({
                                     title,
                                     subtitle,
                                     description,
                                     actions =[],
                                    openDrawer =false,
                                    drawerContent= null,
                                    drawerExtra = [],
                                    onDrawerClose = () => {},
                                    footer=null,
                                     children
}) => {
    return (
        <Container>
            <FlexBox justify={'space-between'} wrap={'no-wrap'} style={{width: '100%'}}>
                <div className={'d-section-title'}> {title}</div>
                {actions.length > 0 && (
                    <FlexBox   direction={'column'} align={'flex-end'} style={{marginRight: 24}}>
                       {/*<div className={'action-container'}>*/}
                           {/*<div className={'action-title'}>*/}
                           {/*    Actions*/}
                           {/*</div>*/}
                           {/*<div>*/}
                               {actions.map(action => {
                                   console.log(action?.onClick, 22323)
                                   return (
                                       <Tooltip trigger={['hover']}  overlayStyle={{position:'fixed'}} title={action.label} key={action.label}>
                                           <div key={action.key} onClick={action.onClick} className={'d-section-action'}>
                                               {action.icon}
                                           </div>
                                       </Tooltip>
                                   )
                               })}
                           {/*</div>*/}
                       {/*</div>*/}
                    </FlexBox>
                )}
            </FlexBox>
            <div className={'d-section-subtitle'}> {subtitle}</div>
            <div className={'d-section-description'}> {description}</div>


            <div className={'section-contents'}>
                {children}
            </div>

            <Drawer
                open={openDrawer}
                placement={'right'}
                closeIcon={<ArrowLeft/>}
                extra={drawerExtra}
                onClose={onDrawerClose}
                footer={footer}
            >
                {drawerContent}
            </Drawer>
        </Container>
    )
}


const Container = styled.div`
  margin: 12px;
  width: 100%;

  .d-section-title {
    font-size: 30px;
    font-weight: 600;
    //margin-bottom: 10px;
  }
  .d-section-subtitle {
    font-size: 16px;
    font-weight: 500;
    color: #666;
  }
  .d-section-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    font-style: italic;
  }
  
  .section-contents {
    margin-top: 20px;
  }
  
  .d-section-action:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  
  .action-container {
    // border: 1px solid ${theme.softBlue_1};
    border-radius: 4px;
    
    padding: 8px 12px;
    width: 200px;
    text-align: center;
  }
  
  .action-title {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
  }
`


