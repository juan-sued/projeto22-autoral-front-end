import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonSubmit from '../../../shared/ButtonSubmit';
import Loading from '../../../shared/Loading';
import SelectCategory from './SelectCategory';
import { Product, useProduct } from '../../../../hooks/useProducts';
import requestRegisterProduct from '../../../../util/requests/requestRegisterProduct';
import CheckboxLiquid from '../../../shared/CheckboxLiquid';

export interface ObjNewProduct {
  category: string | number;
  name: string;
  amount: string;
  description: string;
  price: string;
  image: string;
  unitOfMeasure: string;
}

export default function InputsRegisterProduct() {
  const navigate = useNavigate();
  const { productsAndCategories } = useProduct();
  const success = () => {
    navigate('/success-register');
  };
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [objNewProduct, setObjNewProduct] = useState<ObjNewProduct>({
    category: '',
    name: '',
    amount: '',
    description: '',
    price: '',
    image: '',
    unitOfMeasure: ''
  });

  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setObjNewProduct({ ...objNewProduct, [e.target.name]: e.target.value });
  };

  const [stateButton, setStateButton] = useState('habilitado');

  function registerProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStateButton('loading');

    //================ Validação de nova categoria =================>

    const categories = productsAndCategories.categoriesList;

    if (objNewProduct.category) {
      const isCategoryRegistered = categories.find(
        category => category.name === objNewProduct.category
      );

      if (isCategoryRegistered) {
        setObjNewProduct({
          ...objNewProduct,
          category: isCategoryRegistered.name
        });
        setStateButton('isCategoryRegistered');
      }
    }
    if (objNewProduct.category === '') {
      setObjNewProduct({ ...objNewProduct, category: selectedCategory });
    }

    if (selectedCheckbox) {
      setObjNewProduct({ ...objNewProduct, unitOfMeasure: selectedCheckbox });
    } else {
      setStateButton('err');
      return alert('Deve selecionar uma unidade de medida');
    }

    requestRegisterProduct(objNewProduct, setObjNewProduct, success);
  }

  if (stateButton === 'err' && objNewProduct.price.length > 0) {
    setStateButton('habilitado');
  }

  return (
    <ContainerFormStyle>
      <form onSubmit={registerProduct}>
        <section className="sectionCategories">
          <SelectCategory
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          <div className="containerAddCategory">
            <label htmlFor="inputCategory">
              Não encontrou? Adicione você mesmo:
            </label>
            <InputClass
              placeholder="Categoria"
              name="category"
              id="inputCategory"
              type="text"
              value={objNewProduct.category}
              onChange={handleChangeText}
              disabled={stateButton === 'loading' ? true : false}
            />
          </div>
        </section>

        <div className="containerImage">
          <InputClass
            placeholder="Imagem do produto"
            name="image"
            type="url"
            value={objNewProduct.image}
            onChange={handleChangeText}
            disabled={stateButton === 'loading' ? true : false}
          />
        </div>

        <section className="sectionDescriptionProduct">
          <ContainerAddName>
            <div className="containerAddProductName">
              <InputClass
                placeholder="Produto"
                name="name"
                id="inputProductName"
                type="text"
                value={objNewProduct.name}
                onChange={handleChangeText}
                disabled={stateButton === 'loading' ? true : false}
              />
            </div>
          </ContainerAddName>
          <InputClassDescription
            cols={30}
            rows={30}
            wrap="hard"
            placeholder="Descrição"
            name="description"
            id="inputProductDescription"
            className="inputProductDescription"
            value={objNewProduct.description}
            onChange={handleChangeText}
            disabled={stateButton === 'loading' ? true : false}
          />
        </section>

        <section className="sectionPrice">
          <InputClass
            placeholder="Quantidade"
            className="qtd"
            name="amount"
            type="number"
            max={10000}
            min="1"
            step="0.01"
            value={objNewProduct.amount}
            onChange={handleChangeText}
            disabled={stateButton === 'loading' ? true : false}
            required
          />
          <InputClass
            placeholder="R$ Valor"
            type="number"
            name="price"
            step="0.01"
            min="0.5"
            value={objNewProduct.price}
            onChange={handleChangeText}
            disabled={stateButton === 'loading' ? true : false}
            required
          />
        </section>
        <CheckboxLiquid
          selectedCheckbox={selectedCheckbox}
          setSelectedCheckbox={setSelectedCheckbox}
        />
        <ButtonSubmit
          backgroundcolor={
            stateButton === 'err'
              ? '#8a8893'
              : stateButton === 'loading'
              ? '#8a8893'
              : '#ffffff'
          }
          width="100%"
        >
          {stateButton === 'err' ? (
            'Não foi possível cadastrar o produto'
          ) : stateButton === 'isCategoryRegistered' ? (
            'Categoria já cadastrada.'
          ) : stateButton === 'loading' ? (
            <Loading height={'20'} width={'20'} />
          ) : (
            'Cadastrar'
          )}
        </ButtonSubmit>
      </form>
    </ContainerFormStyle>
  );
}

const ContainerFormStyle = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  margin-top: 20px;
  background-color: rgba(215, 215, 215, 0.3);
  padding-top: 20px;
  border-radius: 10px;
  width: 95%;
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.25);
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    max-width: 600px;
    color: white;
    font-size: 19px;

    label {
      margin-left: 5px;
      margin-bottom: 4px;
      font-weight: 400;
      font-size: 15px;
      color: black;
    }

    input {
      box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.25);
    }
  }

  .sectionCategories {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;

    input:last-child {
      width: 100%;
      border-radius: 5px 5px 0 0;
    }

    .containerAddCategory {
      display: flex;
      flex-direction: column;
    }

    .containerAddCategory {
      width: 100%;
    }
  }

  .sectionDescriptionProduct {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;

    .inputProductDescription {
      min-height: 120px;
      max-height: 120px;
      min-width: 100%;
      box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.25);
    }

    .container {
      width: 100%;
      display: flex;
      align-items: flex-end;
      margin-top: 12px;
    }

    .containerAddProductName {
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        min-width: 100%;
      }
    }

    input:last-child {
      width: 60px;
    }
  }

  .sectionPrice {
    display: flex;
    max-width: 100%;
    margin-bottom: 10px;
    hei input:last-child {
      max-width: 140px;
    }
    .qtd {
      margin-right: 10px;
      max-width: 50%;
    }
  }

  select {
    :hover {
      cursor: pointer;
    }
  }
`;

const ContainerAddName = styled.div`
  margin-top: 13px;
  height: 100%;
  transition: all 0.5s ease-out;
  max-height: 65px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const InputClass = styled.input`
  font-size: 20px;
  width: 100%;
  height: 45px;
  background: #ffffff;
  border: 1px solid #d4d4d4;
  font-family: 'Josefin Slab', serif;
  border-radius: 5px;
  padding-left: 10px;
  color: #000000;

  ::placeholder {
    color: #0004;
  }
`;

interface InputClassDescriptionProps {
  heightToggle?: string;
}

const InputClassDescription = styled.textarea<InputClassDescriptionProps>`
  font-size: 20px;
  width: 100%;
  height: ${props => props.heightToggle};
  background: #ffffff;
  border: 1px solid #d4d4d4;
  font-family: 'Josefin Slab', serif;
  border-radius: 5px;
  padding-left: 10px;
  transition: all 0.3s 0s ease-out;
  margin-bottom: 9px;
  min-height: 52px;
  color: #000000;
  resize: none;
  padding-top: 7px;
  padding-bottom: 7px;
  font-size: 20px;

  ::placeholder {
    color: #0004;
  }
`;

export { ContainerFormStyle };
