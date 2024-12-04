<template>
  <div :key="route.fullPath">
    <div v-if="propertyData && availabilityPropertyData.offer_list.length > 0">
      <StayFilterRooms />
      <StayRoomCard :roomId="index" v-for="(item, index) in propertyData.room" :key="index" :offerLists="availabilityPropertyData?.offer_list" />
    </div>
    <StayEmpty v-if="availabilityPropertyData && availabilityPropertyData.offer_list.length == 0" icon="mdi-text-box-search-outline" :message="emptyMethodData" />
    <StayEmpty v-if="availabilityStore.errorMessages.length > 0" icon="mdi-information-outline" :message="availabilityStore.errorMessages[0]" />
  </div>
</template>
<script setup>

const route = useRoute();
const filterStore = useFiltersStore();
const slug = route.params.slug;

const propertyContentStore = usePropertyContentStore();
const availabilityStore = useAvailabilityStore();
const propertyId = extractPropertyId(slug);

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

const propertyData = ref(null);
const availabilityPropertyData = ref(null);

const fetchAll = async () => {
  try {
    const [properties, availability] = await Promise.all([
      propertyContentStore.fetchPropertyContent(propertyId, ['room']),
      availabilityStore.fetchAvailability(propertyId, filterStore),
    ]);
    propertyData.value = properties;
    availabilityPropertyData.value = availability;
  } catch (error) {
    console.error('Failed to fetch property content:', error);
  }
}

watch(() => route.fullPath, fetchAll, { immediate: true });

</script>