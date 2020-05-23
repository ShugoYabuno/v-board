<template>
  <div class="task-container">
    <div class="tasks">
      <div class="task" v-for="_task in tasks" :key="_task.id">
        <p>{{ _task.title }}</p>
        <p>{{ _task.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'team',
  data() {
    return {
      tasks: [],
    }
  },
  async asyncData({ route, store }) {
    const { teamId } = route.params
    const tasksParams = {
      col1: 'teams',
      col1Id: teamId,
      col2: 'tasks',
    }
    const tasks = await store.dispatch('db/get2ColId', tasksParams)

    return {
      tasks: tasks,
    }
  },
}
</script>

<style lang="scss" scoped>
.task-container {
  margin: 1rem 1rem 0;
  .task {
    background: #fff;
    // margin-bottom: 1rem;
    // border-radius: 5px;
    p {
      color: #000;
    }
    &:nth-child(2n) {
      background: #eee;
    }
  }
}
</style>
