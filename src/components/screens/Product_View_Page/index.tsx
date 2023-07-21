import Main from '@/components/shared/Main';
import TitlePage from '@/components/shared/Titles/TitlePage';
import styled from 'styled-components';

import { formatPrice } from '@/util/format';
import ContentProductView from './components/ContentProductView';
import StockAndProductsDetails from './components/StockAndProductDetails';
import { IProductById } from '@/hooks/useProducts';
import { useCallback, useEffect, useRef } from 'react';
export default function ProductViewPage() {
  const example: IProductById = {
    id: 3,
    name: 'Exemplo de Pedido',
    image: 'fotoaquiasdiasda',
    price: '17.5',
    cupSizeId: 7,
    cupSize: {
      amount: 3,
      categoryId: 2,
      id: 2,
      title: 'Tamanho 1000ml',
      description: 'Maior que temos',
      image: 'asdasdasdasda',
      price: '27',
      quantity_for_unity: '1000',
      unit_of_measure: 'ml',
      category: {
        id: 5,
        name: 'categoria 2',
        description: 'aa'
      }
    },
    stock: {
      'categoria 2': [
        {
          id: 7,
          title: 'Tamanho 1000ml',
          description: 'Maior que temos',
          image: 'asdasdasdasda',
          price: '27',
          quantity_for_unity: '1000',
          unit_of_measure: 'ml',
          amount: 12,
          categoryId: 5,
          category: {
            id: 5,
            name: 'categoria 2',
            description: 'descrição categoria 2'
          }
        }
      ],
      Tamanhos: [
        {
          id: 20,
          title: 'Natura5asasdasd',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 19,
          title: 'Natura5',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 19,
          title: 'Natura5',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 20,
          title: 'Natura5asasdasd',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 21,
          title: 'Natura5asaasdasdasdsdasd',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 19,
          title: 'Natura5',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 19,
          title: 'Natura5',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 20,
          title: 'Natura5asasdasd',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        },
        {
          id: 21,
          title: 'Natura5asaasdasdasdsdasd',
          description: 'Um belíssimo Açaí Natural',
          image: 'asdasdasdasda',
          price: '0',
          quantity_for_unity: '1',
          unit_of_measure: 'unity',
          amount: 40,
          categoryId: 12,
          category: {
            id: 12,
            name: 'Tamanhos',
            description: 'Categoria para Tamanhos de copo'
          }
        }
      ]
    }
  };
  const priceFormatted = formatPrice(Number(example.price));

  const detailsRef = useRef<HTMLDivElement>(null);
  const topPageRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    topPageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ProductViewPageStyle>
      <div ref={topPageRef} />
      <TitlePage title={example.name} />
      <Main>
        <ContentProductView
          image={example.image}
          priceFormatted={priceFormatted}
          handleScroll={handleScroll}
        />
        <StockAndProductsDetails product={example} ref={detailsRef} />
      </Main>
    </ProductViewPageStyle>
  );
}
interface ProductViewPageStyleProps {}

const ProductViewPageStyle = styled.div<ProductViewPageStyleProps>``;
