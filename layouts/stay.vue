<template>
  <div>
    <v-app>
      <div class="text-center">
        <v-overlay v-model="showSearch" style="z-index: 4;"></v-overlay>
      </div>
      <AppHeader :key="route.fullPath" />
      <v-main class="mb-4" :key="route.fullPath">
        <div class="container">
          <StayLocationCatalog :key="route.fullPath" />
          <div id="tabs-row-desktop" class="align-center justify-space-between mb-6">
            <div class="col col-12">
              <v-divider v-if="isDesktop" class="mb-n1"></v-divider>
              <StayTabs :tabs="tabs" :key="route.fullPath"  />
              <v-divider v-if="!isDesktop" class="mb-n1"></v-divider>
            </div>
          </div>
          <slot />
        </div>
      </v-main>
      <AppFooter />
    </v-app>
  </div>
</template>
<script setup>
const { isDesktop } = useViewportState();
const { showSearch } = useSearch();
const route = useRoute();
const filterStore = useFiltersStore();
const propertyContentStore = usePropertyContentStore();
const slug = route.params.slug;
const propertyId = extractPropertyId(slug);

function generateId() {
    return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

const tabs = ref([]);
watch(
  () => route.fullPath,
  (newRoute) => {
    const { slug } = filterStore
    tabs.value = [
      {
        key: generateId(),
        label: 'Deals',
        icon: 'mdi-tag-outline',
        route: { path: `/stay/${slug}`, query: { ...route.query, tab: 'deals' } },
        value: 'deals',
      },
      {
        key: generateId(),
        label: 'Photos',
        icon: 'mdi-grid',
        route: { path: `/stay/${slug}/photos`, query: { ...route.query, tab: 'photos' } },
        value: 'photos',
      },
      {
        key: generateId(),
        label: 'Info',
        icon: 'mdi-information-outline',
        route: { path: `/stay/${slug}/info`, query: { ...route.query, tab: 'info' } },
        value: 'info',
      },
    ];
  },
  { immediate: true }
);

watch(
  () => propertyContentStore.properties,
  (newProperties) => {
    if (newProperties) {
      useMeta(newProperties[propertyId])
    }
  },
  { immediate: true }
);

</script>