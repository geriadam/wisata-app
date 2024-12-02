<template>
  <v-text-field v-model="location" label="Where are you going?" variant="outlined" rounded="lg" :focused="true"
    clearable :color="isFocused ? 'primary' : 'default'" :hide-details="true" @focus="handleFocus" @blur="handleBlur">
    <template #prepend-inner>
      <v-icon :color="isFocused ? 'primary' : 'default'">mdi-map-marker-outline</v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      location: "Fairmont Jakarta, Jakarta, Indonesia",
      isFocused: true,
    };
  },
  methods: {
    handleFocus() {
      this.isFocused = true;
    },
    handleBlur() {
      this.isFocused = false;
    },
  },
}
</script>
<style scoped></style>