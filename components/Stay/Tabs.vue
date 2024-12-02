<template>
  <v-tabs v-model="internalValue" align-tabs="center" background-color="transparent" class="tab-no-background mt-1">
    <div v-for="(tab, index) in tabs" :key="index" class="d-flex">
      <div class="pl-2"></div>
      <v-tab :value="tab.value" variant="text" class="tab-no-background pb-2 pt-2" color="primary" :to="tab.route">
        <v-icon :style="iconStyle">{{ tab.icon }}</v-icon>
        <span v-if="$device.isDesktop" class="text-button font-weight-medium">
          {{ tab.label }}
        </span>
      </v-tab>
      <div class="pr-2"></div>
    </div>
  </v-tabs>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => [
        {
          label: "Deals",
          icon: "mdi-tag-outline",
          route: "/stay",
          value: "deals",
        },
        {
          label: "Photos",
          icon: "mdi-grid",
          route: "/photos",
          value: "photos",
        },
        {
          label: "Info",
          icon: "mdi-information-outline",
          route: "/info",
          value: "info",
        },
      ],
    },
    modelValue: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    iconStyle() {
      return {
        fontSize: "18px",
        height: "18px",
        width: "18px",
        marginRight: "8px",
      };
    },
  },
};
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
