<template>
  <el-col :xs="24" :sm="12" :lg="12">
    <el-form-item :label="label + '：'">
      <el-select
        v-model="value"
        placeholder="请选择"
        style="width: 100%"
        @input="inputChange($event)"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item[`${labelName}`]"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  props: {
    label: String,
    keyName: String,
    labelName: {},
    Url: {},
    reqFn: {},
    root: {},
    defaultVal: {},
  },
  data() {
    return {
      place: "",
      value: this.defaultVal || "",
      requiredF: this.reqFn || "get",
      options: [],
    };
  },
  created() {
    this.getOptions();
  },
  mounted() {
    this.initPlaceholder();
  },
  methods: {
    initPlaceholder() {
      this.place = this.placeholder || this.label;
    },
    inputChange(val) {
      this.$emit("change", this.keyName, val);
    },

    // 获取选项
    async getOptions() {
      console.log(this["$" + this.root]);
      const { data: res } = await this["$" + this.root][this.requiredF](
        `${this.Url}`
      );
      console.log(res.data);
      this.options = res.data;
    },
  },
};
</script>