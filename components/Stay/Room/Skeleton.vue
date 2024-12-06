<template>
  <div class="bg-transparent mb-sm-8 mb-md-10">
    <div class="stay-offer-grid">
      <!-- Room Catalog Skeleton -->
      <v-sheet class="stay-offer-grid__room-catalog" :class="{
        'border-thin': isDesktop,
        'border-0': !isDesktop
      }">
        <v-skeleton-loader
          type="text"
          :loading="true"
          style="max-width: 300px"
        ></v-skeleton-loader>
      </v-sheet>

      <!-- Room Images Skeleton -->
      <v-sheet border rounded=" lg" class="stay-offer-grid__room-images mx-n4 mx-sm-0" style="height: 100%;">
        <v-skeleton-loader
          class="skeleton-image"
          type="image"
          :loading="true"
          style="min-height: 100%; min-width: 100%"
        ></v-skeleton-loader>
      </v-sheet>

      <!-- Room Offer Skeleton -->
      <v-sheet class="stay-offer-grid__room-offer bg-transparent" :class="{
        'border-thin': isDesktop,
        'border-0': !isDesktop
      }">
        <v-sheet class="bg-transparent" style="min-height: 147px;">
          <div class="d-flex flex-nowrap align-stretch justify-space-between pb-4">
            <div class="w-full">
              <v-skeleton-loader
                class="skeleton-list-item"
                type="list-item-two-line"
                :loading="true"
                width="100%"
              >
              </v-skeleton-loader>
            </div>
            <div class="d-flex justify-space-between pr-lg-4 pt-lg-4" style="gap: 8px;">
              <v-skeleton-loader
                type="avatar"
                :loading="true"
                class="skeleton-button-action"
              ></v-skeleton-loader>
              <v-skeleton-loader
                type="avatar"
                :loading="true"
                class="skeleton-button-action"
              ></v-skeleton-loader>
              <v-skeleton-loader
                type="avatar"
                :loading="true"
                class="skeleton-button-action"
              ></v-skeleton-loader>
            </div>
          </div>
          <div class="d-flex justify-space-between align-stretch" style="gap: 10px;">
            <div class="w-full">
              <v-skeleton-loader
                class="d-block"
                type="list-item-two-line"
                :loading="true"
                width="150px"
              ></v-skeleton-loader>
            </div>
            <v-skeleton-loader
              class="d-flex justify-end skeleton-button pr-lg-4"
              type="button"
              :loading="true"
            ></v-skeleton-loader>
          </div>
        </v-sheet>
      </v-sheet>
    </div>
  </div>
</template>
<script setup>
const { isDesktop } = useViewportState();
</script>
<style lang="scss">
@use "~/assets/scss/room.scss";
</style>

<style>
.w-full {
  width: 100%;
}

.skeleton-list-item {
  max-width: 350px;
}

.skeleton-button-action .v-skeleton-loader__avatar {
  max-height: 32px!important;
  min-height: 32px!important;
  height: 32px!important;
  max-width: 32px!important;
  min-width: 32px!important;
  width: 32px!important;
  margin: 0;
}

.skeleton-button {
  width: 100%;
}

.skeleton-button .v-skeleton-loader__button {
  width: 40%;
  margin: 0;
}
.skeleton-image {
  position: relative;
}
.skeleton-image .v-skeleton-loader__image {
  height: 100%;
  width: 100%;
  position: absolute;
}

@media screen and (max-width: 768px) {
  .skeleton-image {
    height: 200px;
  } 
}
</style>