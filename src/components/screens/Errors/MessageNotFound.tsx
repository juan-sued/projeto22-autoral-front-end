import styled from 'styled-components';

import PopUp from '@/components/shared/Popups/PopUp';

export default function MessageNotFound() {
  return (
    <MessageNotFoundStyle>
      <PopUp title="Opss!" buttonBack={true} buttonClose={false}>
        <p>
          Desculpe, mas parece que você <strong>não tem acesso</strong> ou essa
          página não existe.
        </p>
      </PopUp>
    </MessageNotFoundStyle>
  );
}

const MessageNotFoundStyle = styled.div``;
