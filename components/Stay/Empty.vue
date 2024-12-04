<template>
  <div class="text-center my-16">
    <v-icon size="36" color="grey-darken-1" class="mb-2">{{ icon }}</v-icon>
    <div class="font-weight-regular text-secondary">
      <span class="d-inline-block">{{ message }}</span>
      <div class="mt-4 mx-auto" style="max-width: 400px;" v-if="search">
        <v-btn rounded="xl" class="text-none text-body-2 font-weight-medium" variant="flat" color="primary" @click="toggleSearch">
          Modify Search
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
const { toggleSearch } = useSearch();

const props = defineProps({
  icon: {
    type: String,
    default: 'mdi-information-outline',
  },
  message: {
    type: String,
    default: 'Empty',
  },
  search: {
    type: Boolean,
    default: true,
  },
});
</script>