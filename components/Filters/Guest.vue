<template>
  <v-text-field id="room-activator" v-model="formattedRoom" label="Guests & Rooms" variant="outlined" rounded="lg"
    :readonly="true" :hide-details="true" type="button" @click="openMenu">
    <template #prepend-inner>
      <v-icon>mdi-account-multiple-outline</v-icon>
    </template>
  </v-text-field>
  <v-menu v-model="menuRoom" activator="#room-activator" :close-on-content-click="false"
    @click:outside="toggleMenu(false)">
    <!-- Main card content -->
    <v-card class="card-inner rounded-lg px-3 py-3">
      <div class="guest-per-room" style="display: flex; justify-content: space-between; align-items: center;">
        <v-btn variant="text" @click="updateCount('guest', 'decrease')">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <div class="d-flex flex-column align-center">
          <div class="text-center">{{ guest }}</div>
          <div>
            <span class="text-primary text-h6 font-weight-medium">
              {{ guestCount }}
            </span>
            <span class="text-caption"> guests/room </span>
          </div>
          <v-dialog max-width="420">
            <template v-slot:activator="{ props: activatorProps }">
              <div class="text-center">
                <div class="d-inline-flex align-center" style="cursor: pointer;" v-bind="activatorProps">
                  <v-icon style="font-size: 12px; height: 12px; width: 12px;"
                    size="x-small">mdi-information-outline</v-icon>
                  <span class="d-inline-block mx-auto text-none ml-1"
                    style="font-weight: 300; letter-spacing: 0px !important; font-size: .75rem !important; line-height: 1.2rem;">
                    What about children ?
                  </span>
                </div>
              </div>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-title class="pa-4">
                  <div class="d-flex align-center justify-center" style="gap: 8px">
                    <v-icon size="x-small"
                      style="font-size: 18px; height: 18px; width: 18px;">mdi-information-outline</v-icon>
                    <span class="text-subtitle-1 font-weight-medium mb-0">What
                      about children ?</span>
                  </div>
                </v-card-title>
                <v-card-text class="pt-0">
                  <span class="text-body-2">Most hotels permit children to use existing bedding when
                    sharing the room with parent or guardian. Rules may vary, be sure to check each hotel occupancy
                    policy.
                  </span>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn block variant="flat" class="text-none text-subtitle-2 font-weight-bold" color="primary"
                    text="Close" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
        <v-btn density="comfortable" variant="text" size="small" @click="updateCount('guest', 'increase')">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-divider class="mt-3 pb-3"></v-divider>
      <div class="py-3" style="display: flex; justify-content: space-between; align-items: center;">
        <v-btn variant="text" @click="updateCount('room', 'decrease')">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <div>
          <span class="text-primary text-h6 font-weight-medium">
            {{ roomCount }}
          </span>
          <span> Room </span>
        </div>
        <v-btn density="comfortable" variant="text" size="small" @click="updateCount('room', 'increase')">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
const filterStore = useFiltersStore();
export default {
  setup() {
    const menuRoom = ref(false);
    const guestCount = ref(1);
    const roomCount = ref(1);

    const toggleMenu = (status) => {
      menuRoom.value = status;
    };

    const updateCount = (type, action) => {
      if (type === "guest") {
        guestCount.value = adjustValue(guestCount.value, action);
        filterStore.setFilters({
          checkin: filterStore.checkin,
          checkout: filterStore.checkout,
          guest_per_room: guestCount.value,
          number_of_room: filterStore.number_of_room,
          slug: filterStore.slug,
        });
      } else if (type === "room") {
        roomCount.value = adjustValue(roomCount.value, action);
        filterStore.setFilters({
          checkin: filterStore.checkin,
          checkout: filterStore.checkout,
          guest_per_room: filterStore.guest_per_room,
          number_of_room: roomCount.value,
          slug: filterStore.slug,
        });
      }

      formattedRoom()
      guest()
    };

    const adjustValue = (value, action) => {
      return action === "increase" ? value + 1 : Math.max(1, value - 1);
    };

    const formattedRoom = computed(() => {
      return labelGuest() + ' x ' + roomCount.value;
    });

    const guest = computed(() => {
      return labelGuest();
    });

    const labelGuest = () => {
      let guestDescription;
      if (guestCount.value === 1) {
        guestDescription = "Single Room";
      } else if (guestCount.value === 2) {
        guestDescription = "Double Rooms";
      } else if (guestCount.value === 3) {
        guestDescription = "Triple Rooms";
      } else {
        guestDescription = `Group of ${guestCount.value}`;
      }

      return guestDescription;
    }

    return {
      menuRoom,
      toggleMenu,
      updateCount,
      formattedRoom,
      guest,
      guestCount,
      roomCount,
    };
  }
};
</script>

<style scoped></style>
