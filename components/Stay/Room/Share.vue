<template>
  <v-dialog v-model="openOffer" :open-on-click="openOffer" max-width="720" max-height="350" scrollable :fullscreen="!isDesktop">
    <v-card rounded="lg" elevation="3" max-height="640">
      <v-card-title class="pa-0 d-none d-sm-flex flex-row flex-nowrap justify-center align-center position-relative">
        <div class="w-100">
          <div class="pa-4 d-flex flex-row flex-nowrap justify-center align-center">
            <v-icon color="primary" size="18" class="ml-n2 mr-2">mdi-share-variant</v-icon>
            <span class="text-h6 text-md-h5 font-weight-bold">Share This Offer</span>
          </div>
        </div>
        <v-btn size="sm" v-if="isDesktop" variant="text"class="ml-1 ml-md-0 mr-2" @click="closeModal" style="right: 0; position: absolute;">
          <v-icon color="grey-darken-3">mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0 overflow-hidden">
        <div class="h-100 overflow-hidden stay-offer-sharing-tools__grid">
          <section class="stay-offer-sharing-tools__preview overflow-hidden bg-grey-lighten-4 h-screen">
            <div class="position-relative d-flex flex-column justify-start w-100">
              <v-tabs v-model="activeTab" align-tabs="start" color="primary" class="d-flex bg-white w-100">
                <v-tab value="text" variant="text" class="pb-2 pt-2 pr-2" color="primary" base-color="grey-darken-3">
                  <v-icon size="16" class="mr-1">mdi-format-text</v-icon>
                  <span class="text-caption">TEXT</span>
                </v-tab>
                <v-tab value="image" variant="text" class="pb-2 pt-2" color="primary" base-color="grey-darken-3">
                  <v-icon size="16" class="mr-1">mdi-panorama-outline</v-icon>
                  <span class="text-caption">IMAGE</span>
                </v-tab>
              </v-tabs>
              <v-btn size="sm" variant="text"class="ml-1 ml-md-0 mr-2" @click="closeModal" style="right: 0; top: 15px; position: absolute;">
                <v-icon color="grey-darken-3">mdi-close</v-icon>
              </v-btn>
            </div>
            <div class="h-100 bg-grey-lighten-4 position-relative">
              <v-tabs-window v-model="activeTab" class="h-full d-flex flex-row flex-nowrap justify-start align-stretch">
                <v-tabs-window-item value="text" class="h-100 position-relative">
                  <div class="pa-4 text-body-2 overflow-auto" style="inset: 0px; white-space: pre-wrap !important; overflow: auto;">{{ generateText }}</div>
                </v-tabs-window-item>
                <v-tabs-window-item value="image" class="h-100 position-relative">
                  <v-sheet 
                    width="380" 
                    class="pa-4 pt-3 bg-white position-relative cursor-grab"
                    :style="{ transform: `scale(${zoom})`, left: position.x + 'px', top: position.y + 'px' }"
                    @mousedown="onDragStart"
                  >
                    <section class="mb-2">
                      <div>
                        <span class="text-body-1 font-weight-medium mr-2">{{ propertyData.name }}</span>
                        <span class="d-inline-flex flex-wrap">
                          <v-icon v-for="star in propertyData?.catalog?.star_rating" :key="star" class="mb-1 text-orange" style="font-size: 18px; height: 18px; width: 18px;">
                            mdi-star
                          </v-icon>
                        </span>
                      </div>
                      <div v-if="propertyData?.catalog?.review_count && showHotelReviews"  class="my-1 d-flex align-center text-caption text-grey-darken-2">
                        <v-progress-circular :size="24" :width="2" :color="ratingColor" :model-value="reviewRating">
                          <span class="text-button font-weight-medium">{{ propertyData?.catalog?.review_rating }}</span>
                        </v-progress-circular>
                        <span class="pl-2">{{ ratingLabel }} ·</span>
                        <span> {{ propertyData?.catalog?.review_count }} reviews</span>
                      </div>
                      <p class="mb-0 text-button font-weight-medium">
                        {{ formattedDateRange }}
                        <span class="text-grey-darken-1 font-weight-regular"> · {{ night }} nights</span>
                      </p>
                    </section>
                    <section class="mb-2">
                      <v-responsive>
                        <v-img 
                          v-if="propertyData?.catalog?.hero_image_url" :src="propertyData?.catalog?.hero_image_url.md"
                          :alt="propertyData?.name"
                          aspect-ratio="2"
                          class="rounded-lg"
                          cover
                        >
                        </v-img>
                        <v-img v-else
                          src="https://project-exterior-technical-test-app.up.railway.app/img/fallback-property.png"
                          :alt="propertyData?.name"
                          cover
                          aspect-ratio="2"
                          class="rounded-lg"
                        >
                        </v-img>
                      </v-responsive>
                    </section>

                    <section>
                      <p class="mb-0 text-body-1 font-weight-medium">{{ offer['room_name'] }}</p>
                      <div v-if="showRoomInfo" class="text-body-2 d-inline-flex flex-wrap">
                        <span class="d-inline-block pr-4">
                          <v-icon class="mr-1" style="font-size: 18px; height: 18px; width: 18px;">mdi-sofa-outline</v-icon>
                          <span>{{ offer['room_bed_groups'] }}</span>
                        </span>
                        <span class="d-inline-block pr-4">
                          <v-icon class="mr-1" style="font-size: 18px; height: 18px; width: 18px;">mdi-border-style</v-icon>
                          <span>{{ offer['room_size_sqm'] }} m<sup>2</sup></span>
                        </span>
                      </div>
                    </section>
                    <section class="d-inline-flex align-baseline text-body-2">
                      <div v-if="offer['meal_plan_description']">
                        <v-icon color="success" class="mr-2" style="font-size: 16px; height: 16px; width: 16px;">
                          mdi-silverware-fork-knife
                        </v-icon>
                        <span class="text-body-2 text-md-body-1 text-green-darken-3">{{ offer['meal_plan_description'] }}</span>
                      </div>
                      <div v-else>
                        <v-icon class="mr-2" style="font-size: 16px; height: 16px; width: 16px;">
                          mdi-food-drumstick-off
                        </v-icon>
                        <span class="text-body-2 text-md-body-1 text-md-body-1">Without breakfast</span>
                      </div>
                    </section>
                    <section class="mt-2">
                      <p class="mb-0 text-h8 font-weight-medium">
                        Rp {{ rupiahFormat(offer['pricing_data']['net_rate_nightly_with_bonus']) }}
                        <span class="text-h6 text-grey-darken-1 font-weight-regular">/ night</span>
                      </p>
                    </section>
                    <section v-if="showTotalPrice" class="mt-1">
                      <p class="mb-0 text-body-2 text-grey-darken-1">
                        Total · Rp {{ rupiahFormat(offer['pricing_data']['net_price_total_with_bonus']) }}
                        <span>({{ filterStore.number_of_room }} room, {{ night }} nights)</span>
                      </p>
                    </section>
                    <p class="mt-4 mb-n2 text-button text-grey-darken-1 text-none">
                      *Price is subject to change without prior notice
                    </p>
                  </v-sheet>
                  <v-btn-group
                    variant="outlined"
                    divided
                    class="zoom-controls bg-white"
                  >
                    <v-btn :slim="true" size="large" density="compact" height="40" @click="zoomOut" icon="mdi-magnify-minus-outline"></v-btn>
                    <v-btn :slim="true" size="large" density="compact" height="40" @click="zoomIn" icon="mdi-magnify-plus-outline"></v-btn>
                  </v-btn-group>
                </v-tabs-window-item>
              </v-tabs-window>
            </div>
          </section>
          <v-divider :vertical="isDesktop"></v-divider>
          <section class="stay-offer-sharing-tools__form d-flex flex-column flex-nowrap overflow-hidden">
            <section style="overflow: hidden auto;">
              <div>
                <!-- Address Section -->
                <section>
                  <v-row align-content="center" justify="center" class="pa-3" no-gutters>
                    <v-col>
                      <span class="text-subtitle-2 font-weight-medium">Address</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-btn size="sm" variant="text" class="ml-1 ml-md-0 mr-2">
                      <v-icon color="grey-darken-2">mdi-eye</v-icon>
                    </v-btn>
                  </v-row>
                </section>
                <v-divider></v-divider>

                <!-- Hotel Reviews Section -->
                <section>
                  <v-row align-content="center" justify="center" class="pa-3" no-gutters>
                    <v-col>
                      <span class="text-subtitle-2 font-weight-medium">Hotel reviews</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-btn @click="toggleHotelReviews" size="sm" variant="text" class="ml-1 ml-md-0 mr-2">
                      <v-icon color="grey-darken-2">{{ showHotelReviews ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    </v-btn>
                  </v-row>
                </section>
                <v-divider></v-divider>

                <!-- Room Info Section -->
                <section>
                  <v-row align-content="center" justify="center" class="pa-3" no-gutters>
                    <v-col>
                      <span class="text-subtitle-2 font-weight-medium">Room info (bed type, room size, view)</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-btn @click="toggleRoomInfo" size="sm" variant="text" class="ml-1 ml-md-0 mr-2">
                      <v-icon color="grey-darken-2">{{ showRoomInfo ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    </v-btn>
                  </v-row>
                </section>
                <v-divider></v-divider>

                <!-- Total Price Section -->
                <section>
                  <v-row align-content="center" justify="center" class="pa-3" no-gutters>
                    <v-col>
                      <span class="text-subtitle-2 font-weight-medium">Total price</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-btn @click="toggleTotalPrice" size="sm" variant="text" class="ml-1 ml-md-0 mr-2">
                      <v-icon color="grey-darken-2">{{ showTotalPrice ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                    </v-btn>
                  </v-row>
                </section>
                <v-divider></v-divider>
              </div>
            </section>
            <section>
              <div class="pa-4 d-flex flex-row flex-nowrap align-stretch gc-3">
                <v-btn color="primary" rounded="4" variant="outlined" prepend-icon="mdi-clipboard-multiple-outline" class="text-none" style="flex: 1 1 auto; letter-spacing: 0;">
                  Copy as Text
                </v-btn>
                <v-btn color="primary" rounded="sm" variant="outlined" prepend-icon="mdi-fullscreen" class="text-none" style="flex: 1 1 auto; letter-spacing: 0">
                  Copy as Image
                </v-btn>
              </div>
            </section>
          </section>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const { isMobile, isDesktop } = useViewportState();
const props = defineProps({
  offer: {
    type: Object,
    default: () => null,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  defaultActiveTab: {
    type: String,
    default: "text", // Default active tab
  },
});

const emit = defineEmits(["update:modelValue"]);

const route = useRoute();
const propertyContentStore = usePropertyContentStore();
const filterStore = useFiltersStore();

const slug = route.params.slug;
const propertyId = extractPropertyId(slug);

// Reactive properties
const openOffer = ref(props.modelValue);
const activeTab = ref(props.defaultActiveTab);
const position = ref({ x: -2, y: -109 });
const zoom = ref(0.5);
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const showHotelReviews = ref(true);
const showRoomInfo = ref(true);
const showTotalPrice = ref(true);

// Watchers
watch(() => props.modelValue, (newVal) => (openOffer.value = newVal));
watch(openOffer, (newVal) => emit("update:modelValue", newVal));

// Computed properties
const propertyData = computed(() => propertyContentStore.properties[propertyId] || {});
const reviewRating = computed(() => propertyData.value?.catalog?.review_rating || 0);
const formattedDateRange = computed(() => {
  const { checkin, checkout } = filterStore;
  if (checkin && checkout) {
    return `${formatDate(checkin, { day: "numeric" })} – ${formatDate(checkout, {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  }
  return "";
});
const night = computed(() => {
  const { checkin, checkout } = route.query;
  return calculateDateDifference(checkin, checkout);
});
const newOffer = ref(props.offer || {});

watchEffect(() => {
  if (props.offer) newOffer.value = props.offer;
});

const ratingColor = computed(() => {
  const rating = reviewRating.value;
  if (rating >= 90) return "purple-darken-1";
  if (rating >= 80) return "green-darken-1";
  if (rating >= 60) return "orange-lighten-1";
  return "red-darken-1";
});

const ratingLabel = computed(() => {
  const rating = reviewRating.value;
  if (rating >= 90) return "Excellent";
  if (rating >= 80) return "Very Good";
  if (rating >= 70) return "Good";
  if (rating >= 60) return "Fair";
  return "Bad";
});

const generateText = computed(() => {
  const { number_of_room } = filterStore;
  const labelHotelReview = showHotelReviews.value
    ? `${ratingLabel.value} (${reviewRating.value} of 100) · ${propertyData.value.catalog?.review_count || 0} reviews`
    : "";
  const labelRoomInfo = showRoomInfo.value
    ? `${newOffer.value.room_bed_groups || ""} ${newOffer.value.room_size_sqm || ""}m`
    : "";
  const labelTotalPrice = showTotalPrice.value
    ? `Total · Rp ${rupiahFormat(newOffer.value.pricing_data?.net_price_total_with_bonus || 0)}`
    : "";

  return `${propertyData.value.name || ""} ${labelHotelReview} ${formattedDateRange.value || ""} · ${
    night.value || 0
  } nights ${newOffer.value.room_name || ""} ${labelRoomInfo} ${
    newOffer.value.meal_plan_description || ""
  } Rp ${rupiahFormat(newOffer.value.pricing_data?.net_rate_nightly_with_bonus || 0)}/night ${labelTotalPrice} (${
    number_of_room || 0
  } room, ${night.value || 0} nights) *Price is subject to change without prior notice`;
});

// Utility functions
const closeModal = () => emit("update:modelValue", false);
const formatDate = (dateString, options) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};
const calculateDateDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
};
const rupiahFormat = (value) => value.toLocaleString("id-ID");

const toggleHotelReviews = () => (showHotelReviews.value = !showHotelReviews.value);
const toggleRoomInfo = () => (showRoomInfo.value = !showRoomInfo.value);
const toggleTotalPrice = () => (showTotalPrice.value = !showTotalPrice.value);

// Dragging and zooming
const onDragStart = (e) => {
  isDragging.value = true;
  dragOffset.value = { x: e.clientX - position.value.x, y: e.clientY - position.value.y };

  document.addEventListener("mousemove", onDragMove);
  document.addEventListener("mouseup", onDragEnd);
};
const onDragMove = (e) => {
  if (isDragging.value) {
    position.value = { x: e.clientX - dragOffset.value.x, y: e.clientY - dragOffset.value.y };
  }
};
const onDragEnd = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDragMove);
  document.removeEventListener("mouseup", onDragEnd);
};
const zoomIn = () => (zoom.value += 0.1);
const zoomOut = () => (zoom.value = Math.max(0.1, zoom.value - 0.1));
</script>


<style scoped>

.stay-offer-sharing-tools__grid .stay-offer-sharing-tools__preview {
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 800px) {
  .stay-offer-sharing-tools__grid {
    align-items: flex-start;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
  }

  .stay-offer-sharing-tools__grid .stay-offer-sharing-tools__form, .stay-offer-sharing-tools__grid .stay-offer-sharing-tools__preview {
    width: 50%;
  }
}

@media (max-width: 799px) {
  .stay-offer-sharing-tools__grid {
    align-items: flex-start;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }

  .stay-offer-sharing-tools__grid .stay-offer-sharing-tools__form, .stay-offer-sharing-tools__grid .stay-offer-sharing-tools__preview {
    width: 100%;
  }
}

.zoom-controls {
  position: absolute;
  right: -30px;
  top: 200px;
  transform: translateX(-50%);
  z-index: 10;
  height: 40px;
}

.zoom-controls v-btn {
  margin: 0 5px;
}

.v-sheet {
  transition: transform 0.3s ease-in-out;
}

.position-relative {
  position: relative;
}
</style>
