import { defineStore } from 'pinia';

const config = useRuntimeConfig()

const API_BASE_URL = config.public.apiBase;

export const useAvailabilityStore = defineStore('availability', {
  state: () => ({
    availability: null,
    unfilteredAvailability: null,
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
          this.unfilteredAvailability = data.value;
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

    fetchFilteredData(filters) {
      try {
        const filteredAvailability = this.applyFiltersToAvailability(this.unfilteredAvailability, filters);
        this.availability = filteredAvailability;
      } catch (error) {
        this.handleError(error);
      }
    },

    applyFiltersToAvailability(availabilityData, filters) {
      const filteredList = availabilityData.offer_list.filter((property) => {
        const hasFreeBreakfast = filters['free_breakfast'] ? property.meal_plan_description : true;
        const hasFreeCancellation = filters['free_cancellation'] ? property.cancel_policy_code === 'FC' : true;
        return hasFreeBreakfast && hasFreeCancellation;
      });

      return {
        ...availabilityData,
        offer_list: filteredList,
      };
    },

    resetFilters() {
      this.availability = this.unfilteredAvailability;
      console.log('Resetting availability', this.availability);
    },

    handleError(error) {
      if (error && error.value && error.value.data && error.value.data.detail) {
        this.errorMessages = [error.value.data.detail];
      } else {
        this.errorMessages = ['An unexpected error occurred.'];
      }
      this.error = error;
    },
  },
});