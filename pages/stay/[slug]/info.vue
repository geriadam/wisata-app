<template>
  <div>
    Info
  </div>
</template>
<script setup>

definePageMeta({
  middleware: 'fetch-property-content',
});

const route = useRoute();
const slug = route.params.slug;

const propertyContentStore = usePropertyContentStore();
const propertyId = extractPropertyId(slug);
const propertyData = computed(() => propertyContentStore.properties[propertyId] || {});
console.log(propertyData.value);
</script>