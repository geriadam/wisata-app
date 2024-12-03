import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    checkin: '',
    checkout: '',
    guest_per_room: 0,
    number_of_room: 0,
    slug: '',
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
