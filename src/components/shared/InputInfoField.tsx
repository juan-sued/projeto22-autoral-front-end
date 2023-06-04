import React from 'react';
import styled from 'styled-components';

interface InputInfoFieldProps {
  placeholder: string;
  nameInput: string;
  editToggle: boolean;
  marginRight: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxWidth?: string;
  type?: string;
}

const InputInfoField: React.FC<InputInfoFieldProps> = ({
  placeholder,
  nameInput,
  editToggle,
  marginRight,
  name,
  value,
  onChange,
  maxWidth,
  type = 'text'
}) => {
  return (
    <InputInfoFieldStyle
      className="phone"
      border={editToggle}
      marginRight={marginRight}
      maxWidth={maxWidth}
    >
      <h1>{nameInput}</h1>
      <input
        className="inputPhone"
        type={type}
        placeholder={placeholder}
        disabled={!editToggle}
        name={name}
        value={value}
        onChange={onChange}
        min={0}
      />
    </InputInfoFieldStyle>
  );
};

interface InputInfoFieldStyleProps {
  border: boolean;
  marginRight: string;
  maxWidth?: string;
}

const InputInfoFieldStyle = styled.div<InputInfoFieldStyleProps>`
  margin-bottom: 20px;
  width: 100%;
  margin-right: ${props => props.marginRight};

  max-width: ${props => props.maxWidth};
  
  h1 {
    font-weight: 500;
    margin-bottom: 5px;
  }

  input {
    border: none;
    font-size: 17px;
    background-color: transparent;
    height: 40px;
    border-radius: 5px;
    box-shadow: ${props =>
      props.border ? 'inset 0px 0px 4px rgba(0, 0, 0, 0.25)' : 'none'};
    padding-left: 10px;
    padding-right: 5px;
    width: 100%;
    margin-right: 10px;
  }
};
`;
export default InputInfoField;
