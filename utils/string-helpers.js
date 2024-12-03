export const extractPropertyId = (slug) => {
  const idMatch = slug.match(/(\d+)$/);
  return idMatch ? idMatch[1] : null;
}