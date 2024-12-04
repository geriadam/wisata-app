export const extractPropertyId = (slug = '') => {
  const idMatch = slug.match(/(\d+)$/);
  return idMatch ? idMatch[1] : null;
}

export const rupiahFormat = (number = 0) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}