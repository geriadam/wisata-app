<template>
  <v-text-field id="checkin-activator" v-model="formattedDate" label="Check in - Check out" variant="outlined"
    rounded="lg" :readonly="true" :hide-details="true" type="button" @click="openMenu" class="text-left">
    <template #prepend-inner>
      <v-icon>mdi-calendar</v-icon>
    </template>
  </v-text-field>

  <v-menu v-model="menu" activator="#checkin-activator" :close-on-content-click="false"
    @click:outside="handleMenuClose">
    <v-confirm-edit v-model="selectedDates" @save="handleDateSelect" @cancel="closeMenu">
      <template v-slot:default="{ model: proxyModel, actions }">
        <v-card title="" class="input-datepicker">
          <template v-slot:text>
            <!-- Bind the date-picker model directly to proxyModel.value -->
            <v-date-picker :show-adjacent-months="false" v-model="proxyModel.value" :hide-header="true"
              :multiple="true"></v-date-picker>
          </template>
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <component :is="actions"></component>
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-menu>
</template>

<script setup>
import { format, addDays, eachDayOfInterval, parseISO } from "date-fns";


const filterStore = useFiltersStore();
const today = new Date();
const checkin = ref(null);
const checkout = ref(null);
const selectedDates = ref([]);
const menu = ref(false);
const formattedDate = ref("");

const minDate = ref(today);

const formatDisplay = (checkin, checkout) => {
  const checkinDay = checkin.getDate();
  const checkoutDay = checkout.getDate();
  const checkoutMonth = format(checkout, "MMM");
  const checkoutYear = checkout.getFullYear();
  return `${checkinDay} - ${checkoutDay} ${checkoutMonth} ${checkoutYear}`;
};

const handleDateSelect = (dates) => {
  if (dates.length === 1) {
    checkin.value = dates[0];
    checkout.value = addDays(dates[0], 1);
    selectedDates.value = [checkin.value];
  } else {
    checkin.value = dates[0];
    checkout.value = dates[dates.length - 1];
    selectedDates.value = eachDayOfInterval({
      start: checkin.value,
      end: checkout.value,
    });
  }

  formattedDate.value = formatDisplay(checkin.value, checkout.value);

  filterStore.setFilters({
    checkin: format(checkin.value, "yyyy-MM-dd"),
    checkout: format(checkout.value, "yyyy-MM-dd"),
    guest_per_room: filterStore.guest_per_room,
    number_of_room: filterStore.number_of_room,
    slug: filterStore.slug,
  });

  closeMenu();
};

const closeMenu = () => {
  if (selectedDates.value.length < 2) {
    checkout.value = addDays(checkin.value, 1);
    selectedDates.value = [checkin.value, checkout.value];
  }

  selectedDates.value = eachDayOfInterval({
    start: checkin.value,
    end: checkout.value,
  });

  menu.value = false;
};

const openMenu = () => {
  menu.value = true;
};

onMounted(() => {
  checkin.value = parseISO(filterStore.checkin || "2025-05-08");
  checkout.value = parseISO(filterStore.checkout || "2025-05-08");
  selectedDates.value = eachDayOfInterval({
    start: checkin.value,
    end: checkout.value,
  });
  formattedDate.value = formatDisplay(checkin.value, checkout.value);
});
</script>

<style scoped></style>
