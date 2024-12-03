export default defineNuxtRouteMiddleware(async (to) => {
  const propertyContentStore = usePropertyContentStore();
  const slug = to.params.slug;
  const propertyId = extractPropertyId(slug);

  // Extract includes from meta if provided, or default to an empty array
  const includes = to.meta.includes || [];

  if (propertyId) {
    await propertyContentStore.fetchPropertyContent(propertyId, includes);
  } else {
    console.error('Invalid slug format');
  }
});