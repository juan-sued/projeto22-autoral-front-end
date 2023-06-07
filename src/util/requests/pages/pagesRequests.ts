import { HomeResponseAPI } from '../../../components/screens/Home_Page/HomePage';
import { axiosI } from '../../../services/axios';
import { UserAndAddressesInfo } from '../../../components/screens/MyInformations_Page/MyInformation';
import { User } from '../../../hooks/useAuth';

function homeContent(
  objHomeResponseAPI: HomeResponseAPI | null,
  setObjHomeResponseAPI: (value: HomeResponseAPI | null) => void,
  signOut: () => void
): void {
  axiosI
    .get(`/home-content`)
    .then(({ data }) => {
      setObjHomeResponseAPI(data);
    })
    .catch(err => console.error(err));
}

interface UserInfo extends User {}

function getMyInformationsPage(
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

const pagesRequests = {
  homeContent,
  getMyInformationsPage
};

export default pagesRequests;
