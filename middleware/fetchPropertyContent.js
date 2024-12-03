export default defineNuxtRouteMiddleware(async (to) => {
  const propertyContentStore = usePropertyContentStore();
  const slug = to.params.slug;
  const propertyId = extractPropertyId(slug);

  if (propertyId) {
    await propertyContentStore.fetchPropertyContent(propertyId);
  } else {
    console.error('Invalid slug format');
  }
});