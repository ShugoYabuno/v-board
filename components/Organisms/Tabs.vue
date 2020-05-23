<template>
  <div class="tab-area">
    <!-- <TabItem /> -->
    <div class="tabs">
      <div
        class="_item"
        v-for="(_status, _index) in statusList"
        :key="_index"
        :class="{ active: isActive(_status) }"
        @click="tabClick(_status)"
      >
        <p class="_p">{{ _status.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectStatus: {
      type: Object,
    },
    statusList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    isActive() {
      return function (_status) {
        return this.selectStatus === _status
      }
    },
  },
  methods: {
    tabClick(_status) {
      this.$emit('click', _status)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  @include flex();
  height: 1.7rem;
  background: $gray;
  ._item {
    width: 7rem;
    height: 100%;
    background: $dark-gray;
    border-right: 1px solid $black;
    ._p {
      padding-left: 0.5rem;
      line-height: 1.7rem;
    }
    &.active {
      background: $black;
    }
    &:last-child {
      border-right: 0;
    }
  }
}
</style>
