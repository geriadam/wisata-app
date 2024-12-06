<template>
  <NuxtLayout key="stayIndex" name="stay">
    <div v-if="availabilityStore.loading" class="pt-sm-2 px-0 px-md-4 d-flex flex-column flex-sm-row justify-start align-stretch justify-sm-center mb-5">
      <v-skeleton-loader
        type="text"
        :loading="true"
        width="50%"
      />
    </div>
    <StayRoomSkeleton v-for="(n, index) in 5" :key="index" v-if="propertyContentStore.loading" />
    <div>
      <div v-if="propertyData && availabilityPropertyData && availabilityPropertyData.offer_list && availabilityPropertyData.offer_list.length > 0">
        <StayFilterRooms v-if="!availabilityStore.loading" />
        <StayRoomCard :roomId="index" v-for="(item, index) in propertyData.room" :key="index" :offerLists="availabilityPropertyData?.offer_list" />
      </div>
      <StayEmpty v-if="availabilityPropertyData && availabilityPropertyData.offer_list && availabilityPropertyData.offer_list.length == 0" icon="mdi-text-box-search-outline" :message="emptyMethodData" />
      <StayEmpty v-if="availabilityPropertyData &&  availabilityStore.errorMessages.length > 0" icon="mdi-information-outline" :message="availabilityStore.errorMessages[0]" />
    </div>
  </NuxtLayout>
</template>

<script setup>

const route = useRoute();
const filterStore = useFiltersStore();
const propertyContentStore = usePropertyContentStore();
const availabilityStore = useAvailabilityStore();
const slug = route.params.slug;
const propertyId = extractPropertyId(slug);

const propertyData = ref(null);
const availabilityPropertyData = ref(null);

const formatDate = (dateString, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const emptyMethodData = computed(() => {
  const { checkin, checkout } = filterStore;
  const checkinFormatted = formatDate(checkin, { day: 'numeric' });
  const checkoutFormatted = formatDate(checkout, { day: 'numeric', month: 'short', year: 'numeric' });
  return `No available room on ${checkinFormatted} – ${checkoutFormatted} for ${filterStore.guest_per_room} guests per room and ${filterStore.number_of_room} room.`;
});

const fetchAll = async () => {
  try {
    if (
      !propertyContentStore.properties ||
      !propertyContentStore.properties.hasOwnProperty(propertyId) ||
      propertyContentStore.properties[propertyId]?.room === null
    ) {
      const properties = await propertyContentStore.fetchPropertyContent(propertyId, ['room'])
      propertyData.value = properties;
    }

    if (!availabilityStore.availability) {
      const availability = await availabilityStore.fetchAvailability(propertyId, filterStore);
      availabilityPropertyData.value = availability;
    }

    const selectedFilters = Object.keys(route.query).filter((key) => {
      return ['free_breakfast', 'free_cancellation'].includes(key);
    });

    if (selectedFilters.length > 0 && availabilityStore.availability) {
      const queryParams = selectedFilters.reduce((acc, filter) => {
        acc[filter] = true;
        return acc;
      }, {});

      availabilityStore.fetchFilteredData(queryParams);
      availabilityPropertyData.value = availabilityStore.availability;
    }

  } catch (error) {
    console.error('Failed to fetch property content:', error);
  }
};

watch(
  () => availabilityStore.availability,
  (newAvailability) => {
    availabilityPropertyData.value = newAvailability;
  },
  { immediate: true }
);

watch(
  () => propertyContentStore.properties,
  (newProperties) => {
    if (newProperties) {
      propertyData.value = newProperties[propertyId]
      useMeta(newProperties[propertyId])
    }
  },
  { immediate: true }
);

onMounted(() => {
  fetchAll();
});
</script>
