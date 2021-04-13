const formatPrice = (value: number): string => {
  const valueFormat = (Math.round(value * 100) / 100).toFixed(2);
  return `R$${valueFormat}`;
};

export { formatPrice };
