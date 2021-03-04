<template>
  <el-dialog
    title="修改信息"
    :visible.sync="toEditSeedInfo.dialogVisible"
    width="50%"
  >
    <el-form :rules="FormRules" :model="editInfo" label-width="120px">
      <TheLayout>
        <el-form-item label="种苗批次名称" slot="pre" prop="germchitBatchName">
          <el-input v-model="editInfo.germchitBatchName"></el-input>
        </el-form-item>
        <el-form-item label="种苗品种" slot="after" prop="germchitSpecies">
          <el-select v-model="editInfo.germchitSpecies" placeholder="请选择">
            <el-option
              v-for="item in allSeedSpecise"
              :key="item.id"
              :value="item.germchitBatchName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item label="种苗产地" slot="pre" prop="germchitOrigin">
          <el-input v-model="editInfo.germchitOrigin"></el-input>
        </el-form-item>
        <el-form-item
          label="种苗供应商"
          slot="after"
          prop="germchitSupplierName"
        >
          <el-input v-model="editInfo.germchitSupplierName"></el-input>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item label="放苗时间" slot="pre" prop="gmtModified">
          <el-date-picker
            v-model="editInfo.gmtModified"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="种苗数量" slot="after" prop="germchitAmount">
          <el-input v-model="editInfo.germchitAmount"> </el-input>
        </el-form-item>
      </TheLayout>
      <TheLayout>
        <el-form-item
          label="供应商电话"
          slot="pre"
          prop="germchitSupplierPhone"
        >
          <el-input v-model="editInfo.germchitSupplierPhone"></el-input>
        </el-form-item>
      </TheLayout>
      <!--  -->
      <el-row>
        <el-col :span="4"><span>上传质检图片</span></el-col>
        <el-col :span="19"
          ><el-upload
            action="http://106.75.154.40:9011/base/addPic"
            list-type="picture-card"
            :auto-upload="true"
            ref="upload"
            class="addBox"
          >
            <i class="el-icon-plus"></i> </el-upload
        ></el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toEditSeedInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSeedInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TheLayout from "../TheLayout";

export default {
  components: {
    TheLayout,
  },
  props: {
    toEditSeedInfo: {
      type: Object,
    },
  },
  created() {
    this.getSeedInfoSpecies();
  },
  data() {
    return {
      // 所有种苗品种信息
      allSeedSpecise: [],
      editInfo: {
        // title: "修改信息",
        // dialogVisible: false,
        id: "", //种苗ID
        germchitAmount: "", //剩余数量
        germchitOrigin: "", //产地
        germchitBatchName: "", //种苗批次
        germchitQualityInspection:
          "https://i0.hdslb.com/bfs/sycp/creative_img/202101/b6a0a2ac780098692874fbdfe4d14d70.jpg", //质检图片
        germchitSpecies: "", //种苗品种
        germchitSupplierName: "", //供应商名称
        germchitSupplierPhone: "", //供应商电话
        // gmtCreate: "", //创建时间
        gmtModified: "", //修改时间
      },
      FormRules: {
        germchitBatchName: [
          { required: true, message: "请输入批次名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "种苗苗批次名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        germchitSpecies: [
          { required: true, message: "请输入种苗品种", trigger: "blur" },
        ],
        germchitOrigin: [
          { required: true, message: "请输入种苗产地", trigger: "blur" },
        ],
        germchitSupplierName: [
          { required: true, message: "请输入供货商名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "供货商名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //获取所有种苗信息非分页
    async getSeedInfoSpecies() {
      const { data: res } = await this.$germchit.get();
      console.log(res);
      this.allSeedSpecise = res.data;
    },
    //修改
    async editSeedInfo() {
      this.editInfo.id = this.toEditSeedInfo.id;
      console.log(this.editInfo);
      this.editInfo.gmtModified = this.timeFormat(this.editInfo.gmtModified);
      const { data: res } = await this.$germchit.put("", this.editInfo);
      this.toEditSeedInfo.dialogVisible = false;
      console.log(res);
      this.$emit("fatherMethod");
      this.elMessage.success('修改种苗信息成功')
    },
    timeFormat(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
  },
};
</script>

<style>
</style>