<template>
  <div>
    <app-container />
  </div>
</template>

<script>
import AppContainer from './components/AppContainer.vue';

export default {
  name: 'App',
  components: {
    AppContainer,
  },
};
</script>

<style lang="scss">
@import './assets/css/base.scss';

body {
  background-color: $bg-color-1;
  color: $font-main;
}

#app {
  font-family: 'Oswald', sans-serif;
}
</style>
