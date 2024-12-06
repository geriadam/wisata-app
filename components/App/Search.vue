<template>
  <v-sheet class="searchnav-wrapper mx-n4 mx-sm-0 px-4 px-md-6 pt-2 rounded-b-lg bg-white" elevation="1">
    <div class="d-sm-column flex-sm-column d-lg-flex flex-lg-row flex-md-nowrap py-4 justify-start">
      <v-col md="12" sm="12" class="autocomplete-filter flex-md-grow-1 mb-4 mb-lg-0 col-md-auto pa-1">
        <FiltersLocation />
      </v-col>
      <v-col md="12" sm="12" class="date-filter flex-shrink-1 mb-4 mb-lg-0 col-md-auto pa-1">
        <FiltersDateCheckin />
      </v-col>
      <v-col md="12" sm="12" class="date-filter flex-shrink-1 mb-4 mb-lg-0 col-md-auto pa-1">
        <FiltersGuest />
      </v-col>
      <v-col md="12" sm="12" class="col-md-auto pa-1">
        <v-btn block height="100%" rounded="lg" size="large" variant="flat" color="primary" @click="handleSearch" style="height: 56px;">
          <template #prepend>
            <v-icon size="20">mdi-magnify</v-icon>
          </template>
          <span class="text-none text-subtitle-1 font-weight-medium">Search</span>
        </v-btn>
      </v-col>
    </div>
  </v-sheet>
</template>

<script setup>

const { toggleSearch } = useSearch();
const filterStore = useFiltersStore();
const router = useRouter();
const propertyContentStore = usePropertyContentStore();
const availabilityStore = useAvailabilityStore();
const handleSearch = async () => {
  const { slug, checkin, checkout, guest_per_room, number_of_room } = filterStore;
  const propertyId = extractPropertyId(slug);
  const [properties, availability] = await Promise.all([
    propertyContentStore.fetchPropertyContent(propertyId, ['room']),
    availabilityStore.fetchAvailability(propertyId, filterStore),
  ]);
  router.push({
    path: `/stay/${slug}`,
    query: {
      checkin,
      checkout,
      guest_per_room,
      number_of_room,
    },
  });
  toggleSearch()
};
</script>
<style scoped>
@media (min-width: 800px) {
  .col-md-auto {
    flex: 0 0 auto;
    max-width: 100%;
    width: auto;
  }
}
</style>