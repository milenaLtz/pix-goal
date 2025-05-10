const getPixelWord = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "пикселей";
  }
  if (lastDigit === 1) {
      return "пиксель";
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
      return "пикселя";
  }
  return "пикселей";
}
export default getPixelWord;
