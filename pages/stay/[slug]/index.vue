<template>
  <div>
    <StayFilterRooms />
    <StayRoomCard v-if="propertyData" :roomId="index" v-for="(item, index) in propertyData.room" :key="index" :offerLists="availabilityPropertyData?.offer_list" />
  </div>
</template>
<script setup>

definePageMeta({
  middleware: ['fetch-property-content', 'fetch-availability'],
  includes: ['room'],
});

const route = useRoute();
const slug = route.params.slug;

const propertyContentStore = usePropertyContentStore();
const availabilityStore = useAvailabilityStore();
const propertyId = extractPropertyId(slug);
const propertyData = computed(() => propertyContentStore.properties[propertyId] || {});
const availabilityPropertyData = computed(() => availabilityStore.availability || {});

</script>