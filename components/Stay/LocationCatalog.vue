<template>
  <div :key="route.fullPath" id="location-catalog" class="pt-0 pt-sm-4 pb-6 pb-sm-8">
    <!-- Catalog Header Mobile-->
    <div v-if="!isDesktop" id="catalog-header-desktop" class="pb-3">
      <div class="align-baseline">
        <h1 class="d-inline-block font-weight-medium pr-1 text-h6">
          {{ propertyContent?.name }}
        </h1>
        <v-icon v-for="star in propertyContent?.catalog?.star_rating" :key="star" class="mb-1 text-orange"
          style="font-size: 18px; height: 18px; width: 18px;">
          mdi-star
        </v-icon>
      </div>
    </div>

    <div class="d-flex" style="margin: 0;">
      <!-- Hero Image Section -->
      <v-col id="hero-image" lg="4" md="4" sm="1" class="p-sm-0" :class="!isDesktop ? 'col-auto' : 'd-flex justify-center'">
        <v-avatar class="ma-0" :size="isDesktop ? 168 : 91">
          <v-img v-if="propertyContent?.catalog?.hero_image_url" :src="propertyContent?.catalog?.hero_image_url.md" :alt="propertyContent?.name" cover></v-img>
          <v-img v-else src="https://project-exterior-technical-test-app.up.railway.app/img/fallback-property.png" :alt="propertyContent?.name" cover></v-img>
        </v-avatar>
      </v-col>

      <!-- Catalog Data Section -->
      <v-col id="catalog-data" lg="8" md="8" sm="11" class="ml-n2 ml-sm-0">
        <!-- Catalog Header Dekstop-->
        <div v-if="isDesktop" id="catalog-header-desktop">
          <div class="align-baseline">
            <h1 class="d-inline-block font-weight-medium pr-1 text-h6">
              {{ propertyContent?.name }}
            </h1>
            <v-icon v-for="star in propertyContent?.catalog?.star_rating" :key="star" class="mb-1 text-orange"
              style="font-size: 18px; height: 18px; width: 18px;">
              mdi-star
            </v-icon>
          </div>
        </div>

        <!-- Catalog Body -->
        <div id="catalog-body">
          <p class="mb-0 text--secondary py-1 text-body-2">{{ propertyContent?.catalog?.category }}</p>
          <p class="mb-0 pb-1 text-body-2">
            <span>{{ propertyContent?.address_line }}</span>
            <span>, {{ propertyContent?.name_suffix }}</span>
            <span>&nbsp;{{ propertyContent?.catalog?.postal_code }}</span>
          </p>
        </div>

        <!-- Review Section -->
        <div v-if="propertyContent?.catalog?.review_count" id="review-desktop" aria-hidden="true" class="d-flex align-center py-1 text-body-2">
          <v-progress-circular :size="34" :width="4" :color="ratingColor"
            :model-value="reviewRating">
            <span class="font-weight-medium">{{ reviewRating }}</span>
          </v-progress-circular>
          <span class="pl-2">{{ ratingLabel }} ·</span>
          <span> {{ propertyContent?.catalog?.review_count }} reviews</span>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script setup>
const { isDesktop } = useViewportState();
const route = useRoute();
const propertyContentStore = usePropertyContentStore();
const slug = route.params.slug;
const propertyId = extractPropertyId(slug);
const reviewRating = ref(0);

const propertyContent = ref(null);
watch(
  () => propertyContentStore.properties,
  (newProperties) => {
    if (newProperties) {
      propertyContent.value = newProperties[propertyId];

      if (newProperties[propertyId]['catalog']) {
        reviewRating.value = newProperties[propertyId].catalog.review_rating;
      }
    }
  },
  { immediate: true }
);

const ratingColor = computed(() => {
  if (reviewRating.value >= 90) {
    return 'purple-darken-1';
  } else if (reviewRating.value >= 80) {
    return 'green-darken-1';
  } else if (reviewRating.value >= 70) {
    return 'green-darken-1';
  } else if (reviewRating.value >= 60) {
    return 'orange-lighten-1';
  } else if (reviewRating.value >= 50) {
    return 'orange-lighten-1';
  }
  return 'red-darken-1'; // For < 50
});

const ratingLabel = computed(() => {
  if (reviewRating.value >= 90) {
    return 'Excellent';
  } else if (reviewRating.value >= 80) {
    return 'Very Good';
  } else if (reviewRating.value >= 70) {
    return 'Good';
  } else if (reviewRating.value >= 60) {
    return 'Fair';
  } else if (reviewRating.value >= 50) {
    return 'Average';
  }
  return 'Bad';
});
</script>
<style scoped>
.col-auto {
  flex: 0 0 auto;
  max-width: 100%;
  width: auto;
}
</style>
