<template>
  <div v-if="propertyData && availabilityPropertyData.offer_list.length > 0">
    <StayFilterRooms />
    <StayRoomCard :roomId="index" v-for="(item, index) in propertyData.room" :key="index" :offerLists="availabilityPropertyData?.offer_list" />
  </div>
  <StayEmpty v-else icon="mdi-text-box-search-outline" :message="emptyMethodData" />
</template>
<script setup>

definePageMeta({
  middleware: ['fetch-property-content', 'fetch-availability'],
  includes: ['room'],
});

const route = useRoute();
const filterStore = useFiltersStore();
const slug = route.params.slug;

const propertyContentStore = usePropertyContentStore();
const availabilityStore = useAvailabilityStore();
const propertyId = extractPropertyId(slug);
const propertyData = computed(() => propertyContentStore.properties[propertyId] || {});
const availabilityPropertyData = computed(() => availabilityStore.availability || {});

const formatDate = (dateString, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const emptyMethodData = computed(() => {
  const { checkin, checkout } = filterStore;
  const checkinFormatted = formatDate(checkin, { day: 'numeric' });
  const checkoutFormatted = formatDate(checkout, { day: 'numeric', month: 'short', year: 'numeric' });
  return `No available room on ${checkinFormatted} – ${checkoutFormatted} for ${filterStore.guest_per_room} guests per room and ${filterStore.number_of_room} room.`
})

</script>