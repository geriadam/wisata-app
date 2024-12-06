<template>
  <div class="mt-4 mt-sm-1 mb-0 mb-sm-8">
    <div
      class="pt-sm-2 px-0 px-md-4 d-flex flex-column flex-sm-row justify-start align-stretch justify-sm-center gc-3 ga-3">
      <div class="d-flex align-center">
        <v-icon class="ml-n1" size="18">mdi-filter-outline</v-icon>
        <p class="mb-0 ml-1 text-h8 text-md-h7 font-weight-medium text-no-wrap">
          Filter rooms by
        </p>
      </div>

      <div class="d-flex flex-row align-center gc-2" :style="!isDesktop ? 'width: 100%; max-width: 100%;' : ''">
        <!-- Clear All Button -->
        <div class="relative w-full d-flex align-center justify-center gc-2"
          :style="!isDesktop ? 'overflow-x: scroll; scrollbar-width: thin;' : ''">
          <v-chip v-if="hasSelectedFilters" color="primary" variant="outlined" :closable="false"
            @click="clearAllFilters" :style="!isDesktop ? 'width: 210px;' : ''">
            <template #append>
              <span class="font-weight-regular">Clear Filters</span>
              <div class="ml-2 mr-n1 d-flex justify-center align-center text-white rounded-circle v-sheet bg-primary"
                style="height: 18px; width: 18px;">
                <span class="font-weight-bold" style="font-size: 10px">{{ selectedFilters.length }}</span>
              </div>
            </template>
          </v-chip>

          <div class="d-flex" :style="!isDesktop ? 'overflow-x: scroll; scrollbar-width: thin;' : ''">
            <div class="d-flex gc-2">
              <v-chip v-for="(filter, index) in filters" :key="index" variant="outlined"
                :color="isFilterSelected(filter.value) ? 'primary' : ''" @click="toggleFilter(filter.value)">
                <v-icon style="font-size: 16px; height: 16px; width: 16px; margin-right: 5px;">{{ filter.icon
                  }}</v-icon>
                <span class="font-weight-medium">{{ filter.label }}</span>
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { isMobile, isDesktop } = useViewportState();
const filters = ref([
  {
    label: "Free Breakfast",
    icon: "mdi-silverware-variant",
    value: "free_breakfast",
  },
  {
    label: "Free Cancellation",
    icon: "mdi-credit-card-check-outline",
    value: "free_cancellation",
  },
]);

const selectedFilters = ref([]); // Selected filters for the component
const router = useRouter();
const route = useRoute();
const availabilityStore = useAvailabilityStore();

const hasSelectedFilters = computed(() => selectedFilters.value.length > 0);

const toggleFilter = (filterValue) => {
  const filterIndex = selectedFilters.value.indexOf(filterValue);
  if (filterIndex === -1) {
    selectedFilters.value.push(filterValue);
  } else {
    selectedFilters.value = selectedFilters.value.filter(value => value !== filterValue);
  }
  updateFilters()
  updateQueryParams()
};

const clearAllFilters = () => {
  selectedFilters.value = [];
  availabilityStore.resetFilters();
  const params = { ...route.query };
  filters.value.forEach((filter) => {
    delete params[filter.value];
  });

  router.push({ query: params });
};

const isFilterSelected = (filterValue) => selectedFilters.value.includes(filterValue);

// Update URL query parameters
const updateQueryParams = () => {
  const params = { ...route.query };

  filters.value.forEach((filter) => {
    params[filter.value] = selectedFilters.value.includes(filter.value) ? 'true' : undefined;
  });

  router.push({ query: params });
};

const updateFilters = async () => {
  const queryParams = selectedFilters.value.reduce((acc, filter) => {
    acc[filter] = true;
    return acc;
  }, {});
  availabilityStore.fetchFilteredData(queryParams);
}

onMounted(() => {
  const initialFilters = Object.keys(route.query).filter((key) => {
    return filters.value.some((filter) => filter.value === key && route.query[key] === 'true');
  });
  selectedFilters.value = initialFilters;
});

</script>

<style scoped>
@media (min-width: 800px) {
  .text-md-h8 .text-md-h7 {
    font-family: Google Sans, BlinkMacSystemFont, sans-serif !important;
    font-weight: 400;
    letter-spacing: 0 !important;
    line-height: 1.4375rem;
  }
}
</style>
