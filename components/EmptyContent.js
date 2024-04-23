import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useRouter} from "next/navigation";

const EmptyContent = ({ title, subtitle, route}) => {
    const router = useRouter()
    return (
        <Container direction={'column'} justify={'center'}>

            <div className={'empty-title'}> {title}</div>
            <div className={'empty-desc'} onClick={() => {
                router.push(route)
            }
            }> {subtitle}</div>
        </Container>
    )
}

export default EmptyContent;
const Container = styled(FlexBox)`
  height: 100%;
  width: 100%;

  .empty-title {
    font-size: 20px;
  }

  .empty-desc {
    color: #1890ff;
    font-size: 14px;
    cursor: pointer;
  }

  .empty-desc:hover {
    text-decoration: underline;
  }
`
