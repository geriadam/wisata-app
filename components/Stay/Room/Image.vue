<template>
  <v-sheet rounded="lg" class="stay-offer-grid__room-images mx-n4 mx-sm-0">
    <div class="stay-availability-room-images stay-availability-room-images__grid" style="cursor: pointer;" @click="handleClick">
      <div class="stay-availability-room-images__main-img bg-grey lighten-4" style="grid-area: main;">
        <div style="position: relative;">
          <v-sheet class="bg-transparent overflow-hidden aspect-ratio"
            style="height: 0px; max-width: 100%; width: 100%; padding-bottom: 54.5455%; line-height: 0;">
            <img
              v-if="newImages[0]"
              :src="newImages[0]['size_sm']"
              :alt="newImages[0]['caption'] || 'Image'"
              class="w-full h-full"
            >
            <img
              v-else
              src="https://project-exterior-technical-test-app.up.railway.app/img/fallback-room.png"
              alt="Image"
              class="w-full h-full"
            >
          </v-sheet>
          <div
            v-if="newImages[0]"
            class="v-btn-stay-see-all-room-images d-flex justify-center align-center bg-white elevation-1 ma-4 ma-sm-3 ma-md-4 px-2 py-1">
            <v-icon style="font-size: 16px; height: 16px; width: 16px;">mdi-grid</v-icon>
            <span class="pl-1 text-button text-none font-weight-medium">See Photos</span>
          </div>
        </div>
      </div>
      <div v-if="newImages[1]" class="bg-grey lighten-4 relative stay-availability-room-images__other-img"
        style="line-height: 0; grid-area: other-1;">
        <div
          class="bg-transparent overflow-hidden stay-availability-room-images__other-img__container v-sheet theme--light aspect-ratio"
          style="height: 0px; width: 100%; padding-bottom: 75%;">
          <img
            :src="newImages[1]['size_sm']"
            :alt="newImages[1]['caption'] || 'Image'"
            class="w-full h-full" style="">
        </div>
      </div>
      <div v-if="newImages[2]" class="bg-grey lighten-4 relative stay-availability-room-images__other-img"
        style="line-height: 0; grid-area: other-2;">
        <div
          class="bg-transparent overflow-hidden stay-availability-room-images__other-img__container v-sheet theme--light aspect-ratio"
          style="height: 0px; width: 100%; padding-bottom: 75%;">
          <img
            :src="newImages[2]['size_sm']"
            :alt="newImages[2]['caption'] || 'Image'"
            class="w-full h-full" style="">
        </div>
      </div>
      <div v-if="newImages[3]" class="bg-grey lighten-4 relative stay-availability-room-images__other-img"
        style="line-height: 0; grid-area: other-3;">
        <div
          class="bg-transparent overflow-hidden stay-availability-room-images__other-img__container v-sheet theme--light aspect-ratio"
          style="height: 0px; width: 100%; padding-bottom: 75%;">
          <img 
            :src="newImages[3]['size_sm']"
            :alt="newImages[3]['caption'] || 'Image'"
            class="w-full h-full" style="">
        </div>
      </div>
    </div>
  </v-sheet>
</template>
<script setup>

const props = defineProps({
  images: {
    type: Array,
    required: false,
    default: () => []
  }
});

const newImages = computed(() => props.images || []);

const emit = defineEmits(['image-click']);
const handleClick = () => {
  emit('image-click');
};

</script>
<style lang="scss">
@use "~/assets/scss/room.scss";
</style>