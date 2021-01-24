<template>
  <div>
    <el-button
      :type="type"
      :icon="icon"
      :size="size"
      @click="into()"
    ></el-button>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
    type: {},
    icon: {},
    size: {},
    path: {},
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    into() {
      this.$router.push({
        path: this.path,
        query: { ID: this.id },
      });
    },
  },
};
</script>

