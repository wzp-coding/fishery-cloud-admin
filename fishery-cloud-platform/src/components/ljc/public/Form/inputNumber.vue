<template>
  <el-col :xs="24" :sm="12" :lg="12">
    <el-form-item :label="label + '：'">
      <el-input-number
        v-model="value"
        controls-position="right"
        @change="handleChange"
        :precision="2"
        :step="0.1"
        :min="Number(min)"
        :max="Number(max)"
      ></el-input-number>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  props: {
    label: String,
    defaultVal: String,
    keyName: String,
    min: {},
    max: {},
  },
  data() {
    return {
      value: this.defaultVal || 0,
    };
  },
  create() {
    this.handleChange(this.value);
  },
  methods: {
    handleChange(val) {
      this.$emit("change", this.keyName, val);
    },
  },
};
</script>