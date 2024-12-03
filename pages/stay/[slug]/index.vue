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
    <StayFilterRooms />
    <StayRoomCard />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  middleware: 'fetch-property-content',
});

const route = useRoute();
const selectedTab = ref('deals');
const tabs = computed(() => {
  const basePath = route.path.split('/').slice(0, -1).join('/'); // Get the base path
  const slug = route.params.slug;
  return [
    {
      label: 'Deals',
      icon: 'mdi-tag-outline',
      route: { path: `${basePath}/${slug}`, query: { ...route.query, tab: 'deals' } },
      value: 'deals',
    },
    {
      label: 'Photos',
      icon: 'mdi-grid',
      route: { path: `${basePath}/${slug}/photos`, query: { ...route.query, tab: 'photos' } },
      value: 'photos',
    },
    {
      label: 'Info',
      icon: 'mdi-information-outline',
      route: { path: `${basePath}/${slug}/info`, query: { ...route.query, tab: 'info' } },
      value: 'info',
    },
  ];
});
</script>