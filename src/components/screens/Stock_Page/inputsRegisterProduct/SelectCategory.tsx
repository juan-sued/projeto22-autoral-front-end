import styled from 'styled-components';
import { useProduct } from '../../../../hooks/useProducts';

interface SelectCategoryProps {
  setSelectedCategory: (value: number) => void;
  selectedCategory: number;
}

export default function SelectCategory({
  setSelectedCategory,
  selectedCategory
}: SelectCategoryProps) {
  const { productsAndCategories } = useProduct();
  return (
    <SelectCategoryStyle>
      <label htmlFor="categories">Escolha uma categoria:</label>
      <select
        value={selectedCategory}
        onChange={e => setSelectedCategory(Number(e.target.value))}
        name="categories"
      >
        <option disabled value="">
          Categorias
        </option>
        {productsAndCategories.categoriesList !== undefined &&
          productsAndCategories.categoriesList.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
    </SelectCategoryStyle>
  );
}

const SelectCategoryStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  margin-right: 10px;

  select {
    background-color: #ffffff;
    border-radius: 5px 5px 0 0;
    text-align: center;
    font-family: 'Josefin Slab', serif;

    font-size: smaller;
    height: 45px;
    min-width: 150px;
    width: 100%;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    margin-top: 5px;
    border: none;
  }
}`;
