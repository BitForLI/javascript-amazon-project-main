export const deliveryOptions = [{
  id: '1',
  deliveryDate: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDate: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDate: 1,
  priceCents: 999
}];

export function getDeliveryOption(optionId) {
  return deliveryOptions.find(option => option.id === optionId)||deliveryOptions[0];
}