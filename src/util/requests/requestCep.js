import { axiosBasic } from '../../services/axios';
import { formatCEP } from '@brazilian-utils/brazilian-utils';
async function requestCep(createDataAddress, setCreateDataAddress, setStateButton) {
  axiosBasic
    .get(`viacep.com.br/ws/${createDataAddress.cep}/json/`)
    .then(({ data }) => {
      const cepFormated = formatCEP(data.cep);

      setCreateDataAddress({
        street: data.logradouro,
        neighborhood: data.bairro,
        number: '',
        state: data.uf,
        city: data.localidade,
        cep: cepFormated,
        addressDetail: data.complemento
      });
    })
    .catch(err => {
      console.log(err);
      setCreateDataAddress({
        street: '',
        neighborhood: '',
        number: '',
        state: '',
        city: '',
        cep: '',
        addressDetail: ''
      });
    });
}

export default requestCep;
