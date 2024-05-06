import {FlexBox, Gap} from "@/components/core";
import {ArrowRight} from "react-feather";
import styled from "styled-components";
import {useRouter} from "next/navigation";

const PermissionDenied = () => {
    const router = useRouter();

    return (
        <Container justify={'center'} align={'center'} direction={'column'}>
            <div >
                {`Sorry, you do not have access to view this resource`}
            </div>

            <Gap gap={24}/>

            <div  gap={8}>
                <div className={'redirect-text'} onClick={() => {
                    router.push(`/`)}
                }>Go back to home</div>
                <ArrowRight size={14} color={'#1890ff'} />
            </div>
        </Container>
    )
}

export default PermissionDenied;

const Container = styled(FlexBox)`
  height: 100vh;

  .redirect-text {
    color: #1890ff;
    cursor: pointer;
  }

  .redirect-text:hover {
    text-decoration: underline;
  }
`
