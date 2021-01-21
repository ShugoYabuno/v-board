<template>
  <div
    v-if="uploadTasksProgress.length >= 1"
    class="fixed w-80 bottom-10 right-10 shadow-lg rounded-sm overflow-hidden z-10 bg-gray-30">
    <div class="bg-gray-100 text-gray-10 p-4">
      <p>Uploading {{ uploadTasksProgress.length }} items</p>
    </div>
    <div
      v-for="(task, index) in uploadTasksProgress"
      :key="index"
      class="p-2 border-solid border-t border-gray-50"
      :class="{ 'border-none': index == 0 }">
      <p>{{ task.fileName }}</p>
      <progress
        ref="progress"
        class="w-full h-2 bg-lightgreen"
        :value="`${task.progress}`"
        max="100" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadTasksProgress: []
    }
  },
  computed: {
    uploadTasks: function() {
      return this.$store.getters["video/uploadTasks"]
    }
  },
  watch: {
    uploadTasks(_val) {
      this.uploadTasksProgress = _val
    }
  },
}
</script>
