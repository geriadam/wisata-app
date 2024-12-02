<template>
  <div>
    <!-- <div class="container mx-auto"> -->
    <v-app>
      <div class="text-center">
        <v-overlay v-model="showSearch" style="z-index: 4;"></v-overlay>
      </div>
      <AppHeader />
      <v-main class="mb-4">
        <slot />
      </v-main>
      <AppFooter />
    </v-app>
    <!-- </div> -->
  </div>
</template>
<script setup>
import { useSearch } from '@/composables/useSearch';
const { showSearch } = useSearch();
</script>