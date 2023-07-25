import styled from 'styled-components';
import { ComponentProps } from 'react';
type CheckboxBlockProps = ComponentProps<'input'>;

const CheckboxBlock: React.FC<CheckboxBlockProps> = ({
  checked = false,
  ...props
}) => {
  return (
    <CheckboxBlockStyle>
      <div className="content">
        <label className="checkBox">
          <input id="ch1" type="checkbox" {...props} />
          <div className="transition"></div>
        </label>
      </div>
    </CheckboxBlockStyle>
  );
};
export default CheckboxBlock;

const CheckboxBlockStyle = styled.div`
  width: 90px;
  display: grid;
  place-items: center;

  :active {
    transform: scale(0.9);
  }
  :hover {
    transform: scale(1.2);
  }

  .clear {
    clear: both;
  }

  .checkBox {
    display: block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0);
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 0px 2px purple;
  }

  .checkBox div {
    width: 60px;
    height: 60px;
    background-color: purple;
    top: -52px;
    left: -52px;
    position: absolute;
    transform: rotateZ(45deg);
    z-index: 100;
  }

  .checkBox input[type='checkbox']:checked + div {
    left: -10px;
    top: -10px;
  }

  .checkBox input[type='checkbox'] {
    position: absolute;
    left: 50px;
    visibility: hidden;
  }

  .transition {
    transition: 300ms ease;
  }
`;
