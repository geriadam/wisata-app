<template>
  <NuxtLayout key="stayPhotos" name="stay">
    <v-row :no-gutters="!isDesktop" v-if="propertyData && propertyData.image &&propertyData.image.length > 0">
      <v-col cols="4" v-for="(image, index) in propertyData.image" :key="index">
        <a @click="handleOpenModal">
          <v-sheet rounded="0" elevation="0">
            <div class="bg-transparent overflow-hidden aspect-ratio"
              style="height: 0px; width: 100%; padding-bottom: 100%;">
              <img onerror="this.onerror=null; this.src='https://project-exterior-technical-test-app.up.railway.app/img/fallback-global.png';"  :alt="image.caption || 'Image'" :src="image.url.lg" class="w-full h-full">
            </div>
          </v-sheet>
          </a>
      </v-col>
    </v-row>
    <StayEmpty v-if="propertyData && propertyData?.image == null" icon="mdi-image-search-outline" message="No image available for this location" :search="false" />
    <v-dialog max-width="1124" v-model="openModal" v-if="propertyData && propertyData.image && propertyData.image.length > 0">
      <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(image, index) in propertyData.image"
            onerror="this.onerror=null; this.src='https://project-exterior-technical-test-app.up.railway.app/img/fallback-global.png';" 
            :src="image.url.lg"
            :key="index"
            cover
          ></v-carousel-item>
        </v-carousel>
    </v-dialog>
  </NuxtLayout>
</template>
<script setup>
const { isDesktop } = useViewportState();
const route = useRoute();
const slug = route.params.slug;

const propertyContentStore = usePropertyContentStore();
const propertyId = extractPropertyId(slug);
const openModal = ref(false);
const propertyData = ref(null);

function handleOpenModal() {
  openModal.value = true;
}

const fetchAll = async () => {
  try {
    if (
      !propertyContentStore.properties ||
      !propertyContentStore.properties.hasOwnProperty(propertyId) ||
      propertyContentStore.properties[propertyId]?.image === null
    ) {
      const properties = await propertyContentStore.fetchPropertyContent(propertyId, ['image']);
      propertyData.value = properties;
    }
  } catch (error) {
    console.error('Failed to fetch property content:', error);
  }
}

watch(
  () => propertyContentStore.properties,
  (newProperties) => {
    console.log("newProperties info", newProperties);
    propertyData.value = newProperties[propertyId]
  }
);

watch(() => route.fullPath, fetchAll, { immediate: true });

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