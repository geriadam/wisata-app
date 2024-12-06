<template>
  <v-app-bar :key="route.fullPath" scroll-behavior="elevate" scroll-threshold="-10" class="d-print-none bg-white"
    style="height: 64px; margin-top: 0px; transform: translateY(0px); left: 0px; right: 0px; z-index: 20;">
    <div class="container py-1 py-md-2">
      <div style="position: relative;">
        <div class="appbartop-grid">
          <!-- Brand Logo -->
          <NuxtLink v-if="isDesktop" to="/" class="d-inline-block align-self-center brand-logo"
            style="line-height: 0;">
            <div class="d-inline-block" style="line-height: 0; margin: 0px 0px 0px -6px;">
              <img src="/assets/img/logo-wisata-app.png" alt="app-logo" width="185" height="42" />
            </div>
          </NuxtLink>

          <v-btn v-if="isMobile" variant="text" @click="toggleSearch" min-width="48px" max-width="48px" max-height="48px"
            style="height: 48px; width: 48px; padding: 0;">
            <v-icon color="primary" style="font-size: 36px; height: 36px; width: 36px;">mdi-chevron-left</v-icon>
          </v-btn>

          <!-- Search Bar -->
          <div class="d-flex justify-center mr-2 ml-sm-6 mr-sm-6" style="min-width: 0; min-height: 0;">
            <div class="searchnav-width">
              <v-btn class="appsearchbar-btn text-body-2 font-weight-medium" block
                style="height: 40px; width: 100%; background-color: #f5f5f5;" @click="toggleSearch">
                <v-icon>mdi-magnify</v-icon>
                <span v-if="isDesktop" class="text-truncate" style="min-width: 0; min-height: 0;">
                  {{ propertyData?.name }}
                </span>
                <span>&nbsp;&nbsp;·&nbsp;&nbsp; {{ formattedDateRange }}</span>
              </v-btn>
            </div>
          </div>

          <AppSearch v-if="showSearch" />

          <!-- Sign In Button -->
          <div>
            <v-btn class="text-none text-body-2 font-weight-bold" variant="flat" color="primary">
              Sign in
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-app-bar>

</template>

<script setup>
const { isMobile, isDesktop } = useViewportState();
const { showSearch, toggleSearch } = useSearch();
const filterStore = useFiltersStore();
const route = useRoute();
const propertyContentStore = usePropertyContentStore();
const slug = route.params.slug;
const propertyId = extractPropertyId(slug);

const propertyData = ref(null);
watch(
  () => propertyContentStore.properties,
  (newProperties) => {
    if (newProperties) {
      propertyData.value = newProperties[propertyId];
    }
  },
  { immediate: true }
);

const formatDate = (dateString, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const formattedDateRange = computed(() => {
  const { checkin, checkout } = filterStore;
  if (checkin && checkout) {
    const checkinFormatted = formatDate(checkin, { day: 'numeric' });
    const checkoutFormatted = formatDate(checkout, { day: 'numeric', month: 'short', year: 'numeric' });
    return `${checkinFormatted} – ${checkoutFormatted}`;
  }
  return '';
});
</script>

<style scoped></style>
