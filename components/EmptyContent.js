import styled from "styled-components";
import {FlexBox} from "@/components/core";
import {useRouter} from "next/navigation";

const EmptyContent = ({ title, subtitle, route}) => {
    const router = useRouter()
    return (
        <Container direction={'column'} justify={'center'}>

            <div className={'empty-title'}> {title}</div>
            <div className={`empty-desc ${!route && 'no-link'} `} onClick={() => {
                if (route) {
                    router.push(route)
                }
            }
            }> {subtitle}</div>
        </Container>
    )
}

export default EmptyContent;
const Container = styled(FlexBox)`
  height: 100vh;
  width: 100%;

  .empty-title {
    font-size: 26px;
    color: white;
    margin-bottom: 12px;
  }

  .empty-desc {
    color: #1890ff;
    font-size: 16px;
    cursor: pointer;
  }
  .empty-desc:hover {
    text-decoration: underline;
  }
  
  .no-link {
    color: grey;
    cursor: default;
  }
  
  .no-link:hover {
    text-decoration: none;
  }

 
`
