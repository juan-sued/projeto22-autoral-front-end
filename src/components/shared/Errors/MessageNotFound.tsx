import styled from 'styled-components';
import ButtonPlant from '../Buttons/ButtonPlant';

export default function MessageNotFound() {
  return (
    <MessageNotFoundStyle>
      <ButtonPlant title="Montar pedido" to={'/make-order'} />
    </MessageNotFoundStyle>
  );
}

const MessageNotFoundStyle = styled.div`
  height: 200px;
  widht: 100%;
  display: grid;
  place-items: center;
  align-items: center;
  padding: 50px;
`;
