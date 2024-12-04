import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const useAvailabilityStore = defineStore('availability', {
  state: () => ({
    availability: {},
  }),
  actions: {
    async fetchAvailability(id, query) {

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
          // Save the fetched data in the store
          this.availability = data.value;
          return data.value;
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