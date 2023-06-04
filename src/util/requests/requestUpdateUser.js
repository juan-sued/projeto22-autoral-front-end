import { axiosI } from '../../services/axios';

async function requestUpdateUser({
  updateDataUser,
  sucess,
  setStateButton,
  id,
  setUpdateDataUser
}) {
  axiosI
    .patch(`/users/`, updateDataUser)
    .then(({ data }) => {
      sucess();
    })
    .catch(err => {
      console.error(err);
      setUpdateDataUser({
        name: '',
        email: '',
        cpf: '',
        phone: ''
      });
      setStateButton('err');
      setTimeout(() => {
        console.log('aqui');
        setStateButton(true);
      }, '3000');
    });
}

export default requestUpdateUser;
