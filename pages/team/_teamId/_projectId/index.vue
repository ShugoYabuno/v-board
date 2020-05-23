<template>
  <div class="project-show">
    <Tabs
      :statusList="statusList"
      :select-status="selectStatus"
      @click="changeActiveTab"
    />
    <!-- <Tasks :tasks="tasks" /> -->
  </div>
</template>

<script>
import Tabs from '~/components/Organisms/Tabs.vue'
// import Tasks from '~/components/Organisms/Tasks.vue'

export default {
  layout: 'team',
  components: {
    Tabs,
    // Tasks,
  },
  async asyncData({ route, store }) {
    const { teamId, projectId } = route.params

    const statusParams = {
      col1: 'teams',
      col1Id: teamId,
      col2: 'projects',
      col2Id: projectId,
      col3: 'task_status',
    }
    const status = await store.dispatch('db/get3Col2Id', statusParams)

    return {
      // tasks: tasks,
      statusList: status,
      selectStatus: status[0],
    }
  },
  methods: {
    changeActiveTab(_status) {
      this.selectStatus = _status
    },
  },
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
