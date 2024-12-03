<template>
  <div class="container">
    <StayLocationCatalog />
    <div id="tabs-row-desktop" class="align-center justify-space-between mb-6">
      <div class="col col-12">
        <v-divider v-if="$device.isDesktop" class="mb-n1"></v-divider>
        <StayTabs v-model="selectedTab" :tabs="tabs" />
        <v-divider v-if="!$device.isDesktop" class="mb-n1"></v-divider>
      </div>
    </div>
    Photos
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  middleware: 'fetch-property-content',
});

const route = useRoute();
const selectedTab = ref('photos');
const tabs = computed(() => {
  const basePath = route.path.split('/').slice(0, -1).join('/'); // Get the base path
  return [
    {
      label: 'Deals',
      icon: 'mdi-tag-outline',
      route: { path: `${basePath}`, query: { ...route.query, tab: 'deals' } },
      value: 'deals',
    },
    {
      label: 'Photos',
      icon: 'mdi-grid',
      route: { path: `${basePath}/photos`, query: { ...route.query, tab: 'photos' } },
      value: 'photos',
    },
    {
      label: 'Info',
      icon: 'mdi-information-outline',
      route: { path: `${basePath}/info`, query: { ...route.query, tab: 'info' } },
      value: 'info',
    },
  ];
});
</script>