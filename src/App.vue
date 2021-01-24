<template>
  <div id="app">
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

<style>
#app {
  font-family: 'Oswald', sans-serif;
}
</style>
