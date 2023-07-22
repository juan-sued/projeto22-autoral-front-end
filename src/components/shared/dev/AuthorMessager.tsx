import styled from 'styled-components';

export default function AuthorMessage() {
  return (
    <AuthorMessageStyle>
      <div className="developed">Em desenvolvimento por Juan Sued</div>
    </AuthorMessageStyle>
  );
}

const AuthorMessageStyle = styled.div`
  padding: 20px;
  .developed {
    width: 100%;
    text-align: center;
    color: black;
    height: 20%;
    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
