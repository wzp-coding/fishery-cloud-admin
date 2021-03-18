/* 
  传入参数：
  label: String,  // 每一项的名称
  keyName: String,  // 所需字段的key
  labelName: {},  // 选项的展示名称
  Url: {},        // 下拉数据的接口路径
  reqFn: {},      // 接口的类型 get(默认)， post
  root: {},        // 接口的所属模块 eg: $plant
  defaultVal: {},   // 数据的默认值

  =》 方法要求
   change（key, value） // 获取所得的信息 keyName = value
    callBack(key, value)  // 返回信息给父组件
*/
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
  name: "select",
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
      this.$emit("callBack", this.keyName, val);
    },

    // 获取选项
    async getOptions() {
      const { data: res } = await this["$" + this.root][this.requiredF](
        `${this.Url}`
      );
      console.log(res.data);
      this.options = res.data;
    },
  },
};
</script>
