<template>
  <div class="stay-offer-grid">
    <v-sheet class="stay-offer-grid__room-catalog gutters-0 gutters-sm-1 pa-4" :class="{
      'border-thin': $device.isDesktop,
      'border-0': !$device.isDesktop
    }">
      <div class="d-flex justify-space-between align-sm-center">
        <div class="d-flex flex-nowrap align-start">
          <div class="text-h6 font-weight-medium">
            Fairmont, Room, 2 Double Beds
          </div>
        </div>
        <v-btn variant="text" color="primary" class="my-sm-n1 mr-n1 ml-1 ml-sm-0">
          <span class="text-h8 text-none font-weight-medium">See details</span>
        </v-btn>
      </div>
      <div class="d-inline-flex flex-wrap">
        <span class="pr-3">
          <v-icon style="font-size: 18px; height: 18px; width: 18px;">
            mdi-bed-double-outline
          </v-icon>
          <span class="text-caption text-md-body-2">2 Double Beds</span>
        </span>
        <span class="pr-3">
          <v-icon style="font-size: 18px; height: 18px; width: 18px;">
            mdi-border-style
          </v-icon>
          <span class="text-caption text-md-body-2">49 m<sup>2</sup></span>
        </span>
      </div>
      <v-divider class="mx-n4 mt-4 mb-n4 d-none d-lg-block"></v-divider>
    </v-sheet>
    <v-sheet border rounded=" lg" class="stay-offer-grid__room-images mx-n4 mx-sm-0">
      <div class="stay-availability-room-images stay-availability-room-images__grid" style="cursor: pointer;">
        <div class="stay-availability-room-images__main-img bg-grey lighten-4" style="grid-area: main;">
          <div style="position: relative;">
            <v-sheet class="bg-transparent overflow-hidden aspect-ratio"
              style="height: 0px; max-width: 100%; width: 100%; padding-bottom: 54.5455%; line-height: 0;">
              <img data-v-978962ea="" alt="Room"
                src="https://i.travelapi.com/lodging/10000000/9300000/9296600/9296574/5408c18a_b.jpg"
                class="w-full h-full">
            </v-sheet>
            <div
              class="v-btn-stay-see-all-room-images d-flex justify-center align-center bg-white elevation-1 ma-4 ma-sm-3 ma-md-4 px-2 py-1">
              <v-icon style="font-size: 16px; height: 16px; width: 16px;">mdi-grid</v-icon>
              <span class="pl-1 text-button text-none font-weight-medium">See Photos</span>
            </div>
          </div>
        </div>
        <div class="bg-grey lighten-4 relative stay-availability-room-images__other-img"
          style="line-height: 0; grid-area: other-1;">
          <div
            class="bg-transparent overflow-hidden stay-availability-room-images__other-img__container v-sheet theme--light aspect-ratio"
            style="height: 0px; width: 100%; padding-bottom: 75%;">
            <img data-v-978962ea="" alt="Room"
              src="https://i.travelapi.com/lodging/10000000/9300000/9296600/9296574/7f96225b_b.jpg"
              class="w-full h-full" style="">
          </div>
        </div>
        <div class="bg-grey lighten-4 relative stay-availability-room-images__other-img"
          style="line-height: 0; grid-area: other-2;">
          <div
            class="bg-transparent overflow-hidden stay-availability-room-images__other-img__container v-sheet theme--light aspect-ratio"
            style="height: 0px; width: 100%; padding-bottom: 75%;">
            <img data-v-978962ea="" alt="Room"
              src="https://i.travelapi.com/lodging/10000000/9300000/9296600/9296574/7f96225b_b.jpg"
              class="w-full h-full" style="">
          </div>
        </div>
        <div class="bg-grey lighten-4 relative stay-availability-room-images__other-img"
          style="line-height: 0; grid-area: other-3;">
          <div
            class="bg-transparent overflow-hidden stay-availability-room-images__other-img__container v-sheet theme--light aspect-ratio"
            style="height: 0px; width: 100%; padding-bottom: 75%;">
            <img data-v-978962ea="" alt="Room"
              src="https://i.travelapi.com/lodging/10000000/9300000/9296600/9296574/7f96225b_b.jpg"
              class="w-full h-full" style="">
          </div>
        </div>
      </div>
    </v-sheet>
    <v-sheet class="stay-offer-grid__room-offer bg-transparent" :class="{
      'border-thin': $device.isDesktop,
      'border-0': !$device.isDesktop
    }">
      <v-sheet class="py-4 pa-sm-4 bg-transparent">
        <div class="d-flex flex-nowrap align-stretch justify-space-between">
          <div class="flex-1-0-0">
            <div>
              <div id="meal-plan" class="d-flex align-center">
                <v-icon color="success" class="mr-2" style="font-size: 16px; height: 16px; width: 16px;">
                  mdi-silverware-variant
                </v-icon>
                <span class="align-middle text-body-2 text-md-body-1 text-green-darken-3">Free Breakfast</span>
              </div>
              <div id="cancel-policy" class="d-flex align-center">
                <v-icon color="success" class="mr-2" style="font-size: 16px; height: 16px; width: 16px;">
                  mdi-credit-card-check-outline
                </v-icon>
                <span class="align-middle text-body-2 text-md-body-1 text-green-darken-3">Free cancellation before 01
                  Mar
                  2025</span>
              </div>
            </div>
          </div>
          <div class="d-flex justify-end">
            <div class="d-inline-block my-n1">
              <div class="d-flex flex-row flex-nowrap align-center" style="gap: 4px">
                <v-btn variant="text" icon size="x-small" style="height: 32px; width: 32px;">
                  <v-icon color="grey-darken-2" style="font-size: 20px; height: 20px; width: 20px;">
                    mdi-content-copy
                  </v-icon>
                  <v-tooltip activator="parent" location="top">Copy offer</v-tooltip>
                </v-btn>
                <v-btn variant="text" icon size="x-small" style="height: 32px; width: 32px;">
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
                      <v-list-item>
                        <v-list-item-title class="py-2 text-h8">
                          <v-icon color="grey-darken-2"
                            style="font-size: 18px; height: 18px; width: 18px; margin-right: 5px;">
                            mdi-content-copy
                          </v-icon>Copy Offer
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
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
            <div style="grid-area: rate-nightly;">
              <p class="d-block mb-0">
                <span class="text-h8 font-weight-medium">Rp </span>
                <span class="text-h6 font-weight-medium">3,453,100</span>
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
                Total · Rp 13,812,400
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
                  Collect 12 points
                </span>
              </p>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<script>
</script>

<style lang="scss">
@use "~/assets/scss/room.scss";
</style>
