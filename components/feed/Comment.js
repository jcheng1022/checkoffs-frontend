import styled from 'styled-components';

const Comment = ({comment}) => {
    return (
        <Container>
            <span className={'username'}> {comment.user?.username} </span>
            <span className={'message'}> {comment.message} </span>
        </Container>
    )
}


export default Comment;

const Container = styled.div`
  .username {
    font-weight: 500;
    font-size: 12px;
    margin-right: 4px;
  }
  
  .username:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  
  .message {
    font-size: 12px;
    color: grey;
  }
`
