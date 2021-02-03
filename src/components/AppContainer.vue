<template>
  <div class="container">
    <app-tags />
    <app-task />
  </div>
</template>

<script>
import AppTask from './AppTask';
import AppTags from './AppTags';

export default {
  name: 'AppContainer',
  components: { AppTask, AppTags },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/base.scss';

.container {
  display: flex;
  padding: 40px 120px;
  background: $bg-color-1;
}
</style>
