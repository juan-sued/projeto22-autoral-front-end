import CarouselListStock, {
  CarouselListStockProps
} from '@/components/shared/Carousels/CarouselListStock';
import TitleSectionLeft from '@/components/shared/Titles/TitleSectionLeft';
import TitleSectionRight from '@/components/shared/Titles/TitleSectionRight';

interface SectionCarouselProps extends CarouselListStockProps {
  titleSectionLeft: string;
  titleSectionRight: string;
}

export default function SectionCarousel({
  titleSectionLeft,
  titleSectionRight,
  margin_top,
  objctResponseAPI = [],
  setProductIds,
  productIds = [],
  amountSelection,
  showPrice = false
}: SectionCarouselProps) {
  return (
    <>
      <TitleSectionLeft titleSection={titleSectionLeft} />

      <TitleSectionRight titleSection={titleSectionRight} />

      <CarouselListStock
        margin_top={margin_top}
        objctResponseAPI={objctResponseAPI}
        setProductIds={setProductIds}
        productIds={productIds}
        amountSelection={amountSelection}
        showPrice={showPrice}
      />
    </>
  );
}
