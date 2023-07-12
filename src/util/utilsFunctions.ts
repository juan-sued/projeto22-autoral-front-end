import { IProductBasic } from '@/hooks/useProducts';

const incrementStarsFeedback = (stars: string): string[] => {
  const arrStars: string[] = [];
  const number: number = Number(stars[0]);
  const number2: number = Number(stars[2]);

  while (arrStars.length < 5) {
    if (arrStars.length < number) {
      arrStars.push('startFull');
    } else if (arrStars.length === number && number2 !== 0) {
      arrStars.push('middle');
    } else {
      arrStars.push('notpoint');
    }
  }

  return arrStars;
};

const increaseCardSizeToggle = (
  setStateCard: (state: boolean) => void,
  stateCard: boolean
): void => {
  setStateCard(!stateCard);
};

function excludeEmpty<T, Key extends keyof T>(entity: T): Omit<T, Key> {
  const newEntity = JSON.parse(JSON.stringify(entity));
  for (const key in entity) {
    if (newEntity[key] === '') {
      delete newEntity[key];
    }
  }

  return newEntity;
}

function alertEmpty<T, Key extends keyof T>(entity: T) {
  const newEntity = JSON.parse(JSON.stringify(entity));
  for (const key in entity) {
    if (newEntity[key] === '') {
      return alert(key + ' não pode estar vazio');
    }
  }
}

function calculateTotalPrice(ids: number[], products: IProductBasic[]): number {
  return ids
    .filter(productId => products.some(product => product.id === productId))
    .map(
      productId =>
        Number(products.find(product => product.id === productId)?.price) || 0
    )
    .reduce((accumulator, price) => accumulator + price, 0);
}

function formatListNames(arr: string[]): string {
  const names = arr.join(', ').replace(/,([^,]*)$/, ' e$1') + '.';
  return names;
}

function getRandomHttpCatCode(): number {
  const httpCatCodes = [
    100, 101, 102, 103, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304,
    305, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409, 410, 411, 413, 414,
    415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 444, 450,
    451, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511
  ];

  const randomIndex = Math.floor(Math.random() * httpCatCodes.length);
  return httpCatCodes[randomIndex];
}

function generateValueBetween() {
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  return randomNumber;
}

export {
  incrementStarsFeedback,
  increaseCardSizeToggle,
  calculateTotalPrice,
  excludeEmpty,
  formatListNames,
  generateValueBetween,
  getRandomHttpCatCode,
  alertEmpty
};
