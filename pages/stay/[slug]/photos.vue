<template>
  <div class="container">
    <StayLocationCatalog />
    <div id="tabs-row-desktop" class="align-center justify-space-between mb-6">
      <div class="col col-12">
        <v-divider v-if="$device.isDesktop" class="mb-n1"></v-divider>
        <StayTabs :tabs="tabs" v-model="selectedTab" />
        <v-divider v-if="!$device.isDesktop" class="mb-n1"></v-divider>
      </div>
    </div>
    <v-row :no-gutters="!$device.isDesktop" v-if="filteredImages.length > 0">
      <v-col cols="4" v-for="(image, index) in filteredImages" :key="index">
        <a @click="handleOpenModal">
          <v-sheet rounded="0" elevation="0">
            <div class="bg-transparent overflow-hidden aspect-ratio"
              style="height: 0px; width: 100%; padding-bottom: 100%;">
              <img :alt="image.caption || 'Image'" 
              :src="image.links['1000px']['href']" 
                class="w-full h-full">
            </div>
          </v-sheet>
          </a>
      </v-col>
    </v-row>
    <v-dialog max-width="1124" v-model="openModal" v-if="filteredImages.length > 0">
      <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(image, index) in filteredImages"
            :src="image.links['1000px']['href']" 
            cover
          ></v-carousel-item>
        </v-carousel>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  middleware: 'fetch-property-content',
});

const propertyContentStore = usePropertyContentStore();
const route = useRoute();
const slug = route.params.slug;

const propertyId = computed(() => extractPropertyId(slug));

const propertyData = computed(() => propertyContentStore.properties[propertyId.value] || {});

const tabs = computed(() => generateTabs(route));

const filteredImages = ref([]);
updateFilteredImages(propertyData);

const selectedTab = ref('photos');

const openModal = ref(false);

function extractPropertyId(slug) {
  const idMatch = slug.match(/(\d+)$/);
  return idMatch ? idMatch[1] : null;
}

function generateTabs(route) {
  const basePath = route.path.split('/').slice(0, -1).join('/');
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
}

function updateFilteredImages(propertyData) {
  watch(
    () => propertyData.value,
    (newValue) => {
      if (isValidRoomData(newValue.room)) {
        filteredImages.value = extractHeroImages(newValue.room);
      } else {
        filteredImages.value = [];
      }
    },
    { immediate: true }
  );
}

function handleOpenModal() {
  openModal.value = true;
}

function isValidRoomData(room) {
  return room && typeof room === 'object';
}

function extractHeroImages(roomData) {
  return Object.values(roomData).flatMap((room) =>
    room.images
      ? room.images.filter((image) => image.hero_image).map((image) => ({ ...image, room }))
      : []
  );
}
</script>
<style scoped>
.aspect-ratio {
  position: relative;
}

.aspect-ratio img {
  object-fit: cover;
  object-position: 50% 50%;
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
</style>