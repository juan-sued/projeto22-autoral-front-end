import ButtonGlass from '@/components/shared/Buttons/ButtonGlass';
import TitleSectionMid from '@/components/shared/Titles/TitleSectionMid';
import { IStock } from '@/util/requests/products/stockRequests';
import styled from 'styled-components';

interface SectionGlassProps {
  titleSection: string;
  stockList: IStock[];
}

const SectionGlass: React.FC<SectionGlassProps> = ({
  titleSection,

  stockList
}) => {
  function clicked(id: number) {
    console.log('stock clicado: ', id);
  }
  return (
    <SectionGlassStyle>
      <TitleSectionMid titleSection={titleSection} />

      {stockList.map((stock, index) => (
        <ButtonGlass
          key={index}
          onClick={clicked}
          id={stock.id}
          title={stock.title}
          index={index}
        />
      ))}
    </SectionGlassStyle>
  );
};

interface SectionGlassStyle {}

const SectionGlassStyle = styled.div`
  width: 100%;
  display: grid;

  place-items: center;
  gap: 20px;
`;
export default SectionGlass;
