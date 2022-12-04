const formatter = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

export default function formatMoney(priceInCents) {
  return formatter.format(priceInCents / 100);
}
