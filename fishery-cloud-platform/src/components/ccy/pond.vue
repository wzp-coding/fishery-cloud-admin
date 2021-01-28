<template>
  <div class="main">
    <el-row>
      <el-col :span="24" class="infoTitle">
        <div class="pondName">{{ toPond.name }}</div>
        <div><el-button size="mini" plain type="primary" v-if="toPond.seedingTime">更多</el-button></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="imgBox">
          <img src="../../assets/pond.jpg" alt="" />
        </div>
      </el-col>
      <el-col :span="15">
        <!-- <p>池塘名称：</p> -->
        <p>池塘面积/m²：{{ toPond.area }}</p>
        <p>池塘深度/m：{{ toPond.depth }}</p>
        <p>池塘类型：{{ toPond.type }}</p>
        <p v-show="toPond.inputNum">投放尾数/尾：{{ toPond.inputNum }}</p>
        <p v-show="toPond.seedingTime">投苗时间：{{ toPond.seedingTime }}</p>
        <p v-show="toPond.catchTime">上次捕捞时间：{{ toPond.catchTime }}</p>
        <p>
          捕捞状态：{{
            toPond.catchStatus === 0 || !toPond.catchStatus
              ? "未捕捞"
              : "已捕捞"
          }}
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="width: 60%; margin-left: 46%">
          <!-- 有投放的才有捕捞选项 -->
          <el-tooltip
            effect="dark"
            content="捕捞"
            placement="left"
            :enterable="false"
            v-if="toPond.seedingTime"
          >
            <el-button
              type="success"
              icon="el-icon-wind-power"
              size="mini"
            ></el-button>
          </el-tooltip>
          <!-- 有投放的才有投料选项 -->
          <el-tooltip
            effect="dark"
            content="投料"
            placement="top"
            v-if="toPond.seedingTime"
            :enterable="false"
          >
            <el-button
              icon="el-icon-caret-bottom"
              type="warning"
              size="mini"
            ></el-button>
          </el-tooltip>
          <!-- 投苗过的不可以再投 -->
          <el-tooltip
            effect="dark"
            content="投苗"
            v-if="!toPond.seedingTime"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="success"
              icon="el-icon-arrow-down"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="info"
            @click="toDialogEdit.dialogVisible = true"
          ></el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="deletePond(toPond.pondId)"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <TheDialogAll
      :toDialogInfo="toDialogEdit"
      ref="addeFormRef"
      :FormInfo="editInfo"
    >
      <el-form-item label="池塘名称" prop="name">
        <el-input v-model="editInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="池塘类型" prop="type">
        <el-input v-model="editInfo.type"></el-input>
      </el-form-item>
      <el-form-item label="池塘深度" prop="depth">
        <el-input-number
          v-model="editInfo.depth"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="池塘面积m²" prop="area">
        <el-input-number
          v-model="editInfo.area"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-row :gutter="80" class="elrow">
          <el-col :span="5" :offset="9">
            <el-button @click="toDialogEdit.dialogVisible = false"
              >取 消</el-button
            ></el-col
          >
          <el-col :span="5"
            ><el-button type="primary" @click="editPondInfo"
              >确 定</el-button
            ></el-col
          >
        </el-row>
      </span>
    </TheDialogAll>
    <TheDialogAll :toDialogInfo="farmInfo"> </TheDialogAll>
  </div>
</template>

<script>
import TheDialogAll from "../ccy/TheDialogAll";
export default {
  components: {
    TheDialogAll,
  },
  props: {
    toPond: {
      type: [Object],
      area: String,
      depth: String,
      type: String,
      inputNum: String, //投放数量
      seedingTime: String, //苗时间
      catchTime: String, //上次捕捞时间
      catchStatus: Number, //捕捞状态
      name: String,
      creator: String,
      pondId: String,
    }
  },
  data() {
    return {
      baseId: "1248910886228332544", //基地ID
      toDialogEdit: {
        //传入修改池塘信息对话框
        title: "修改池塘信息",
        dialogVisible: false, //控制对话框隐藏
        addeForm: this.editInfo,
        // 修改表单的验证规则对象
        FormRules: {
          name: [
            { required: true, message: "请输入池塘名称", trigger: "blur" },
            {
              min: 2,
              max: 10,
              message: "池塘名称的长度在2~10个字符之间",
              trigger: "blur",
            },
          ],
          type: [
            { required: true, message: "请输入池塘类型", trigger: "blur" },
            {
              min: 2,
              max: 10,
              message: "池塘类型的长度在2~10个字符之间",
              trigger: "blur",
            },
          ],
          area: [
            { required: true, message: "请输入池塘面积", trigger: "blur" },
          ],
          depth: [
            { required: true, message: "请输入池塘深度", trigger: "blur" },
          ],
          deliveryStatus: [
            { required: true, message: "请输入投放状态", trigger: "blur" },
          ],
        },
      },
      editInfo: {
        id: this.toPond.pondId,
        baseId: "1248910886228332544",
        name: "",
        area: "",
        depth: 0,
        type: "",
        creator: "boss",
      },
      germchitList: [], // 种苗信息列表
      farmInfo: {
        title: "投苗信息面板",
        dialogVisible: false,
        FormRules: {
          shrimpId: [
            { required: true, message: "请输入虾苗批次名称", trigger: "blur" },
          ],
          inputNum: [
            { required: true, message: "请输入投放尾数", trigger: "blur" },
          ],
        },
      },
    };
  },
  created() {
    // this.getPondList(3,1);  //获取池塘信息
    this.getGermchitList();
  },
  methods: {
    async getPondList(size, page) {
      const { data: res } = await this.$pondController.get(
        `getInfo/${this.baseId}/${size}/${page}`
      );
      if (res.statusCode !== 2000) {
        console.log('获取池塘信息');
        console.log(res);
        this.addPondInfo.total = res.data.total;
      } else {
        console.log("查询池塘信息失败");
      }
    },

    async editPondInfo() {
      // this.$refs.addeFormRef.dialogVerification()
      this.toDialogEdit.dialogVisible = false;
      console.log(this.editInfo);
      const { data: res } = await this.$pondController.put(
        `?id=${this.editInfo.id}&baseId=${this.editInfo.baseId}&name=${this.editInfo.name}&area=${this.editInfo.area}&depth=${this.editInfo.depth}&type=${this.editInfo.type}`
      );
      if (res.statusCode === 20000) {
        console.log(res);
        this.$message.success("修改成功");
      } else {
        console.log("修改失败");
      }
    },
    //触发子组件的表单验证表单验证
    verification() {
      this.$refs.addeFormRef.dialogVerification();
    },
    parentMehod() {
      this.editPondInfo();
    },
    // 获取种苗信息列表
    async getGermchitList() {
      const { data: res } = await this.$germchitManagerController.get(
        `${this.baseId}`
      );
      console.log(res);
    },
    //删除池塘
    async deletePond(pondId) {
      const { data: res } = await this.$pondController.delete(`${pondId}`);
      if (res.statusCode === 20000) {
        console.log(res);
        this.$message.success("删除池塘成功！！");
        this.$emit('getPondList')
      } else {
        this.$message.error("删除池塘失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
}
.main {
  border: 1px solid rgb(179, 179, 179);
  width: 31.5%;
  padding: 5px;
  margin: 0 0 10px 10px;
  border-radius: 4px;
}
.el-row {
  margin-bottom: 0;
}
p {
  color: #636e7b;
  padding-left: 9px;
  line-height: 17px;
}
el-col {
  border: 1px solid rgb(26, 25, 25);
  height: 100px;
}
.infoTitle {
  display: flex;
  justify-content: space-between;
  .pondName {
    color: #000;
    font-size: 20px;
  }
}
.imgBox {
  width: 120px;
  height: 120px;
  .imgBox {
    border: 1px solid rgb(175, 172, 172);
    padding: 5px;
    border-radius: 100%;
    width: 100%;
    height: 100%;
  }
}
</style>
