import styled from 'styled-components';
import PopUpError from '@/components/shared/Popups/PopUpError';
import { useAuth } from '@/hooks/useAuth';

export default function MessageNotFound() {
  const { signed } = useAuth();

  return (
    <MessageNotFoundStyle>
      <PopUpError title="Opss!" buttonBack={true}>
        <p>
          Desculpe, parece que
          {signed
            ? ' essa página não existe.'
            : ' você não tem acesso a está página.'}
        </p>
      </PopUpError>
    </MessageNotFoundStyle>
  );
}

const MessageNotFoundStyle = styled.div``;
