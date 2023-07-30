import styled from 'styled-components';

import { IconType } from 'react-icons';
import { Address } from '@/components/screens/MyInformations_Page/MyInformation';
import React, { useState } from 'react';
import { IMethodPayment } from '@/components/screens/Cart_Page/components/Checkout/SectionCards';
interface CardBorderLightProps {
  iconLeft: IconType;
  iconRight: IconType;
  title: string;
  description: string;
  subDescription: string;
  functionToggle: () => void;
  toggleState: boolean;
  titleSection: string;
  children: React.ReactNode;
}

export default function CardBorderLight({
  iconLeft,
  iconRight,
  title,
  description,
  subDescription,
  functionToggle,
  toggleState,
  titleSection,
  children
}: CardBorderLightProps) {
  const iconProps = { size: 25, color: 'grey' };

  return (
    <CardBorderLightStyle onClick={functionToggle} toggleState={toggleState}>
      <div className="containerFirst">
        <div className="containerIcon">{iconLeft(iconProps)}</div>
        <div className="contentCard">
          <h1 className="title">
            <strong>{title}</strong>
          </h1>
          <p>{description} </p>
          <p>{subDescription}</p>
        </div>
        <div className="containerIconEdit">{iconRight(iconProps)}</div>
      </div>

      <section className="containerSecond">
        <div className="titleContainer">
          <h1>
            <strong>{titleSection}</strong>
          </h1>
        </div>
        {children}
      </section>
    </CardBorderLightStyle>
  );
}

// ========= subCard =============
interface RowOfCardsBorderLightProps {
  arrAddress?: Address[];
  arrMethodPayment?: IMethodPayment[];
  isAddress?: boolean;
}
export function RowOfCardsBorderLight({
  arrAddress = [],
  arrMethodPayment = [],
  isAddress = false
}: RowOfCardsBorderLightProps) {
  if (isAddress) {
    return (
      <RowOfCardsBorderLightStyle>
        {arrAddress.map(address => (
          <SubCardAddressBorderLight
            key={address.id}
            street={address.street}
            neighborhood={address.neighborhood}
            number={address.number}
          />
        ))}
      </RowOfCardsBorderLightStyle>
    );
  } else {
    return (
      <RowOfCardsBorderLightStyle>
        {arrMethodPayment.map(methodPayment => (
          <SubCardMethodPaymentBorderLight
            key={methodPayment.id}
            id={methodPayment.id}
            title={methodPayment.title}
            lastForDigits={methodPayment.lastForDigits}
          />
        ))}
      </RowOfCardsBorderLightStyle>
    );
  }
}

interface RowOfCardsBorderLightStyleProps {}
const RowOfCardsBorderLightStyle = styled.div<RowOfCardsBorderLightStyleProps>`
  display: flex;
  gap: 30px;
  justify-content: space-between;
  align-items: start;
  height: 100%;
  overflow-x: scroll;
  padding: 20px 20px 0 20px;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;

    overflow-x: scroll;
    display: block;
    scrollbar-width: thin;
  }
  ::-webkit-scrollbar-track {
    display: block;
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: purple;
    width: 10px;
    height: 10px;

    border-radius: 10px;

    &:hover {
      background-color: #ccc;
    }
  }
`;

// ========= subCard =============
interface SubCardMethodPaymentBorderLightProps {
  id: number;
  title: string;
  lastForDigits: string;
}
function SubCardMethodPaymentBorderLight({
  id,
  title,
  lastForDigits
}: SubCardMethodPaymentBorderLightProps) {
  return (
    <SubCardMethodPaymentBorderLightStyle>
      <p>{title}</p>
      <p>
        <strong>
          {lastForDigits
            ? `**** ${lastForDigits}`
            : 'Favor especificar o troco.'}{' '}
        </strong>
      </p>
    </SubCardMethodPaymentBorderLightStyle>
  );
}

interface SubCardMethodPaymentBorderLightStyleProps {}
const SubCardMethodPaymentBorderLightStyle = styled.div<SubCardMethodPaymentBorderLightStyleProps>`
  width: 100%;
  min-width: 200px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.3) 0px 0px 0px 1px;
  display: grid;
  gap: 10px;
  height: 110px;
`;

// ========= subCard =============

// ========= subCardAddress =============

// ========= subCard =============
interface SubCardAddressBorderLightProps {
  street: string;
  number: string;
  neighborhood: string;
}
function SubCardAddressBorderLight({
  street,
  number,
  neighborhood
}: SubCardAddressBorderLightProps) {
  return (
    <SubCardAddressBorderLightStyle>
      <p>
        {street}, {neighborhood}
      </p>
      <p>Nº {number}</p>
    </SubCardAddressBorderLightStyle>
  );
}

interface SubCardAddressBorderLightStyleProps {}
const SubCardAddressBorderLightStyle = styled.div<SubCardAddressBorderLightStyleProps>`
  width: 100%;
  min-width: 200px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.3) 0px 0px 0px 1px;
  display: grid;
  gap: 10px;
  height: 110px;
`;

// ========= subCard =============

//===========================================================================================
// ========= card =============

interface CardBorderLightStyleProps {
  toggleState: boolean;
}
const CardBorderLightStyle = styled.div<CardBorderLightStyleProps>`
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.3) 0px 0px 0px 1px;
  max-width: 300px;
  width: 100%;
  gap: 50px;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  h1 {
    font-size: 20px;
  }
  p {
    font-size: 18px;
  }
  transition: all 0.5s ease-in-out;

  height: ${props => (props.toggleState ? '450px' : '160px')};

  :hover {
    background-color: rgba(27, 31, 35, 0.05);
    cursor: pointer;
  }

  @media screen and (max-width: 720px) {
    height: ${props => (props.toggleState ? '410px' : '175px')};
    gap: 60px;
  }
  .containerFirst {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: start;
    padding: 20px;
  }
  .containerSecond {
    .titleContainer {
      padding-left: 20px;
    }
  }
  .contentCard {
    display: grid;
    flex-direction: column;
    max-width: 200px;
    gap: 13px;
  }
`;
