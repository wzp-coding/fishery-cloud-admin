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
    otherQuery: {},
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
      this.otherQuery["ID"] = this.id;
      this.$router.push({
        path: this.path,
        query: this.otherQuery,
      });
    },
  },
};
</script>

