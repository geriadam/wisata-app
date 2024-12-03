<template>
  <v-sheet class="searchnav-wrapper mx-n4 mx-sm-0 px-4 px-md-6 pt-2 rounded-b-lg bg-white" elevation="1">
    <div class="d-sm-column flex-sm-column d-lg-flex flex-lg-row flex-md-nowrap py-4 row--dense justify-start">
      <div class="autocomplete-filter flex-md-grow-1 mb-4 mb-lg-0 col-sm-12 col-md-auto col-12 pr-2">
        <FiltersLocation />
      </div>
      <div class="date-filter flex-shrink-1 mb-4 mb-lg-0 col-sm-6 col-md-auto col-12 pr-2">
        <FiltersDateCheckin />
      </div>
      <div class="date-filter flex-shrink-1 mb-4 mb-lg-0 col-sm-6 col-md-auto col-12 pr-2">
        <FiltersGuest />
      </div>
      <div class="col-sm-12 col-md-auto col-12 pr-2">
        <v-btn block height="100%" rounded="lg" variant="flat" color="primary" @click="handleSearch">
          <template #prepend>
            <v-icon style="font-size: 20px; height: 20px; width: 20px;">mdi-magnify</v-icon>
          </template>
          <span class="text-none text-subtitle-1 font-weight-medium">Search</span>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>

const filterStore = useFiltersStore();
const router = useRouter();

const handleSearch = () => {
  const { slug, checkin, checkout, guest_per_room, number_of_room } = filterStore;
  router.push({
    path: `/stay/${slug}`,
    query: {
      checkin,
      checkout,
      guest_per_room,
      number_of_room,
    },
  });
};
</script>
<style scoped></style>