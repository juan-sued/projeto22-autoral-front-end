import styled from 'styled-components';

interface SelectProductProps {
  setSelectedProduct: (value: string) => void;
  selectedProduct: string;
  productsForCategories: { name: string }[];
}

export default function SelectProduct({
  setSelectedProduct,
  selectedProduct,
  productsForCategories
}: SelectProductProps) {
  console.log(selectedProduct);
  return (
    <SelectProductStyle>
      <label htmlFor="products">Nome do produto: </label>
      <select
        value={selectedProduct}
        onChange={e => setSelectedProduct(e.target.value)}
        name="products"
      >
        <option value="" disabled>
          Escolha um produto
        </option>
        {productsForCategories.length > 0 ? (
          productsForCategories.map((product, index) => (
            <option key={index} value={product.name}>
              {product.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Nenhum produto disponível
          </option>
        )}
      </select>
    </SelectProductStyle>
  );
}

const SelectProductStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  select {
    background-color: #ffffff;
    border-radius: 5px 5px 0 0;
    text-align: center;
    font-family: 'Josefin Slab', serif;
    font-size: 20px;
    height: 45px;
    min-width: 150px;
    width: 100%;
    border: none;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    margin-top: 5px;
  }
}`;
