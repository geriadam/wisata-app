import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const usePropertyContentStore = defineStore('propertyContent', {
  state: () => ({
    properties: null,
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
          if (!this.properties) {
            this.properties = {};
          }

          const existingProperty = this.properties[id] || {};

          this.properties[id] = {
            ...existingProperty,  // Retain the existing data
            room: data.value[id]?.room || existingProperty.room,
            image: data.value[id]?.image || existingProperty.image,
            general_info: data.value[id]?.general_info || existingProperty.general_info,
            important_info: data.value[id]?.important_info || existingProperty.important_info,
            // Add any additional fields in the API response
            ...data.value[id], // Merges any additional keys from the response
          };

          return this.properties[id];
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
      if (error && error.value && error.value.data && error.value.data.detail) {
        this.errorMessages = [error.value.data.detail];
      } else {
        this.errorMessages = ['An unexpected error occurred.'];
      }
      this.error = error;
    },
  }
});