<template>
  <div class="">
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'AppSubtaskItem',
  props: {
    data: {
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
