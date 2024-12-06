<template>
  <v-dialog v-model="openDetail" :open-on-click="openDetail" max-width="900px" scrollable :fullscreen="!isDesktop">
    <v-card rounded="lg" elevation="3" max-height="800px">
      <v-card-text class="pa-0">
        <div class="room-details-grid" :class="isDesktop ? 'room-details-grid--horizontal' : 'room-details-grid--vertical'">
          <!-- Carousel Section -->
          <section class="bg-grey-darken-4 d-flex align-center h-full mt-n2 mt-md-0 black" style="grid-area: carousel; position: relative">
            <v-carousel v-model="carousel" hide-delimiters style="height: auto;">
              <template v-slot:prev="{ props }">
                <v-btn
                  variant="tonal"
                  rounded="lg"
                  class="bg-grey-darken-2 text-white"
                  density="compact"
                  icon="mdi-chevron-left"
                  @click="props.onClick"
                >
                </v-btn>
              </template>
              <template v-slot:next="{ props }">
                <v-btn
                  variant="tonal"
                  rounded="lg"
                  class="bg-grey-darken-2 text-white"
                  density="compact"
                  icon="mdi-chevron-right"
                  @click="props.onClick"
                >
                </v-btn>
              </template>
              <v-carousel-item
                v-if="images[0]"
                v-for="(image, index) in images"
                :key="index"
                :src="image['size_sm']"
                :alt="image['caption']"
                cover
              ></v-carousel-item>
              <v-carousel-item
                v-else
                src="https://project-exterior-technical-test-app.up.railway.app/img/fallback-room.png"
                alt="Image"
                cover
              ></v-carousel-item>
            </v-carousel>
            <v-sheet rounded height="20px" class="d-flex px-1 justify-center rounded-lg bg-grey-darken-1 d-block" style="bottom: 2%; right: 2%; line-height: 0; position: absolute;">
              <span class="text-caption text-white">{{ carousel + 1 }} / {{ images.length }}</span>
            </v-sheet>
          </section>

          <!-- Title Section -->

          <div class="pa-3 px-sm-6 py-sm-3 d-flex border-b-thin align-center justify-center justify-md-start bg-white" style="grid-area: title; position: sticky; top: 0px; z-index: 5;">
            <v-btn v-if="!isDesktop" variant="text"class="ml-1 ml-md-0 mr-2" @click="closeModal" style="left: 0; position: absolute;">
              <v-icon size="30" color="primary">mdi-chevron-left</v-icon>
            </v-btn>
            <span class="text-h6 font-weight-medium">Room Details</span>
            <v-btn v-if="isDesktop" variant="text"class="ml-1 ml-md-0 mr-2" @click="closeModal" style="right: 0; position: absolute;">
              <v-icon color="primary">mdi-close</v-icon>
            </v-btn>
          </div>

          <!-- Content Section -->
          <div class="px-4 px-sm-6 pb-4 pb-sm-6 pt-3" style="grid-area: content; overflow-y: auto; max-height: 500px;">
            <p class="text-subtitle-1 font-weight-medium mb-0">{{ roomName }}</p>
            <div class="d-inline-flex flex-wrap align-center">
              <v-icon size="14" color="grey-darken-1" class="pr-2 mr-1">mdi-sofa-outline</v-icon>
              <span class="text-caption">{{ roomBed }}</span>
            </div>

            <p class="text-subtitle-1 font-weight-medium mb-2 mt-4">Room Amenities</p>
            <section>
              <!-- Bedroom Amenities -->
              <div>
                <div class="d-flex align-center mb-1">
                  <v-icon size="14" color="grey-darken-1" class="pr-2 mr-1">mdi-sofa-outline</v-icon>
                  <p class="text-caption">Bedroom</p>
                </div>
                <ul class="ml-2">
                  <li class="text-caption text-secondary">Bedsheets provided</li>
                  <li class="text-caption text-secondary">Number of beds - 1</li>
                  <li class="text-caption text-secondary">Change of bed sheets (on request)</li>
                  <li class="text-caption text-secondary">Tile flooring in room</li>
                </ul>
              </div>

              <!-- Bathroom Amenities -->
              <div class="mt-2">
                <div class="d-flex align-center mb-1">
                  <v-icon size="14" color="grey-darken-1" class="pr-2 mr-1">mdi-shower-head</v-icon>
                  <p class="text-caption">Bathroom</p>
                </div>
                <ul class="ml-2">
                  <li class="text-caption text-secondary"> Private bathroom </li>
                  <li class="text-caption text-secondary"> Shower only </li>
                  <li class="text-caption text-secondary"> Towels provided </li>
                  <li class="text-caption text-secondary"> Soap </li>
                  <li class="text-caption text-secondary"> Toilet paper </li>
                  <li class="text-caption text-secondary"> Toothbrush and toothpaste not available </li>
                  <li class="text-caption text-secondary"> Change of towels (on request) </li>
                </ul>
              </div>

              <!-- Entertainment Amenities -->
              <div class="mt-2">
                <div class="d-flex align-center mb-1">
                  <v-icon size="14" color="grey-darken-1" class="pr-2 mr-1">mdi-check-all</v-icon>
                  <p class="text-caption">Entertainment</p>
                </div>
                <ul class="ml-2">
                  <li class="text-caption text-secondary"> Television </li>
                  <li class="text-caption text-secondary"> Satellite TV service </li>
                  <li class="text-caption text-secondary"> Closed captioned TV </li>
                </ul>
              </div>

              <!-- Internet Amenities -->
              <div class="mt-2">
                <div class="d-flex align-center mb-1">
                  <v-icon size="14" color="grey-darken-1" class="pr-2 mr-1">mdi-wifi</v-icon>
                  <p class="text-caption">Entertainment</p>
                </div>
                <ul class="ml-2">
                  <li class="text-caption text-secondary"> Television </li>
                  <li class="text-caption text-secondary"> Satellite TV service </li>
                  <li class="text-caption text-secondary"> Closed captioned TV </li>
                </ul>
              </div>

              <!-- More Amenities -->
              <div class="mt-2">
                <div class="d-flex align-center mb-1">
                  <v-icon size="14" color="grey-darken-1" class="pr-2 mr-1">mdi-check-all</v-icon>
                  <p class="text-caption">More</p>
                </div>
                <ul class="ml-2">
                  <li class="text-caption text-secondary"> Television </li>
                  <li class="text-caption text-secondary"> Satellite TV service </li>
                  <li class="text-caption text-secondary"> Closed captioned TV </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const { isDesktop } = useViewportState();
const props = defineProps({
  images: {
    type: Array,
    required: false,
    default: () => []
  },
  roomName: {
    type: String,
    required: false,
    default: () => ''
  },
  roomBed: {
    type: String,
    required: false,
    default: () => ''
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
  emit('update:modelValue', false);
};
const openDetail = ref(props.modelValue);
watch(() => props.modelValue, (newVal) => {
  openDetail.value = newVal;
});
watch(openDetail, (newVal) => {
  emit('update:modelValue', newVal);
});

const carousel = ref(0)

const amenitiesStore = useAmenitiesStore();
const amenitiesData = ref(null);
// object amenities
const amenitiesParams = {};
const fetchAll = async () => {
  try {
    amenitiesData.value = await amenitiesStore.fetchAmenities(amenitiesParams, 'room');
  } catch (error) {
    console.error('Failed to fetch property content:', error);
  }
}

</script>

<style scoped>
.room-details-grid {
  display: grid;
}
.room-details-grid--horizontal {
  grid-template-areas:
      "carousel title"
      "carousel content";
  grid-template-columns: 1fr minmax(auto, 280px);
  grid-template-rows: auto 1fr;
  min-height: 560px;
}
.room-details-grid--vertical {
  grid-template-areas:
      "title"
      "carousel"
      "content";
  row-gap: 12px;
}
@media (min-width: 800px) {
  .room-details-grid--horizontal {
    grid-template-columns: 1fr minmax(auto, 320px);
  }
}
@media (min-width: 984px) {
  .room-details-grid--horizontal {
    grid-template-columns: 1fr minmax(auto, 400px);
  }
}
</style>
