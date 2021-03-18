<template>
  <div>
    <el-row>
      <Select
        :keyName="{ materialId: 'materialId' }"
        :label="labels.materialId"
        labelName="materialName"
        root="plant"
        :Url="`/processing/material/${processingFactoryId}`"
        @change="scope.data.change"
        @callBack="callBack"
      />
    </el-row>
    <el-row>
      <InputNumber
        keyName="materialWeight"
        :label="labels.materialWeight"
        min="0"
        :max="materialWeight"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <InputNumber
        keyName="productWeight"
        :label="labels.productWeight"
        min="0"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <Select
        :keyName="{ id: 'operatorName' }"
        :label="labels.operatorName"
        labelName="username"
        root="user"
        :Url="`getBaseMember/${baseId}`"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <Select
        :keyName="{ id: 'productId' }"
        :label="labels.productId"
        labelName="productName"
        root="plant"
        :Url="`/processingFactory/product/factoryProduct/${processingFactoryId}`"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <Input
        keyName="jobDescription"
        textarea="textarea"
        :label="labels.jobDescription"
        @change="scope.data.change"
      />
    </el-row>
    <el-row>
      <Input
        keyName="processingFactoryId"
        :defaultVal="processingFactoryId"
        :orTrue="true"
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
    return { model: new ljc(this), materialWeight: 0 };
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
  methods: {
    async callBack(val) {
      const { data: res } = await this.model.getMaterial(val);
      this.materialWeight = res.data.materialWeight;
    },
  },
};
</script>