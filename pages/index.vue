<template>
  <div
    class="wrapper bg-gray-30 flex-ij-center">
    <LoginForm />
  </div>
</template>

<script>
import Meta from "~/utils/mixins/meta"
import LoginForm from "~/components/parts/LoginForm"

export default {
  components: {
    LoginForm
  },
  mixins: [Meta],
  async mounted() {
  },
  methods: {
  },
}
</script>
