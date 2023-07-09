import { axiosI } from '@/services/axios';
import { UserAndAddressesInfo } from '@/components/screens/MyInformations_Page/MyInformation';
import { User } from '@/hooks/useAuth';

function getMyInformationsPage(
  setUserAndAddressesInfo: (value: UserAndAddressesInfo) => void,
  userInfo: User | null
): void {
  if (userInfo) {
    axiosI
      .get(`/users/${userInfo.id}`)
      .then(({ data }) => {
        setUserAndAddressesInfo(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

const pagesRequests = {
  getMyInformationsPage
};

export default pagesRequests;
