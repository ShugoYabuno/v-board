<template>
  <font-awesome-icon
    icon="cog" />
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faCog)

export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>
