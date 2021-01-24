<template>
  <div class="task-container flex justify-center flex-col items-center w-3/5">
    <div class="task-wrapper flex flex-col justify-center content-start">
      <h2 class="task-day font-bold my-4 uppercase text-left">Сегодня</h2>
      <h2 class="task-day font-bold my-4 uppercase text-left">Завтра</h2>
      <h2 class="task-day font-bold my-4 uppercase text-left">След. неделя</h2>
      <h2 class="task-day font-bold my-4 uppercase text-left">Потом</h2>
    </div>
    <div class="input-container">
      <input
        v-model="inputTask"
        type="text"
        placeholder="Введите задачу, которую хотите добавить"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTask',
  data: function () {
    return {
      inputTask: '',
    };
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
