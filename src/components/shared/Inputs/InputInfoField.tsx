import { TextareaAutosize } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface InputInfoFieldProps {
  isRequired?: boolean;
  placeholder: string;
  nameInput: string;
  editToggle: boolean;
  marginRight?: string;
  name?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  maxWidth?: string;
  type?:
    | 'number'
    | 'text'
    | 'password'
    | 'checkbox'
    | 'radio'
    | 'email'
    | 'date'
    | 'time'
    | 'url'
    | 'search'
    | 'TextArea'
    | 'select'
    | 'file';
  isResize?: boolean;
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
  isRequired = true,
  type = 'text'
}) => {
  function viewInputValue() {
    alert(placeholder);
  }

  if (type === 'TextArea') {
    return (
      <InputInfoFieldStyle
        border={editToggle}
        marginRight={marginRight}
        maxWidth={maxWidth}
      >
        <h1>{nameInput}</h1>
        <textarea
          className="TextAreaAutoSize"
          maxLength={200}
          placeholder={placeholder}
          disabled={!editToggle}
          onChange={onChange}
          name={name}
          value={value}
          required={isRequired}
        />
      </InputInfoFieldStyle>
    );
  } else {
    return (
      <InputInfoFieldStyle
        border={editToggle}
        marginRight={marginRight}
        maxWidth={maxWidth}
        onClick={viewInputValue}
      >
        <h1>{nameInput}</h1>
        <input
          type={type}
          placeholder={placeholder}
          disabled={!editToggle}
          name={name}
          value={value}
          onChange={onChange}
          min={0}
          minLength={0}
          required={isRequired}
        />
      </InputInfoFieldStyle>
    );
  }
};

interface InputInfoFieldStyleProps {
  border: boolean;
  marginRight?: string;
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

  .TextAreaAutoSize {
    border: none;
    font-size: 17px;
    background-color: transparent;
    border-radius: 5px;
    box-shadow: ${props =>
      props.border ? 'inset 0px 0px 4px rgba(0, 0, 0, 0.25)' : 'none'};
    padding-left: 10px;
    padding-top: 9px;
    width: 100%;
    margin-right: 10px;
    min-height: 39px;
    max-width: 220px;
    max-height: 150px;
    resize: vertical;
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

    text-overflow: ellipsis;
  }
`;
export default InputInfoField;
