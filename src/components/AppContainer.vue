<template>
  <div class="container">
    <app-task />
  </div>
</template>

<script>
import AppTask from './AppTask.vue';

export default {
  name: 'AppContainer',
  components: { AppTask },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/base.scss';

.container {
  background: $bg-color-1;
}
</style>
