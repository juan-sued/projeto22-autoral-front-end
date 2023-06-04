import styled from 'styled-components';

//===
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//===
import ButtonSubmit from '../../shared/ButtonSubmit';
import Loading from '../../shared/Loading';
import SelectCategory from './selectCategory';
import SelectProduct from './selectProduct';
import { useProduct } from '../../../hooks/useProducts';
import requestRegisterProduct from '../../../util/requests/requestRegisterProduct';
import { useEffect } from 'react';
export default function InputRegisterProduct() {
  const navigate = useNavigate();

  const { productsAndCategories } = useProduct();

  const [selectedProduct, setSelectedProduct] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(0);

  const [objNewProduct, setObjNewProduct] = useState({
    category: '',
    name: '',
    amount: '',
    description: '',
    price: '',
    image: ''
  });
  console.log(objNewProduct);
  const [productsForCategories, setProductsForCategories] = useState([]);

  useEffect(() => {
    if (selectedCategory > 1) {
      const productsByIdCategory = productsAndCategories.productsList.filter(
        product => product.categoryId === selectedCategory
      );

      setProductsForCategories(productsByIdCategory);
    } else {
      setProductsForCategories([]);
    }
  }, [selectedCategory]);

  const handleChangeText = e => {
    setObjNewProduct({ ...objNewProduct, [e.target.name]: e.target.value });
  };
  const sucess = () => {
    navigate('/sucess-register');
  };

  const [stateButton, setStateButton] = useState('habilitado');

  function registerProduct(event) {
    event.preventDefault();

    setStateButton('loading');

    //================ Validação de novo produto =================>

    const productsList = productsAndCategories.productsList;

    if (objNewProduct.name) {
      const isProductRegistered = productsList.some(
        product => product.name === objNewProduct.name
      );

      if (isProductRegistered) {
        setObjNewProduct({ ...objNewProduct, name: '' });
        setStateButton('isProductRegistered');
      }
    } else {
      setObjNewProduct({ ...objNewProduct, name: selectedProduct });
    }
    //================ Validação de nova categoria =================>

    const categories = productsAndCategories.categoriesList;

    if (objNewProduct.category) {
      const isCategoryRegistered = categories.some(
        category => category.name === objNewProduct.category
      );

      if (isCategoryRegistered) {
        setObjNewProduct({ ...objNewProduct, category: isCategoryRegistered.id });
        setStateButton('isCategoryRegistered');
      }
    }
    if (objNewProduct.category === '') {
      console.log(selectedCategory);
      setObjNewProduct({ ...objNewProduct, category: selectedCategory });
    }
    requestRegisterProduct(objNewProduct, setObjNewProduct, sucess);
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
            <label htmlFor="inputCategory">Não encontrou? Adicione você mesmo:</label>
            <InputClass
              placeholder="Categoria"
              name="category"
              id="inputCategory"
              type="text"
              value={objNewProduct.category}
              onChange={handleChangeText}
              disabled={stateButton === 'loading' ? 'disabled' : ''}
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
            disabled={stateButton === 'loading' ? 'disabled' : ''}
          />
        </div>

        <section className="sectionDescriptionProduct">
          <SelectProduct
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            selectedCategory={selectedCategory}
            productsForCategories={productsForCategories}
          />
          <ContainerAddName
            heightTogle={productsForCategories.length > 0 ? '0%' : '100%'}
          >
            <div className="containerAddProductName">
              <label htmlFor="inputProductName">Não encontrou?</label>
              <InputClass
                placeholder="Produto"
                name="name"
                id="inputProductName"
                type="text"
                value={objNewProduct.name}
                onChange={handleChangeText}
                disabled={
                  stateButton === 'loading' || productsForCategories.length > 0
                    ? 'disabled'
                    : ''
                }
              />
            </div>
          </ContainerAddName>
          <InputClassDescription
            cols="30"
            rows="30"
            wrap="hard"
            heightTogle={productsForCategories.length > 0 ? '200px' : '50px'}
            placeholder="Descrição"
            name="description"
            id="inputProductDescription"
            className="inputProductDescription"
            type="text"
            value={objNewProduct.description}
            onChange={handleChangeText}
            disabled={stateButton === 'loading' ? 'disabled' : ''}
          />
        </section>

        <section className="sectionPrice">
          <InputClass
            placeholder="Qntd por copo (g ou ml)"
            className="qtd"
            name="amount"
            type="number"
            max={10000}
            min="1"
            step="0.01"
            value={objNewProduct.amount}
            onChange={handleChangeText}
            disabled={stateButton === 'loading' ? 'disabled' : ''}
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
            disabled={stateButton === 'loading' ? 'disabled' : ''}
            required
          />
        </section>

        <ButtonSubmit
          type="submit"
          backgroundcolor={
            stateButton === 'err'
              ? '#8a8893'
              : stateButton === 'loading'
              ? '#8a8893'
              : '#ffffff'
          }
        >
          {stateButton === 'err' ? (
            'Não foi possível cadastrar o produto'
          ) : stateButton === 'isCategoryRegistered' ? (
            'Categoria já cadastrada.'
          ) : stateButton === 'loading' ? (
            <Loading height={20} width={20} />
          ) : (
            'Casdastrar'
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

  .containerImage {
    margin-bottom: 10px;
  }

  .sectionDescriptionProduct {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    max-height: 300px;
    .inputProductDescription {
      min-width: 100%;
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

    input:last-child {
      max-width: 140px;
    }
    .qtd {
      margin-right: 10px;
      min-width: 228px;
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
  overflow-y: hidden;
  height: ${props => props.heightTogle};
  transition: all 0.5s ease-out;
  max-height: 65px;
  margin-bottom: 10px;
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
const InputClassDescription = styled.textarea`
  font-size: 20px;
  width: 100%;
  height: ${props => props.heightTogle};

  background: #ffffff;
  border: 1px solid #d4d4d4;
  font-family: 'Josefin Slab', serif;
  border-radius: 5px;
  padding-left: 10px;
  transition: all 0.3s 0s ease-out;
  margin-bottom: 9px;
  min-height: 52px;
  color: #000000;
  text-align: start;
  padding: 10px;
  text-overflow: ellipsis;
  ::placeholder {
    color: #0004;
  }
`;
