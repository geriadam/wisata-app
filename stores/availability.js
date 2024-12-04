import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const useAvailabilityStore = defineStore('availability', {
  state: () => ({
    availability: {},
    error: null,
    errorMessages: [],
    loading: false,
  }),
  actions: {
    async fetchAvailability(id, query) {

      this.loading = true;
      this.error = null;
      this.errorMessages = [];

      try {
        const { checkin, checkout, guest_per_room, number_of_room } = query
        const params = {
          checkin,
          checkout,
          guest_per_room,
          number_of_room,
          run_price_check: false
        };

        const { data, error: fetchError } = await useFetch(
          `${API_BASE_URL}/stay/availability/${id}`, {
          params,
        });

        if (data.value) {
          this.availability = data.value;
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