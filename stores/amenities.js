import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const useAmenitiesStore = defineStore('amenities', {
  state: () => ({
    amenities: {},
    error: null,
    errorMessages: [],
    loading: false,
  }),
  actions: {
    async fetchAmenities(amenities, context) {

      this.loading = true;
      this.error = null;
      this.errorMessages = [];

      try {
        const dataBody = {
          amenities,
          context,
        };

        const { data, error: fetchError } = await useFetch(
          `https://project-exterior-technical-test-app.up.railway.app/amenities`,
          {
            method: 'POST',
            body: JSON.stringify(dataBody),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (data.value) {
          this.amenities = data.value;
          return data.value;
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
      if (error && error.value.data.detail) {
        this.errorMessages = [error.value.data.detail];
      } else {
        this.errorMessages = ['An unexpected error occurred.'];
      }
      this.error = error;
    },
  },
});