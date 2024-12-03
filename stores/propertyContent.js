import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const usePropertyContentStore = defineStore('propertyContent', {
  state: () => ({
    properties: {},
  }),
  actions: {
    async fetchPropertyContent(id, includes = []) {
      if (this.properties[id]) {
        return this.properties[id];
      }

      try {
        const params = {
          id,
          ...(includes.length > 0 && { include: includes }),
        };

        const { data, error: fetchError } = await useFetch(
          `${API_BASE_URL}/property/content`, {
          params,
        });

        if (data.value) {
          // Save the fetched data in the store
          this.properties[id] = data.value[id];
          return data.value[id];
        }

        if (fetchError) {
          console.error('Error fetching property data:', fetchError);
          throw fetchError;
        }
      } catch (error) {
        console.error('Failed to fetch property data:', error);
        throw error;
      }
    },
  },
});