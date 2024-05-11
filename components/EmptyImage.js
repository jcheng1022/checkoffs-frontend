import {Inbox} from 'react-feather'
import styled from 'styled-components'
import {theme} from "@/styles/themes";

export const EmptyImage = ({upload}) => {
    return (
        <Container onClick={upload}>
            <Inbox className={'inbox-icon'} size={"48px"} style={{minHeight: 48}}/>
            <div className={'no-img'}> No image uploaded yet</div>
            <div className={'description'}> Click here to upload an image</div>
        </Container>
    )
}


const Container = styled.div`
  text-align: center;
  background-color: ${theme.backgroundBlack};
  width: 200px;
  height: 200px;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  .inbox-icon {
    color: #ffffff;
  }
  &:hover {
    .inbox-icon {
        color: ${theme.primaryBlue};
    }
    .no-img {
        color: ${theme.primaryBlue};
    }
    .description {
        color: ${theme.primaryBlue};
    }
    
    
  }
  
  .no-img {
    color: #ffffff;
    font-size: 18px;
  }
  
  .description { 
    font-size: 12px;
    color: #ffffff;

  }

`
