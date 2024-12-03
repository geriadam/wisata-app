export default defineNuxtRouteMiddleware(async (to) => {
  const propertyContentStore = usePropertyContentStore();
  const slug = to.params.slug;

  // Extract ID from the slug (e.g., fairmont-jakarta-9000248394)
  const idMatch = slug.match(/(\d+)$/);
  const id = idMatch ? idMatch[1] : null;

  if (id) {
    await propertyContentStore.fetchPropertyContent(id);
  } else {
    console.error('Invalid slug format');
  }
});