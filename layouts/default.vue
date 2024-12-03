<template>
  <div>
    <v-app>
      <div class="text-center">
        <v-overlay v-model="showSearch" style="z-index: 4;"></v-overlay>
      </div>
      <AppHeader />
      <v-main class="mb-4">
        <div class="container">
          <StayLocationCatalog />
          <div id="tabs-row-desktop" class="align-center justify-space-between mb-6">
            <div class="col col-12">
              <v-divider v-if="$device.isDesktop" class="mb-n1"></v-divider>
              <StayTabs :tabs="tabs" />
              <v-divider v-if="!$device.isDesktop" class="mb-n1"></v-divider>
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

const { showSearch } = useSearch();
const route = useRoute();
const slug = route.params.slug;
const tabs = [
  {
    label: 'Deals',
    icon: 'mdi-tag-outline',
    route: { path: `/stay/${slug}`, query: { ...route.query, tab: 'deals' } },
    value: 'deals',
  },
  {
    label: 'Photos',
    icon: 'mdi-grid',
    route: { path: `/stay/${slug}/photos`, query: { ...route.query, tab: 'photos' } },
    value: 'photos',
  },
  {
    label: 'Info',
    icon: 'mdi-information-outline',
    route: { path: `/stay/${slug}/info`, query: { ...route.query, tab: 'info' } },
    value: 'info',
  },
];
</script>