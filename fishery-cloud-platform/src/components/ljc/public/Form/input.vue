<template>
  <el-col :xs="24" :sm="12" :lg="12" v-if="!orTrue">
    <el-form-item :label="label + '：'">
      <el-input
        :type="textarea || ''"
        v-model="value"
        @input="handleChange($event)"
        :placeholder="place"
      ></el-input>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  props: {
    label: String,
    defaultVal: String,
    keyName: String,
    placeholder: String,
    textarea: {},
    orTrue: Boolean,
  },
  data() {
    return {
      place: "",
      value: this.defaultVal || "",
    };
  },
  created() {
    this.handleChange(this.defaultVal);
  },
  computed: {},
  mounted() {
    this.initPlaceholder();
  },
  methods: {
    initPlaceholder() {
      this.place = this.placeholder || this.label;
    },
    handleChange(val) {
      this.$emit("change", this.keyName, val);
    },
  },
};
</script>

/* 
    传入参数：
    label: String, // 标题
    value: String,  // 默认值
    keyName: String
    placeholder: String,   //填写提示内容
    change函数
*/