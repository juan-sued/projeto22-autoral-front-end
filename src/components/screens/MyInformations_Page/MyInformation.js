import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';
import requestMyInformations from '../../../util/requests/requestMyInformations';
import Loading from '../../shared/Loading';
import Main from '../../shared/Main';
import TitlePage from '../../shared/TitlePage';
import CardAddress from './components/CardAddress';
import CardIdentify from './components/CardIdentify';
import CardAddAddress from './components/CardAddAddress';
import { MdAdd } from 'react-icons/md';
export default function MyInformationPage() {
  const { userInfo } = useAuth();
  const [userAndAddressesInfo, setUserAndAddressesInfo] = useState({});
  const [requestKey, setRequestKey] = useState(false);
  const [editToggleCard, setEditToggleCard] = useState(false);
  useEffect(() => {
    requestMyInformations(userAndAddressesInfo, setUserAndAddressesInfo, userInfo);
    return () => {
      setUserAndAddressesInfo({});
    };
  }, [requestKey]);

  if (
    userAndAddressesInfo.user !== undefined &&
    userAndAddressesInfo.addresses !== undefined
  )
    return (
      <>
        <TitlePage title={'Minha informações'} to={'/'} />
        <Main>
          <ContainerCard>
            {userAndAddressesInfo.user !== undefined ? (
              <CardIdentify
                userAndAddressesInfo={userAndAddressesInfo}
                id={userInfo.id}
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
            {userAndAddressesInfo.addresses !== undefined ? (
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

  return (
    <>
      <TitlePage title={'Minha informações'} to={'/'} />
      <Main>
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
  min-height: 350px;
  width: 90%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
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
