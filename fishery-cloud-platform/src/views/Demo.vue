<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Demo msg="Welcome to Your Vue.js App"/>
  </div>
</template>
<script>
// @ is an alias to /src
import Demo from '@/components/wzp/demo.vue'

export default {
  components: {
    Demo
  }
}
</script>