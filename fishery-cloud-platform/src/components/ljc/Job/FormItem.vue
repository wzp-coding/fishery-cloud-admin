<template>
  <div>
    <el-row>
      <Input
        keyName="jobDescription"
        textarea="textarea"
        :label="labels.jobDescription"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <InputNumber
        keyName="materialWeight"
        :label="labels.materialWeight"
        min="0"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <Select
        keyName="operatorName"
        :label="labels.operatorName"
        labelName="username"
        root="user"
        :Url="`getBaseMember/${baseId}`"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <Select
        keyName="materialId"
        :label="labels.materialId"
        labelName="materialName"
        root="plant"
        :Url="`/processing/material/${processingFactoryId}`"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <Select
        keyName="productId"
        :label="labels.productId"
        labelName="productName"
        root="plant"
        :Url="`/processingFactory/product/factoryProduct/${processingFactoryId}`"
        @change="scope.data.change"
      />
    </el-row>   
  </div>
</template>

<script>
import ljc from "./Job";
import Input from "../public/Form/input";
import InputNumber from "../public/Form/inputNumber";
import Select from "../public/Form/select";

export default {
  components: {
    Input,
    InputNumber,
    Select,
  },
  props: {
    scope: {},
  },
  data() {
    return { model: new ljc(this) };
  },
  computed: {
    // 标签
    labels() {
      return this.model.labels;
    },

    // 加工厂id
    processingFactoryId() {
      return this.$route.query.ID;
    },

    // 基地
    baseId() {
      return this.$store.state.userInfo.baseId;
    },
  },
};
</script>