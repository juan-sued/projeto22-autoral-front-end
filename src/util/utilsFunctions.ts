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

export { incrementStarsFeedback, increaseCardSizeToggle };
