<template>
  <div id="location-catalog" class="pt-0 pt-sm-4 pb-6 pb-sm-8">
    <!-- Catalog Header Mobile-->
    <div v-if="!$device.isDesktop" id="catalog-header-desktop" class="pb-3">
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

    <v-row no-gutters>
      <!-- Hero Image Section -->
      <v-col id="hero-image" lg="4" md="1">
        <div class="d-flex justify-center col col-auto">
          <v-avatar class="ma-0" :size="$device.isDesktop ? 168 : 91">
            <v-img :src="propertyContent?.catalog?.hero_image_url.md" :alt="propertyContent?.name" cover></v-img>
          </v-avatar>
        </div>
      </v-col>

      <!-- Catalog Data Section -->
      <v-col id="catalog-data" lg="8" class="ml-n2 ml-sm-0">
        <!-- Catalog Header Dekstop-->
        <div v-if="$device.isDesktop" id="catalog-header-desktop">
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
        <div id="review-desktop" aria-hidden="true" class="d-flex align-center py-1 text-body-2">
          <v-progress-circular :size="34" :width="4" color="purple-darken-1"
            :model-value="propertyContent?.catalog?.review_rating">
            <span class="font-weight-medium">{{ propertyContent?.catalog?.review_rating }}</span>
          </v-progress-circular>
          <span class="pl-2">Excellent ·</span>
          <span> {{ propertyContent?.catalog?.review_count }} reviews</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const route = useRoute();
const propertyContentStore = usePropertyContentStore();
const slug = route.params.slug;

// Extract ID from slug
const idMatch = slug.match(/(\d+)$/);
const id = idMatch ? idMatch[1] : null;

const propertyContent = computed(() => propertyContentStore.properties[id] || {});
</script>
<style scoped></style>
