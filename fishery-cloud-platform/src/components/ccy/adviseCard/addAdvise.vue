<template>
  <div>
    <el-dialog
      :visible.sync="toDialogInfo.dialogVisible"
      title="添加养殖建议"
      width="50%"
    >
      <el-form :model="addInfo" label-width="115px" :rules="rules">
        <TheDialogLayout>
          <el-form-item prop="ammoniaValue" label="氨氮值" slot="pre">
            <el-input v-model="addInfo.ammoniaValue"></el-input>
          </el-form-item>
          <el-form-item
            prop="dissolvedOxygenValue"
            label="溶解氧量"
            slot="after"
          >
            <el-input v-model="addInfo.dissolvedOxygenValue"></el-input>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-form-item prop="maxDensity" label="最大养殖密度" slot="pre">
            <el-input v-model="addInfo.maxDensity"></el-input>
          </el-form-item>
          <el-form-item prop="minDensity" label="最小养殖密度" slot="after">
            <el-input v-model="addInfo.minDensity"></el-input>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-form-item prop="name" label="品种名称" slot="pre">
            <el-input v-model="addInfo.name"></el-input>
          </el-form-item>
          <el-form-item prop="ph" label="适宜酸碱度" slot="after">
            <el-input v-model="addInfo.ph"></el-input>
          </el-form-item>
        </TheDialogLayout>
        <TheDialogLayout>
          <el-form-item prop="salinity" label="适宜盐含量" slot="pre">
            <el-input v-model="addInfo.salinity"></el-input>
          </el-form-item>
          <el-form-item prop="waterTemperature" label="适宜温度" slot="after">
            <el-input v-model="addInfo.waterTemperature"></el-input>
          </el-form-item>
        </TheDialogLayout>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toDialogInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TheDialogLayout from "../../ccy/public/TheDialogLayout";
export default {
  components: {
    TheDialogLayout,
  },
  props: {
    toDialogInfo: {
      type: Object,
    },
  },
  data() {
    return {
      addInfo: {
        ammoniaValue: "",
        dissolvedOxygenValue: "",
        maxDensity: '',
        minDensity: '',
        name: "",
        ph: "",
        salinity: "",
        waterTemperature: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入品种", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "品种名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        ammoniaValue: [
          { required: true, message: "请输入适宜氨氮值", trigger: "blur" },
      
        ],
        waterTemperature: [
          { required: true, message: "请输入适宜温度", trigger: "blur" },
         
        ],
        minDensity: [
          { required: true, message: "请输入最小养殖密度", trigger: "blur" },
        ],
        maxDensity: [
          { required: true, message: "请输入最大养殖密度", trigger: "blur" },
        ],
        dissolvedOxygenValue: [
          { required: true, message: "请输入适宜溶解氧量", trigger: "blur" },
        ],
        salinity: [
          { required: true, message: "请输入适宜盐含量", trigger: "blur" },
        ],
        ph: [
          { required: true, message: "请输入适宜酸碱度", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async addEvent() {
      const { data: res } = await this.$advise.post("", this.addInfo);
      if (res.statusCode === 20000) {
        this.elMessage.success("添加养殖建议成功");
        this.toDialogInfo.dialogVisible = false;
        this.$emit("fatherMethods");
      }
    },
  },
};
</script>

<style>
</style>