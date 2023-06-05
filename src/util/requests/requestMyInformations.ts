import { UserAndAddressesInfo } from '../../components/screens/MyInformations_Page/MyInformation';
import { User } from '../../hooks/useAuth';
import { axiosI } from '../../services/axios';

interface UserInfo extends User {}

function requestMyInformations(
  userAndAddressesInfo: UserAndAddressesInfo,
  setUserAndAddressesInfo: (value: UserAndAddressesInfo) => void,
  userInfo: UserInfo | null
): void {
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
