import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const usePropertyContentStore = defineStore('propertyContent', {
  state: () => ({
    properties: {},
  }),
  actions: {
    async fetchPropertyContent(id) {
      if (this.properties[id]) {
        return this.properties[id];
      }

      try {
        const { data, error: fetchError } = await useFetch(
          `${API_BASE_URL}/property/content`, {
          params: {
            id,
            include: 'room',
          },
        });

        if (data.value) {
          this.properties[id] = data.value[id];
          return data.value[id];
        }
      } catch (error) {
        console.error('Failed to fetch property data:', error);
        throw error;
      }
    },
  },
});
