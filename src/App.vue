<template>
  <div class="layout">
    <MyNav v-if="$route.meta.layout" />
    <div class="layout__page">
      <router-view />
    </div>
    <MyFooter v-if="$route.meta.layout" />
  </div>
</template>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__page {
    flex: 1;
    padding: 100px 0;
  }
}
</style>
<script setup>
import MyNav from './components/MyNav.vue';
import MyFooter from './components/MyFooter.vue';
</script>
