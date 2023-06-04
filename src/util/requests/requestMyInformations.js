import { axiosI } from '../../services/axios';

async function requestMyInformations(
  userAndAddressesInfo,
  setUserAndAddressesInfo,
  userInfo
) {
  if (userInfo) {
    axiosI
      .get(`/users/${userInfo.id}`)
      .then(({ data }) => {
        setUserAndAddressesInfo(data);
      })
      .catch(err => console.error(err));
  }
}

export default requestMyInformations;
