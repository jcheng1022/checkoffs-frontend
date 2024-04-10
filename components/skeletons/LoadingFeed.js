import styled from "styled-components";
import {Spin} from "antd";
import {FlexBox} from "@/components/core";
import {theme} from "@/styles/themes";

const LoadingFeed = () => {

    const list = [
        {type: 'image'},
        {type: 'text'},
        {type: 'image'},
        {type: 'image'},
        {type: 'text'},
    ]

    return (
        <Container direction={'column'} >
            {list.map((item, index) => {
            return (
                <LoadingItem justify={'center'} key={`loading-feed-item-${index}`} type={item.type}>
                    <Spin />
                </LoadingItem>
            )})
            }
        </Container>
    )
}

export default LoadingFeed;

const Container = styled(FlexBox)`
  width: 800px;
`

const LoadingItem = styled(FlexBox)`
  min-width: 400px;
  max-width: 400px;
  min-height: ${props => props.type === 'image' ? '400px' : '100px'};
  height: ${props => props.type === 'image' ? '400px' : '100px'};
  max-height: ${props => props.type === 'image' ? '400px' : '100px'};
  width: 400px;
  background-color: ${theme.skeleton};
  margin: 4px 0px;
`
