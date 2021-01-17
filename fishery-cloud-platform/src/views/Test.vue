<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Test msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Test from '@/components/wzp/test.vue'

export default {
  components: {
    Test
  }
}
</script>
