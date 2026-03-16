<template>
  <v-layout>
    <v-app-bar color="surface-light" elevation="2" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="text-center">Technical Task</v-app-bar-title>

      <v-btn icon @click="logout">
        <v-icon>mdi-account-multiple-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </v-layout>
</template>
<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
