<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'AppTaskItem',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function () {
    return {
      taskMessage: this.data,
    };
  },
};
</script>

<style></style>
