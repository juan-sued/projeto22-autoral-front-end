import { useAuth } from '@/hooks/useAuth';
import pagesRequests from '@/util/requests/pages/pagesRequests';
import { useEffect, useRef, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

import CardAddAddress from './components/CardAddAddress';
import CardAddress from './components/CardAddress';
import CardIdentify, { UserDetails } from './components/CardIdentify';
import Loading from '@/components/shared/Loaders/Loading';
import Main from '@/components/shared/Main';
import TitlePage from '@/components/shared/Titles/TitlePage';
import userRequests from '@/util/requests/users/userRequests';

interface Address {
  street: string;
  number: string;
  city: string;
  neighborhood: string;
  state: string;
  cep: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface UserAndAddressesInfo extends UserDetails {
  addresses?: Address[];
}

export default function MyInformationPage() {
  const { userInfo } = useAuth();

  const [userAndAddressesInfo, setUserAndAddressesInfo] =
    useState<UserAndAddressesInfo | null>(null);

  const [requestKey, setRequestKey] = useState(false);
  const [editToggleCard, setEditToggleCard] = useState(false);
  useEffect(() => {
    userRequests.getUserAndAddresses(setUserAndAddressesInfo, userInfo?.id);
  }, [requestKey]);

  if (userAndAddressesInfo) {
    return (
      <>
        <TitlePage title={'Minha informações'} to={'/'} />
        <Main margin_top="10">
          <ContainerCard>
            {userAndAddressesInfo ? (
              <CardIdentify
                userDetails={userAndAddressesInfo}
                id={userInfo ? userInfo.id : 0}
                requestKey={requestKey}
                setRequestKey={setRequestKey}
              />
            ) : (
              <Loading marginTop={'50px'} />
            )}

            <TitleSession>
              <h1>Endereços:</h1>
              <div
                className="containerIcon"
                onClick={() => setEditToggleCard(!editToggleCard)}
              >
                <MdAdd color="purple" size="25px" className="iconAdd" />
              </div>
            </TitleSession>
            <CardAddAddress
              editToggleCard={editToggleCard}
              setEditToggleCard={setEditToggleCard}
              requestKey={requestKey}
              setRequestKey={setRequestKey}
            />
            {userAndAddressesInfo.addresses ? (
              userAndAddressesInfo.addresses.map((address, index) => (
                <CardAddress
                  key={index}
                  street={address.street}
                  number={address.number}
                  city={address.city}
                  neighborhood={address.neighborhood}
                  state={address.state}
                  cep={address.cep}
                  createdAt={address.createdAt}
                  updatedAt={address.updatedAt}
                  idAddress={address.id}
                  requestKey={requestKey}
                  setRequestKey={setRequestKey}
                />
              ))
            ) : (
              <Loading marginTop={'100px'} />
            )}
          </ContainerCard>
        </Main>
      </>
    );
  }

  return (
    <>
      <TitlePage title={'Minha informações'} to={'/'} />
      <Main margin_top="0">
        <ContainerCard>
          <Loading marginTop={'120px'} />
        </ContainerCard>
      </Main>
    </>
  );
}

const ContainerCard = styled.div`
  padding: 15px;
  background-color: purple;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  min-height: 100vh;
  margin-bottom: 20px;

  button {
    :hover {
      cursor: pointer;
    }
  }
`;

const TitleSession = styled.div`
  margin-top: 60px;
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;

  h1 {
    color: white;
    font-size: 30px;
  }

  .containerIcon {
    background-color: white;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;
    border-radius: 3px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);

    :hover {
      cursor: pointer;
      border: solid 1px purple;
      background-color: #d196d1;
    }

    img {
      color: red;
      width: 23px;
    }
  }
`;
