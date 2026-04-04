export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return Number(num).toFixed(decimals);
}

export function parseCurrency(str: string): number {
  return parseFloat(str.replace(/[^0-9.-]+/g, ''));
}
