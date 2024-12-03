<template>
  <div>
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

definePageMeta({
  middleware: 'fetch-property-content',
});

const route = useRoute();
const slug = route.params.slug;

const propertyContentStore = usePropertyContentStore();
const propertyId = extractPropertyId(slug);
const propertyData = computed(() => propertyContentStore.properties[propertyId] || {});
const filteredImages = ref([]);
const openModal = ref(false);

updateFilteredImages(propertyData);

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