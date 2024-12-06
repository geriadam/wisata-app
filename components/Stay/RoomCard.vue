<template>
  <div v-if="filteredOffers[0]" class="bg-transparent mb-sm-8 mb-md-10">
    <div class="stay-offer-grid">
      <v-sheet class="stay-offer-grid__room-catalog gutters-0 gutters-sm-1 pa-4" :class="{
        'border-thin': isDesktop,
        'border-0': !isDesktop
      }">
        <div class="d-flex justify-space-between align-sm-center">
          <div class="d-flex flex-nowrap align-start">
            <div class="text-h6 font-weight-medium">
              {{ filteredOffers[0]['room_name'] }}
            </div>
          </div>
          <v-btn @click="onOpenDetail"  variant="text" color="primary" class="my-sm-n1 mr-n1 ml-1 ml-sm-0">
            <span class="text-h8 text-none font-weight-medium">See details</span>
          </v-btn>
        </div>
        <div class="d-inline-flex flex-wrap">
          <span class="pr-3">
            <v-icon style="font-size: 18px; height: 18px; width: 18px;">
              mdi-bed-double-outline
            </v-icon>
            <span class="text-caption text-md-body-2">{{ filteredOffers[0]['room_bed_groups'] }}</span>
          </span>
          <span class="pr-3">
            <v-icon style="font-size: 18px; height: 18px; width: 18px;">
              mdi-border-style
            </v-icon>
            <span class="text-caption text-md-body-2">{{ filteredOffers[0]['room_size_sqm'] }} m<sup>2</sup></span>
          </span>
        </div>
        <v-divider class="mx-n4 mt-4 mb-n4 d-none d-lg-block"></v-divider>
      </v-sheet>
      <StayRoomImage :images="filteredOffers[0]['room_images']" @image-click="onOpenDetail" />
      <v-sheet class="stay-offer-grid__room-offer bg-transparent" :class="{
        'border-thin': isDesktop,
        'border-0': !isDesktop
      }">
        <v-sheet v-for="(offer, index) in filteredOffers" :key="index" class="py-4 pa-sm-4 bg-transparent">
          <v-divider v-if="index !== 0" class="mx-n4 mt-n4 mb-4"></v-divider>
          <div class="d-flex flex-nowrap align-stretch justify-space-between">
            <div class="flex-1-0-0">
              <div>
                <div id="meal-plan" class="d-flex align-center">
                  <div v-if="offer['meal_plan_description']">
                    <v-icon color="success" class="mr-2" style="font-size: 16px; height: 16px; width: 16px;">
                      mdi-silverware-fork-knife
                    </v-icon>
                    <span class="align-middle text-body-2 text-md-body-1 text-green-darken-3">{{ offer['meal_plan_description'] }}</span>
                  </div>
                  <div v-else>
                    <v-icon class="mr-2" style="font-size: 16px; height: 16px; width: 16px;">
                      mdi-food-drumstick-off
                    </v-icon>
                    <span class="align-middle text-body-2 text-md-body-1">Without breakfast</span>
                  </div>
                </div>
                <div id="cancel-policy" class="d-flex align-center">
                  <v-icon color="success" class="mr-2" style="font-size: 16px; height: 16px; width: 16px;">
                    mdi-credit-card-check-outline
                  </v-icon>
                  <span class="align-middle text-body-2 text-md-body-1 text-green-darken-3">{{ offer['cancel_policy_description'] }}</span>
                </div>
              </div>
            </div>
            <div class="d-flex justify-end">
              <div class="d-inline-block my-n1">
                <div class="d-flex flex-row flex-nowrap align-center" style="gap: 4px">
                  <v-btn @click="onOpenOffer(offer, 'text')" variant="text" icon size="x-small" style="height: 32px; width: 32px;">
                    <v-icon color="grey-darken-2" style="font-size: 20px; height: 20px; width: 20px;">
                      mdi-content-copy
                    </v-icon>
                    <v-tooltip activator="parent" location="top">Copy offer</v-tooltip>
                  </v-btn>
                  <v-btn @click="onOpenOffer(offer, 'image')" variant="text" icon size="x-small" style="height: 32px; width: 32px;">
                    <v-icon color="grey-darken-2" style="font-size: 22px; height: 22px; width: 22px;">
                      mdi-fullscreen
                    </v-icon>
                    <v-tooltip activator="parent" location="top">Screenshoot offer</v-tooltip>
                  </v-btn>
                  <v-btn variant="text" icon size="x-small" style="height: 32px; width: 32px;">
                    <v-icon color="grey-darken-2" style="font-size: 22px; height: 22px; width: 22px;">
                      mdi-dots-horizontal
                    </v-icon>
                    <v-tooltip activator="parent" location="top">See all actions</v-tooltip>
                    <v-menu activator="parent">
                      <v-list>
                        <v-list-subheader>Actions</v-list-subheader>
                        <v-list-item @click="onOpenOffer(offer, 'text')">
                          <v-list-item-title class="py-2 text-h8">
                            <v-icon color="grey-darken-2"
                              style="font-size: 18px; height: 18px; width: 18px; margin-right: 5px;">
                              mdi-content-copy
                            </v-icon>Copy Offer
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="onOpenOffer(offer, 'image')">
                          <v-list-item-title class="py-2 text-h8">
                            <v-icon color="grey-darken-2"
                              style="font-size: 18px; height: 18px; width: 18px; margin-right: 5px">
                              mdi-fullscreen
                            </v-icon>Screenshoot Offer
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="price-display-grid price-display-grid__split">
              <div class="mt-1 mb-2" style="grid-area: saving-pct;" v-if="offer['xcode_log']['available_rooms'] < 3">
                <div class="d-inline-flex align-stretch flex-wrap justify-split" style="gap: 4px;">
                  <v-sheet :rounded="sm" class="px-2 text-h8 bg-red text-white">
                    <span class="text-button white--text font-weight-medium text-uppercase text-no-wrap">
                      <span class="text-caption text-md-h8 font-weight-bold" style="font-family: inherit !important;">{{ offer['xcode_log']['promotions']['deal']['description'] }}</span> Today! </span>
                  </v-sheet>
                  <v-sheet :rounded="sm" class="px-2 text-h8 bg-red-lighten-4">
                    <span class="text-button font-weight-medium text-uppercase text-no-wrap text-red-darken-4"> {{ offer['xcode_log']['available_rooms'] }} room left </span>
                  </v-sheet>
                </div>
              </div>
              <div class="mt-n1" style="grid-area: strikethru;" v-if="offer['pricing_data']['strikethrough_rate_nightly']">
                <p class="relative d-inline-block mb-0 text-grey-lighten-1 font-weight-medium text-decoration-line-through" style="font-size: .875rem!important;">
                  Rp {{ rupiahFormat(offer['pricing_data']['strikethrough_rate_nightly']) }}
                </p>
              </div>
              <div style="grid-area: rate-nightly;">
                <p class="d-block mb-0">
                  <span class="text-h8 font-weight-medium">Rp </span>
                  <span class="text-h6 font-weight-medium">{{ rupiahFormat(offer['pricing_data']['net_rate_nightly_with_bonus']) }}</span>
                  <span class="text-h8 mr-1"> / night</span>
                  <v-icon class="text-grey-darken-2 font-weight-bold mt-n2"
                    style="font-size: 8px; height: 8px; width: 8px;">
                    mdi-snowflake
                  </v-icon>
                </p>
              </div>
              <div style="grid-area: btn;">
                <v-btn block flat color="primary" class="my-1 text-none text-subtitle-2" style="min-width: 120px;">
                  Book Now
                </v-btn>
              </div>
              <div style="grid-area: total-price;">
                <p class="mb-0 text-caption text-sm-body-2 text-secondary">
                  Total · Rp {{ rupiahFormat(offer['pricing_data']['net_price_total_with_bonus']) }}
                </p>
              </div>
              <div style="grid-area: tax-fees;">
                <p class="mb-0 text-button text-sm-caption text-disabled">
                  after tax & fees
                </p>
              </div>
              <div class="d-flex mt-1 flex-row align-baseline justify-space-between" style="grid-area: disclaimer;">
                <div class="mb-0 d-flex justify-center align-center">
                  <v-icon class="text-disabled mr-1" style="font-size: 8px; height: 8px; width: 8px;">
                    mdi-snowflake
                  </v-icon>
                  <span class="text-button text-disabled text-no-wrap text-none">Member-only price, valid in app
                    only</span>
                </div>
                <p class="mb-0 d-flex justify-start align-center">
                  <v-icon color="primary" style="font-size: 12px; height: 12px; width: 12px;">
                    mdi-star
                  </v-icon>
                  <span class="text-button text-primary text-none">
                    Collect {{ offer['pricing_data']['wisata_point'] }} points
                  </span>
                </p>
              </div>
            </div>
          </div>
        </v-sheet>
      </v-sheet>
    </div>
    <StayRoomDetail
      v-if="showDetail"
      v-model="showDetail"
      :images="filteredOffers[0]['room_images']"
      :room-name="filteredOffers[0]['room_name']"
      :room-bed="filteredOffers[0]['room_bed_groups']"
    />
    <StayRoomShare
      v-if="showOffer && selectedOffer"
      :key="selectedOffer.offer_id || 0"
      v-model="showOffer"
      :offer="selectedOffer"
      :default-active-tab="selectedShareTab"
    />
  </div>
</template>

<script setup>
const { isDesktop } = useViewportState();
const props = defineProps({
  roomId: {
    type: String,
    required: false,
  },
  offerLists: {
    type: Array,
    required: false,
  }
});

const showDetail = ref(false);
const onOpenDetail = () => {
  showDetail.value = true;
}

const selectedOffer = ref(null);
const showOffer = ref(false);
const selectedShareTab = ref('text');
const onOpenOffer = (offer, tab) => {
  selectedOffer.value = offer;
  selectedShareTab.value = tab;
  showOffer.value = true;
}
const filteredOffers = computed(() => {
  if (props.offerLists) {
    return props.offerLists
    .filter((offer) => offer.room_data.id === props.roomId)
    .filter((offer) => offer.room_data.id === props.roomId)
      .sort((a, b) => {
        const priceA = a.pricing_data?.net_rate_nightly_with_bonus || 0;
        const priceB = b.pricing_data?.net_rate_nightly_with_bonus || 0;
        return priceA - priceB;
      });
  }

  return [];
});
</script>

<style lang="scss">
@use "~/assets/scss/room.scss";
</style>
