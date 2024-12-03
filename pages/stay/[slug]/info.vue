<template>
  <section v-if="propertyData">
    <h3 class="text-sm-h5 font-weight-medium mb-0">About the property</h3>
    <p class="text-body-2 my-2" v-html="mergedDescriptions"></p>
    <h3 class="mb-2 pt-4 text-sm-h5 font-weight-medium">Languages</h3>
    <p class="text-body-2 mb-0" v-html="mergedLanguages"></p>
  </section>
  <section class="pt-8 pt-sm-12">
    <div>
      <h2 class="text-sm-h5 font-weight-medium mb-0">Policies</h2>
      <v-row class="pt-4" no-gutters>
        <v-col cols="12">
          <div class="d-flex">
            <h3>
              <p class="text-md-h6 mb-2 font-weight-medium">Check-in</p>
              <p class="mb-0 text-body-1">{{ propertyData?.important_info?.checkin?.begin_time }}</p>
            </h3>
            <h3 class="pl-6">
              <p class="text-md-h6 mb-2 font-weight-medium">Check-out</p>
              <p class="mb-0 text-body-1">{{ propertyData?.important_info?.checkout?.time }}</p>
            </h3>
          </div>
          <h3 class="text-md-h6 font-weight-medium mt-4 mb-0">Additional check-in information</h3>
          <div class="text-body-2 pt-2 pl-3" v-html="propertyData?.important_info?.checkin?.instructions"></div>
        </v-col>
      </v-row>
      <v-row class="pt-4" no-gutters>
        <v-col cols="12">
          <h3 class="text-md-h6 font-weight-medium mb-0">Others</h3>
        </v-col>
        <v-col cols="12" class="pt-2">
          <div class="text-body-2 pl-3" v-html="propertyData?.important_info?.policies?.know_before_you_go"></div>
        </v-col>
      </v-row>
    </div>
  </section>
  <section class="pt-8 pt-sm-12">
    <h2 class="text-sm-h5 font-weight-medium mb-0">Important information</h2>
    <v-row class="pt-4" no-gutters>
      <v-col cols="12">
        <h3 class="text-md-h6 font-weight-medium mb-0">Optional charges</h3>
      </v-col>
      <v-col cols="12" class="pt-2">
        <div class="text-body-2 pl-3" v-html="propertyData?.important_info?.fees?.optional"></div>
      </v-col>
    </v-row>
  </section>
</template>
<script setup>

definePageMeta({
  middleware: 'fetch-property-content',
  includes: ['general_info', 'important_info'],
});

const route = useRoute();
const slug = route.params.slug;

const propertyContentStore = usePropertyContentStore();
const propertyId = extractPropertyId(slug);
const propertyData = computed(() => propertyContentStore.properties[propertyId] || {});

const mergedDescriptions = computed(() => {
  const data = propertyData.value;
  if (data && data.general_info && data.general_info.descriptions) {
    const location = data.general_info.descriptions.location || '';
    const dining = data.general_info.descriptions.dining || '';
    const amenities = data.general_info.descriptions.amenities || '';
    return [location, dining, amenities].filter(Boolean).join('<br>');
  }
  return '';
});

const mergedLanguages = computed(() => {
  const data = propertyData.value;
  if (data && data.general_info && data.general_info.spoken_languages) {
    const languages = data.general_info.spoken_languages;
    return Object.values(languages)
      .map((lang) => lang.name)
      .join(', ');
  }
  return '';
});
</script>