<template>
  <div class="container">
    <div id="location-catalog" class="pt-0 pt-sm-4 pb-6 pb-sm-8">
      <!-- Catalog Header Mobile-->
      <div v-if="!$device.isDesktop" id="catalog-header-desktop" class="pb-3">
        <div class="align-baseline">
          <h1 class="d-inline-block font-weight-medium pr-1 text-h6">
            Fairmont Jakarta
          </h1>
          <v-icon v-for="star in 5" :key="star" class="mb-1 text-orange"
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
              <v-img src="https://i.travelapi.com/lodging/10000000/9300000/9296600/9296574/cbfc3f48_z.jpg"
                alt="Fairmont Jakarta" cover></v-img>
            </v-avatar>
          </div>
        </v-col>

        <!-- Catalog Data Section -->
        <v-col id="catalog-data" lg="8" class="ml-n2 ml-sm-0">
          <!-- Catalog Header Dekstop-->
          <div v-if="$device.isDesktop" id="catalog-header-desktop">
            <div class="align-baseline">
              <h1 class="d-inline-block font-weight-medium pr-1 text-h6">
                Fairmont Jakarta
              </h1>
              <v-icon v-for="star in 5" :key="star" class="mb-1 text-orange"
                style="font-size: 18px; height: 18px; width: 18px;">
                mdi-star
              </v-icon>
            </div>
          </div>

          <!-- Catalog Body -->
          <div id="catalog-body">
            <p class="mb-0 text--secondary py-1 text-body-2">Hotel</p>
            <p class="mb-0 pb-1 text-body-2">
              <span>Jl. Asia Afrika No.8, Gelora Bung Karno</span>
              <span>, Jakarta, Indonesia</span>
              <span>10270</span>
            </p>
          </div>

          <!-- Review Section -->
          <div id="review-desktop" aria-hidden="true" class="d-flex align-center py-1 text-body-2">
            <v-progress-circular :size="34" :width="4" color="purple-darken-1" model-value="92">
              <span class="font-weight-medium">92</span>
            </v-progress-circular>
            <span class="pl-2">Excellent ·</span>
            <span> 254 reviews</span>
          </div>
        </v-col>
      </v-row>
    </div>
    <div id="tabs-row-desktop" class="align-center justify-space-between mb-6">
      <div class="col col-12">
        <v-divider v-if="$device.isDesktop" class="mb-n1"></v-divider>
        <StayTabs v-model="selectedTab" :tabs="[
          { label: 'Deals', icon: 'mdi-tag-outline', route: '/stay', value: 'deals' },
          { label: 'Photos', icon: 'mdi-grid', route: '/photos', value: 'photos' },
          { label: 'Info', icon: 'mdi-information-outline', route: '/info', value: 'info' }
        ]" />
        <v-divider v-if="!$device.isDesktop" class="mb-n1"></v-divider>
      </div>
    </div>
    <StayFilterRooms />
    <StayRoomCard />
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTab: "deals",
    };
  },
};
</script>