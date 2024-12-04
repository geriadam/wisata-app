export default defineNuxtRouteMiddleware(async (to) => {
  const availabilityStore = useAvailabilityStore();
  const filterStore = useFiltersStore();
  const slug = to.params.slug;
  const propertyId = extractPropertyId(slug);

  if (propertyId) {
    await availabilityStore.fetchAvailability(propertyId, filterStore);
  } else {
    console.error('Invalid slug format');
  }
});