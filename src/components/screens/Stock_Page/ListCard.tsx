import styled from 'styled-components';
import CardProduct from './CardProduct';
import { Product } from '@/hooks/useProducts';

interface ListCardProps {
  responseProducts: Product[];
}

export default function ListCard({ responseProducts }: ListCardProps) {
  return (
    <ListCardStyle>
      <div className="list">
        {responseProducts.map((product, index) => (
          <CardProduct key={index} link={product.image} name={product.name} />
        ))}
      </div>
    </ListCardStyle>
  );
}

const ListCardStyle = styled.div`
  .list {
    width: auto;
    height: auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: flex-start;

    @media screen and (min-width: 390px) {
      width: 96vw;
    }
    @media screen and (min-width: 414px) {
      width: 91vw;
    }
    @media screen and (min-width: 414px) {
      width: auto;
    }
  }
 
  }
`;
