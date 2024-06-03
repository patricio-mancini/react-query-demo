import { Decimal } from 'decimal.js';

export function formatNumber(value: number, decimals: number) {
  const decimalValue = new Decimal(value);

  if (decimalValue.isInteger()) {
    return decimalValue.toFixed(0);
  }

  return decimalValue.toFixed(decimals);
}