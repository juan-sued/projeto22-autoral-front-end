import { useState } from 'react';
import styled from 'styled-components';

interface CheckboxLiquidProps {
  selectedCheckbox: string | null;
  setSelectedCheckbox: (id: string | null) => void;
}

const CheckboxLiquid: React.FC<CheckboxLiquidProps> = ({
  selectedCheckbox,
  setSelectedCheckbox
}) => {
  const handleCheckboxChange = (id: string) => {
    setSelectedCheckbox(id === selectedCheckbox ? null : id);
  };

  return (
    <CheckboxLiquidStyle>
      <div className="customCheckBoxHolder">
        <div className="customCheckBoxWrapper">
          <input
            type="checkbox"
            id="checkbox1"
            className="customCheckBoxInput"
            checked={selectedCheckbox === 'kg'}
            onChange={() => handleCheckboxChange('kg')}
          />
          <label htmlFor="checkbox1" className="customCheckBox">
            <span className="inner">kg</span>
          </label>
        </div>
        <div className="customCheckBoxWrapper">
          <input
            type="checkbox"
            id="checkbox2"
            className="customCheckBoxInput"
            checked={selectedCheckbox === 'g'}
            onChange={() => handleCheckboxChange('g')}
          />
          <label htmlFor="checkbox2" className="customCheckBox">
            <span className="inner">g</span>
          </label>
        </div>
        <div className="customCheckBoxWrapper">
          <input
            type="checkbox"
            id="checkbox3"
            className="customCheckBoxInput"
            checked={selectedCheckbox === 'litro'}
            onChange={() => handleCheckboxChange('litro')}
          />
          <label htmlFor="checkbox3" className="customCheckBox">
            <span className="inner">Litro</span>
          </label>
        </div>
        <div className="customCheckBoxWrapper">
          <input
            type="checkbox"
            id="checkbox4"
            className="customCheckBoxInput"
            checked={selectedCheckbox === 'ml'}
            onChange={() => handleCheckboxChange('ml')}
          />
          <label htmlFor="checkbox4" className="customCheckBox">
            <span className="inner">ml</span>
          </label>
        </div>
        <div className="customCheckBoxWrapper">
          <input
            type="checkbox"
            id="checkbox5"
            className="customCheckBoxInput"
            checked={selectedCheckbox === 'unidade'}
            onChange={() => handleCheckboxChange('unidade')}
          />
          <label htmlFor="checkbox5" className="customCheckBox">
            <span className="inner">Un.</span>
          </label>
        </div>
      </div>
    </CheckboxLiquidStyle>
  );
};

const CheckboxLiquidStyle = styled.section`
  height: 100px;
  width: 100%;
  display: grid;
  place-items: center;

  .customCheckBoxHolder {
    margin: 5px 0 5px 0;
    display: flex;
    width: 100%;
  }

  .customCheckBox {
    width: fit-content;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    padding: 2px 8px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0px;
    color: white;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 300ms;
    transition-property: color, background-color, box-shadow;
    display: flex;
    height: 45px;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 1px 0px inset,
      rgba(255, 255, 255, 0.17) 0px 1px 1px 0px;
    outline: none;
    justify-content: center;
    min-width: 100%;
  }

  @media screen and (min-width: 375px) {
    .customCheckBox {
      min-width: 50px;

      font-size: 10px;
    }
  }
  @media screen and (min-width: 390px) {
    .customCheckBox {
      min-width: 52px;
      font-size: 12px;
    }
  }
  @media screen and (min-width: 414px) {
    .customCheckBox {
      min-width: 56px;
      font-size: 12px;
    }
  }

  @media screen and (min-width: 600px) {
    .customCheckBox {
      min-width: 115px;
    }
  }

  .customCheckBox:hover {
    color: white;
    box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset,
      rgba(255, 255, 255, 0.17) 0px -1px 1px 0px,
      rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
  }

  .customCheckBox .inner {
    font-size: 200%;
    font-weight: 900;
    pointer-events: none;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 300ms;
    transition-property: transform;
    transform: translateY(0px);
  }

  .customCheckBox:hover .inner {
    transform: translateY(-2px);
  }

  .customCheckBoxWrapper:first-of-type .customCheckBox {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-right: 0px;
  }

  .customCheckBoxWrapper:last-of-type .customCheckBox {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border-left: 0px;
  }

  .customCheckBoxInput {
    display: none;
  }

  .customCheckBoxInput:checked + .customCheckBox {
    background-color: purple;
    box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset,
      rgba(255, 255, 255, 0.17) 0px -1px 1px 0px,
      rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
  }
  .customCheckBoxInput:active + .customCheckBox {
    background-color: purple;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 1px 0px inset,
      rgba(255, 255, 255, 0.17) 0px 1px 1px 0px;
    transform: scale(0.9);
    transition: all 300ms ease;
  }

  .customCheckBoxInput:checked + .customCheckBox .inner {
    color: white;
  }

  .customCheckBoxInput:checked + .customCheckBox .inner {
    color: white;
  }

  .customCheckBoxInput:checked + .customCheckBox:hover {
    background-color: purple;
    box-shadow: rgba(0, 0, 0, 0.26) 0px -4px 1px 0px inset,
      rgba(255, 255, 255, 0.17) 0px -1px 1px 0px,
      rgba(0, 0, 0, 0.15) 0px 3px 6px 2px;
  }

  .customCheckBoxWrapper:hover .customCheckBox .inner {
    transform: translateY(-2px);
  }
`;

export default CheckboxLiquid;
