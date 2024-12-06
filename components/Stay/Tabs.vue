<template>
  <div :key="route.fullPath">
    <v-tabs v-model="activeTab" align-tabs="center" background-color="transparent" class="tab-no-background mt-1">
      <div v-for="(tab, index) in combinedTabs" :key="tab.key" class="d-flex">
        <div class="pl-2"></div>
        <v-tab :value="tab.value" variant="text" class="tab-no-background pb-2 pt-2" color="primary" :to="tab.route">
          <v-icon :style="iconStyle">{{ tab.icon }}</v-icon>
          <span class="text-button font-weight-medium" :class="isDesktop ? 'd-flex' : 'd-none'">
            {{ tab.label }}
          </span>
        </v-tab>
        <div class="pr-2"></div>
      </div>
    </v-tabs>
  </div>
</template>

<script setup>
const { isMobile, isDesktop } = useViewportState();
// Props
const props = defineProps({
  tabs: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const route = useRoute();
const activeTab = ref(getActiveTabFromRoute());
const slug = route.params.slug || '';

watch(
  () => route.fullPath,
  (newTab) => {
    if (newTab && isTabValueValid(newTab)) {
      activeTab.value = newTab;
    } else {
      activeTab.value = 'deals';
    }
  },
  { immediate: true }
);

const iconStyle = computed(() => ({
  fontSize: '18px',
  height: '18px',
  width: '18px',
  marginRight: '8px',
}));

const defaultTabs = computed(() => [
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
]);

const combinedTabs = computed(() => props.tabs.length > 0 ? props.tabs : defaultTabs.value);

function getActiveTabFromRoute() {
  const tabFromRoute = route.query.tab;
  return tabFromRoute && isTabValueValid(tabFromRoute) ? tabFromRoute : 'deals';
}

function isTabValueValid(tabValue) {
  return props.tabs.some((tab) => tab.value === tabValue);
}
</script>


<style scoped>
/* Add your styles here if necessary */
</style>
