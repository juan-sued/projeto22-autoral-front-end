import styled from 'styled-components';

interface ButtonOnlyWordsProps {
  children: React.ReactNode;
}

const ButtonOnlyWords: React.FC<ButtonOnlyWordsProps> = ({ children }) => {
  return <ButtonOnlyWordsStyle>{children}</ButtonOnlyWordsStyle>;
};

const ButtonOnlyWordsStyle = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  margin: 36px;
  font-family: 'Jost', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-shadow: 0.1em 0.05em 0em #9954aa;
  margin-top: 15px;
  :hover {
    cursor: pointer;
  }
`;

export default ButtonOnlyWords;
