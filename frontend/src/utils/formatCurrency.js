function formatCurrency(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return "₹0";
  }

  return `₹${number.toLocaleString("en-IN")}`;
}

export default formatCurrency;
