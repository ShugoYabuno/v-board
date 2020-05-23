<template>
  <div class="task-index">
    <ul v-for="(_task, _index) in tasks" :key="_index">
      <li>{{ _task.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
