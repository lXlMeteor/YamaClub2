type CalculareRevelProps = {
    kuyoCount: number;
};
  
export const calculateNextLevel = ({ kuyoCount }: CalculareRevelProps): string => {
    if (kuyoCount === 0) {
      return `1`;
    } else if (kuyoCount >= 1 && kuyoCount < 3) {
      return `${3 - kuyoCount}`;
    } else if (kuyoCount >= 3 && kuyoCount < 5) {
      return `${5 - kuyoCount}`;
    } else if (kuyoCount >= 5 && kuyoCount < 7) {
      return `${7 - kuyoCount}`;
    } else if (kuyoCount >= 7 && kuyoCount < 10) {
      return `${10 - kuyoCount}`;
    } else if (kuyoCount >= 10 && kuyoCount < 15) {
      return `${15 - kuyoCount}`;
    } else if (kuyoCount >= 15) {
      return `∞`;
    }
  
    return `未知のレベルです。`;
};
  