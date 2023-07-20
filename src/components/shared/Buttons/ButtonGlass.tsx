import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

interface ButtonGlassProps {
  onClick: (id: number) => void;
  id: number;
  title: string;
  index: number;
}

const ButtonGlass: React.FC<ButtonGlassProps> = ({
  onClick,
  id,
  title,
  index
}) => {
  const { ref, inView } = useInView({
    delay: 200,
    threshold: 0
  });

  const isPar = index % 2 === 0;
  return (
    <ButtonGlassInStyle
      onClick={() => onClick(id)}
      inView={inView}
      ref={ref}
      isPar={isPar}
    >
      <div className="cardIngredient">{title}</div>
    </ButtonGlassInStyle>
  );
};

interface ButtonGlassInStyleProps {
  inView: boolean;
  isPar: boolean;
}
const ButtonGlassInStyle = styled.button<ButtonGlassInStyleProps>`
  opacity: 0;
  ${props =>
    props.inView && props.isPar
      ? `animation: fadeTranslateXLeft 1s ease-in-out;animation-fill-mode: forwards;`
      : props.inView && !props.isPar
      ? `animation: fadeTranslateXRight 1s ease-in-out;animation-fill-mode: forwards;`
      : ''}
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);

  color: white;
  text-align: center;
  width: 100%;
  max-width: 600px;

  font-size: 17px;

  transition: all 0.2s ease-in-out;

  :hover {
    cursor: pointer;
    transform: scale(1.06);
  }
`;

export default ButtonGlass;
