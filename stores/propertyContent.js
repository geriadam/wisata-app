import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const usePropertyContentStore = defineStore('propertyContent', {
  state: () => ({
    properties: {},
    error: null,
    errorMessages: [],
    loading: false,
  }),

  actions: {
    async fetchPropertyContent(id, includes = []) {
      this.loading = true;
      this.error = null;
      this.errorMessages = [];

      try {
        const params = {
          id,
          ...(includes.length > 0 && { include: includes }),
        };

        const { data, error: fetchError } = await useFetch(
          `${API_BASE_URL}/property/content`,
          { params }
        );

        if (data.value) {
          this.properties[id] = data.value[id];
          return data.value[id];
        }

        if (fetchError) {
          this.handleError(fetchError);
        }
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    handleError(error) {
      if (error && error.detail) {
        this.errorMessages = [error.detail];
      } else {
        this.errorMessages = ['An unexpected error occurred.'];
      }
      this.error = error;
    },
  },
});