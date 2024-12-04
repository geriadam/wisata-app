import { defineStore } from 'pinia';

const route = useRoute();

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    checkin: route.query.checkin || '',
    checkout: route.query.checkout || '',
    guest_per_room: route.query.guest_per_room || 0,
    number_of_room: route.query.number_of_room || 0,
    slug: route.params.slug || '',
  }),
  actions: {
    setFilters({ checkin, checkout, guest_per_room, number_of_room, slug }) {
      this.checkin = checkin;
      this.checkout = checkout;
      this.guest_per_room = guest_per_room;
      this.number_of_room = number_of_room;
      this.slug = slug;
    },
  },
});
