export const calculateDiscount = (
  price: number,
  discountPercentage: number
): number | null => {
  if (
    !price?.toString() ||
    !discountPercentage?.toString() ||
    discountPercentage < 0
  ) {
    return price || null;
  }

  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;

  return discountedPrice;
};

export const convertDollarToBaht = (price: number): string | null => {
  if (!price?.toString() || price < 0) {
    return null;
  }

  const exchangeRate = 37.06; // Ex. The exchange rate from dollars to baht is 36.68
  const priceBaht = numberWithCommas(price * exchangeRate);
  return priceBaht;
};

export const numberWithCommas = (price: number): string => {
  if (!price?.toString() || price < 0) {
    return "0.00";
  }

  const formattedWithComma = price
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return formattedWithComma;
};
