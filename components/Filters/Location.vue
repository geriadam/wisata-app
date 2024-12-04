<template>
  <div style="position: relative;">
    <v-text-field v-model="searchQuery" label="Where are you going?" variant="outlined" rounded="lg" :focused="isFocused"
      clearable :color="searchQuery.length > 0 || isFocused ? 'primary' : 'default'" :hide-details="true"
      :error="error" :error-messages="errorMessages" @focus="onFocus" @blur="onBlur" @update:modelValue="onSearch">
      <template #prepend-inner>
        <v-icon :color="isFocused ? 'primary' : 'default'">mdi-map-marker-outline</v-icon>
      </template>
      <template #clear>
        <v-icon :color="isFocused ? 'primary' : 'default'">mdi-close-circle</v-icon>
      </template>
      <v-menu v-model="openMenu" height="420px" :open-on-click="openMenu" target="parent">
        <v-list class="px-2 py-0 pt-2 w-search-autocomplete">
          <div v-if="loading" class="d-flex flex-row align-center justify-center">
            <AppLoader size="40" />
          </div>
          <div v-if="emptyState" class="pa-2" style="min-height: 64px;">
            <p class="mb-0 text-body-2 text--primary">
              No results found for <span class="font-weight-medium">{{ searchQuery }}</span>
            </p>
            <p class="mb-0 text-body-2 text-secondary">Try other keywords</p>
          </div>
          <v-list-item v-if="!emptyState" v-for="(item, index) in localSuggestions" :key="index"
            @click="selectItem(item)" class="mb-0 pa-2 rounded-sm" style="cursor: pointer;">
            <div class="location-autocomplete-option">
              <div class="mb-1">
                <v-chip :color="getChipColor(item.location_type)" size="x-small" rounded="0"
                  class="ma-0 px-2 py-0 d-inline-flex flex-row flex-nowrap justify-start align-center"
                  style="height: 20px !important;">
                  <v-icon :size="14" class="ma-0" :style="{ marginTop: '-1px' }">
                    {{ getIcon(item.location_type) }}
                  </v-icon>
                  <span class="ml-2 text-overline font-weight-medium">
                    {{ formatLocationType(item.location_type) }}
                  </span>
                </v-chip>
              </div>
              <p class="mb-0 text-h7 text-truncate text-none" v-html="item.name"></p>
              <p class="mb-0 text-caption text--secondary text-truncate" v-html="item.highlight_data.name_suffix">
              </p>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-text-field>
  </div>
</template>

<script setup>

const filterStore = useFiltersStore();
const route = useRoute();
const propertyContentStore = usePropertyContentStore();
const { searchQuery, suggestions, loading, error, errorMessages, fetchSuggestions } =
  useLocationSearch();

const slug = route.params.slug;
const openMenu = ref(false);

const localSuggestions = computed(() => {
  return searchQuery.value && searchQuery.value.length >= 3
    ? suggestions.value
    : [];
});

const emptyState = computed(() => {
  return (
    !loading.value &&
    !error.value &&
    searchQuery.value &&
    suggestions.value.length === 0
  );
});

const propertyId = extractPropertyId(slug);
const propertyData = computed(() => propertyContentStore.properties[propertyId] || {});
watchEffect(() => {
  if (propertyData.value?.name && propertyData.value?.name_suffix) {
    searchQuery.value = `${propertyData.value.name}, ${propertyData.value.name_suffix}`;
  }
});

const isFocused = ref(true);
const onFocus = () => {
  isFocused.value = true;
  if (searchQuery.value) {
    openMenu.value = true;
    onSearch(searchQuery.value);
  }
};

const onBlur = () => {
  isFocused.value = false;
};

const onSearch = (query) => {
  if (query && query.length >= 3) {
    fetchSuggestions(query.replace(/\s+/g, '+'));
    openMenu.value = true;
  } else {
    openMenu.value = false;
  }
};

const selectItem = (item) => {
  searchQuery.value = `${item.name}, ${item.name_suffix}`;
  openMenu.value = false;
  filterStore.setFilters({
    checkin: filterStore.checkin,
    checkout: filterStore.checkout,
    guest_per_room: filterStore.guest_per_room,
    number_of_room: filterStore.number_of_room,
    slug: item.slug,
  });
};

const getChipColor = (locationType) => {
  if (locationType === "property") {
    return "primary";
  } else if (locationType === "area") {
    return "success";
  }
  return "success";
};

const getIcon = (locationType) => {
  if (locationType === "property") {
    return "mdi-bed-outline";
  } else if (locationType === "area") {
    return "mdi-map-marker-outline";
  }
  return "mdi-domain";
};

const formatLocationType = (locationType) => {
  return locationType.replace(/_/g, " ");
};
</script>
<style scoped>
.w-search-autocomplete .v-list-item:hover {
  background-color: #F5F5F5;
}

.text-overline {
  font-family: Roboto, BlinkMacSystemFont, sans-serif !important;
  font-size: .6875rem !important;
  font-weight: 400;
  letter-spacing: .05em !important;
  line-height: 1.1375rem;
  text-transform: uppercase !important;
}
</style>