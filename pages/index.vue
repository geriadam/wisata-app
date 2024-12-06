<template>
  <NuxtLayout key="home" name="main">
    <header class="d-print-none bg-white py-4" style="height: 64px;">
      <div class="container">
        <v-row justify="between" align="center" align-content="space-between">
          <NuxtLink to="/" class="d-inline-block align-self-center brand-logo w-50"
            style="line-height: 0;">
            <div class="d-inline-block" style="line-height: 0; margin: 0px 0px 0px -6px;">
              <img src="/assets/img/logo-wisata-app.png" alt="app-logo" width="185" height="42" />
            </div>
          </NuxtLink>
          <div class="w-50 d-flex align-end flex-column">
            <v-btn class="text-none text-body-2 font-weight-bold" variant="flat" color="primary">
              Sign in
            </v-btn>
          </div>
        </v-row>
      </div>
    </header>
    <div class="container">
      <div class="py-8 my-0 my-sm-8">
        <div class="d-flex justify-center">
          <v-col md="10" lg="12" class="text-center">
            <h1 class="text-h3 text-sm-h2 font-weight-bold px-sm-0 px-md-8 mb-3">The best place to book<br>hotel deals</h1>
            <p class="text-h5 text-sm-h6 mb-3">Save time and money with our <span class="d-inline-block d-md-inline rainbow-text font-weight-bold">incredible member-only prices</span></p>
            <div class="pt-3 d-flex justify-center align-center">
              <v-btn
                href="/stay/fairmont-jakarta-9000248394?checkin=2025-03-04&checkout=2025-03-08&guest_per_room=2&number_of_room=1"
                color="primary"
                elevation="0"
                size="large"
                width="200px"
                class="text-none text-subtitle-2 text-bold"
              >
                Fairmont Jakarta
              </v-btn>
              <v-btn
                href="https://project-exterior-technical-test-app.up.railway.app/app"
                variant="outlined"
                color="primary"
                elevation="0"
                size="large"
                width="150px"
                class="text-none text-subtitle-2 text-bold ml-3"
              >
                Download App
              </v-btn>
            </div>
          </v-col>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
useHead({
  title: 'Wisata App: Book Member Only Hotel Deals'
})
</script>
<style scoped>
body {
  font-family: Google Sans, BlinkMacSystemFont, sans-serif !important;
}
.rainbow-text {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(90deg, #6a5acd, violet 20%, pink 30%, #b22222 40%, tomato 50%, #ff8c00 55%, green 65%, #1e90ff 80%, #add8e6);
  -webkit-background-clip: text;
  background-clip: text;
}
</style>