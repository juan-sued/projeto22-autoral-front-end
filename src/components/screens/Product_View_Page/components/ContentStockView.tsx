import { IStock } from '@/util/requests/products/stockRequests';
import styled from 'styled-components';
import SectionGlass from './SectionGlass';
import { useEffect, useRef } from 'react';
import { IProductById } from '@/hooks/useProducts';

interface ContentStockViewProps {
  product: IProductById;
}

const ContentStockView: React.FC<ContentStockViewProps> = ({ product }) => {
  const stockEntries = Object.entries(product.stock);
  function clicked(id: number) {
    console.log('stock clicado: ', id);
  }

  return (
    <ContentStockViewStyle>
      <SectionGlass
        titleSection={product.cupSize.category.name}
        stockList={[product.cupSize]}
      />

      {stockEntries.map(([categoryName, stocks], index) => (
        <SectionGlass
          key={index}
          titleSection={categoryName}
          stockList={stocks}
        />
      ))}
    </ContentStockViewStyle>
  );
};

interface ContentStockViewStyle {}

const ContentStockViewStyle = styled.div`
  width: 100%;
  margin-top: -1px;
  background-color: #2f002f;
  padding: 20px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .contentDetails {
  }
`;
export default ContentStockView;
