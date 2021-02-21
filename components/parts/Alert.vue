<template>
  <div
    v-show="isAlertShow"
    class="z-20 fixed top-4 left-1/2 w-64 -ml-32 p-2 rounded"
    :class="[alertTypeSuccess ? 'bg-lightgreen' : 'bg-red']">
    <p
      class="text-white">
      {{ alertText }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  computed: {
    alertTypeSuccess() {
      return this.$store.getters["alertType"] === "success"
    },
    isAlertShow() {
      return this.$store.getters["isAlertShow"]
    },
    alertText() {
      return this.$store.getters["alertText"]
    },
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    // alertToggle() {
    //   this.$store.commit("sidebarToggle");
    // }
  }
}
</script>
