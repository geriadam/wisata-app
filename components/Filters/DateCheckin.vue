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

<script>
import { ref, computed } from "vue";
import { format, addDays, eachDayOfInterval } from "date-fns";

export default {
  setup() {
    // Initialize data
    const today = new Date();
    const checkin = ref(addDays(today, 2));
    const checkout = ref(addDays(today, 3));
    const selectedDates = ref([checkin.value, checkout.value]);
    const menu = ref(false);
    const formattedDate = ref(formatDisplay(checkin.value, checkout.value));

    const minDate = ref(today);

    // Handle date selection
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

      closeMenu();
    };

    // Format the display string
    function formatDisplay(checkin, checkout) {
      const checkinDay = checkin.getDate();
      const checkoutDay = checkout.getDate();
      const checkoutMonth = format(checkout, "MMM");
      const checkoutYear = checkout.getFullYear();
      return `${checkinDay} - ${checkoutDay} ${checkoutMonth} ${checkoutYear}`;
    }

    // Handle menu closing logic
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

    const handleMenuClose = () => {
      closeMenu();
    };

    const openMenu = () => {
      menu.value = true;
    };

    return {
      formattedDate,
      menu,
      handleDateSelect,
      minDate,
      handleMenuClose,
    };
  },
};
</script>

<style scoped></style>
