import {Inbox} from 'react-feather'
import styled from 'styled-components'

export const EmptyImage = ({upload}) => {
    return (
        <Container onClick={upload}>
            <Inbox color={'#ffffff'} size={"48px"} style={{minHeight: 48}}/>
            <div className={'no-img'}> No image uploaded yet</div>
            <div className={'description'}> Click here to upload an image</div>
        </Container>
    )
}


const Container = styled.div`
  text-align: center;
  background-color: #e6e7e8;
  width: 200px;
  height: 200px;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #d7d8d9;
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
