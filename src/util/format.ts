import dayjs from 'dayjs';

export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
});

export function returnDayFormated(date: string): string {
  return dayjs(date).format('DD-MM-YYYY');
}
