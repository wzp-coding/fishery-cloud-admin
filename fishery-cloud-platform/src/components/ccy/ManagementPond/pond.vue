<template>
  <div class="main">
    <el-row>
      <el-col :span="24" class="infoTitle">
        <div class="pondName">{{ toPond.name }}</div>
        <div>
          <el-popover
            placement="bottom-start"
            title="种苗信息"
            width="320"
            trigger="hover"
            @show="searchGermchitInfo(toPond.germchitId)"
          >
            <el-form
              v-if="toPond.germchitId"
              label-width="100px"
              v-model="germchitDetail"
              font-size="14px"
            >
              <el-form-item label="种苗批次名称">
                <el-input
                  v-model="germchitDetail.germchitBatchName"
                  disabled
                  style="color: black"
                ></el-input>
              </el-form-item>
              <el-form-item label="种苗品种">
                <el-input
                  v-model="germchitDetail.germchitSpecies"
                  disabled
                  style="color: black"
                ></el-input>
              </el-form-item>
              <el-form-item label="种苗产地">
                <el-input
                  v-model="germchitDetail.germchitOrigin"
                  disabled
                  style="color: black"
                ></el-input>
              </el-form-item>
              <el-form-item label="种苗供应商">
                <el-input
                  v-model="germchitDetail.germchitSupplierName"
                  disabled
                  style="color: black"
                ></el-input>
              </el-form-item>
            </el-form>
            <el-button
              size="mini"
              slot="reference"
              v-if="toPond.germchitId != null"
              v-auth="'traceability_pond'"
              >更多</el-button
            >
          </el-popover>
        </div>
      </el-col>
    </el-row>
    <el-row class="pondInfo">
      <el-col :span="8">
        <div class="imgBox">
          <img src="../../../assets/images/pond.jpg" alt="" />
        </div>
      </el-col>
      <el-col :span="15">
        <p>池塘面积/m²：{{ toPond.area }}</p>
        <p>池塘深度/m：{{ toPond.depth }}</p>
        <p>池塘类型：{{ toPond.type }}</p>
        <p v-show="toPond.inputNum && toPond.germchitId">
          投放尾数/尾：{{ toPond.inputNum }}
        </p>
        <p v-show="toPond.seedingTime && toPond.germchitId">
          投苗时间：{{ toPond.seedingTime }}
        </p>
        <p v-show="toPond.catchTime && toPond.germchitId">
          捕捞时间：{{ toPond.catchTime }}
        </p>
        <p v-show="!toPond.germchitId">养殖信息：未投放种苗</p>
        <p v-if="toPond.germchitId">
          捕捞状态：{{ toPond.catchStatus === 0 ? "未捕捞" : "已捕捞" }}
        </p>
        <p><el-tooltip
          class="item"
          effect="dark"
          content="点击查询当前投喂信息"
          placement="top-start"
          v-if="toPond.germchitId"
        >
          <span @click="feedRecord.dialogVisible1 = true" style="margin-right:18px">喂养记录</span>
        </el-tooltip>
        <!--  -->
        <el-tooltip
          class="item"
          effect="dark"
          content="点击查询历史投喂"
          placement="top-start"
        >
          <span @click="feedRecord.dialogVisible2 = true">历史喂养记录</span>
        </el-tooltip></p>
        
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="11" class="buttons">
        <div>
          <!-- 有投放的才有捕捞选项 -->
          <el-tooltip
            effect="dark"
            content="捕捞"
            placement="left"
            :enterable="false"
            v-if="toPond.germchitId"
          >
            <el-button
              type="success"
              icon="el-icon-wind-power"
              size="mini"
              @click="catchEvent()"
              v-auth="'traceability_pond'"
            ></el-button>
          </el-tooltip>
          <!-- 有投放的才有投料选项 -->
          <el-tooltip
            effect="dark"
            content="投料"
            placement="top"
            v-if="toPond.germchitId"
            :enterable="false"
          >
            <el-button
              icon="el-icon-caret-bottom"
              type="warning"
              size="mini"
              @click="toFeedInfo.dialogVisible = true"
              v-auth="'traceability_pond'"
            ></el-button>
          </el-tooltip>
          <!-- 投苗过的不可以再投 -->
          <el-tooltip
            effect="dark"
            content="投苗"
            placement="top"
            :enterable="false"
            v-if="!toPond.germchitId"
          >
            <el-button
              type="success"
              icon="el-icon-arrow-down"
              size="mini"
              @click="toDialogFarmInfo.dialogVisible = true"
              v-auth="'traceability_pond'"
            ></el-button>
          </el-tooltip>
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="info"
            @click="toDialogEdit.dialogVisible = true"
            v-auth="'traceability_pond_update'"
          ></el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            @click="deletePond(toPond.pondId)"
            v-auth="'traceability_pond_delete'"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 修改池塘信息对话框 -->
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
    <!-- 基地投苗 -->
    <TheDialogAll :toDialogInfo="toDialogFarmInfo" :FormInfo="farmInfo">
      <el-form-item label="投放种苗" label-width="130px">
        <el-select
          v-model="germchitName"
          placeholder="请选择投放种苗"
          @change="selectEvent"
        >
          <el-option
            v-for="(item, index) in germchitList"
            :key="index"
            :value="index"
            :label="item.germchitSpecies"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="种苗库存量" prop="max" label-width="130px">
        <el-input v-model="max" style="60%" disabled></el-input>
      </el-form-item>
      <el-form-item label="投放量" prop="inputNum" label-width="130px">
        <el-input-number
          v-model="farmInfo.inputNum"
          controls-position="right"
          :min="1"
          :max="max"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="投放质量(kg)" prop="inputWeight" label-width="130px">
        <el-input-number
          v-model="farmInfo.inputWeight"
          controls-position="right"
          :precision="2"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toDialogFarmInfo.dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="farmInfoEvent">确 定</el-button>
      </span>
    </TheDialogAll>
    <!-- 基地投料 -->
    <feedPond :toDialogInfo="toFeedInfo"></feedPond>
    <!-- 池塘捕捞 -->
    <catching
      :toDialogInfo="toCatchingInfo"
      @fatherMethod="RefreshPond"
    ></catching>
    <!-- 捕捞记录 -->
    <feedHistory
      :feedRecord="feedRecord"
      @fatherMethods="feedHistoryEvent"
    ></feedHistory>
  </div>
</template>

<script>
import TheDialogAll from "../../ccy/public/TheDialogAll";
import feedPond from "../ManagementPond/feedPond";
import catching from "../ManagementPond/catching";
import feedHistory from "../ManagementPond/feedHistory";
export default {
  components: {
    TheDialogAll,
    feedPond,
    catching,
    feedHistory,
  },
  props: {
    toPond: {
      type: Object,
    },
  },
  data() {
    return {
      baseId: this.$store.state.userInfo.baseId, //基地ID
      toDialogEdit: {
        //传入修改池塘信息对话框
        title: "修改池塘信息",
        dialogVisible: false, //控制对话框隐藏
        addeForm: this.editInfo,
        width: "30%",
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
      max: null,
      germchitName: "",
      toFarmInfo: {
        dialogVisible: false,
      },
      germchitDetail: [],
      editInfo: {
        id: this.toPond.pondId,
        baseId: this.$store.state.userInfo.baseId,
        name: "",
        area: "",
        depth: 0,
        type: "",
        creator: "boss",
      },
      germchitList: [], // 种苗信息列表
      toFarmDialogInfo: {
        dialogVisible: false,
      },
      farmInfo: {
        germchitId: "",
        inputNum: 1, //投入量
        pondId: this.toPond.pondId,
        inputWeight: "",
        baseId: this.$store.state.userInfo.baseId,
      },
      toDialogFarmInfo: {
        title: "投苗信息面板",
        dialogVisible: false,
        germchitId: "", //投入品ID
        inputNum: 1, //投入量
        width: "30%",
        FormRules: {
          inputWeight: [
            { required: true, message: "请输入投苗质量", trigger: "blur" },
          ],
          inputNum: [
            { required: true, message: "请输入投放尾数", trigger: "blur" },
          ],
        },
      },
      // 投料
      toFeedInfo: {
        pondId: this.toPond.pondId,
        dialogVisible: false,
        farmingId: this.toPond.farmingId,
      },
      //捕捞
      toCatchingInfo: {
        pondId: this.toPond.pondId,
        dialogVisible: false,
        max: 0,
      },
      feedRecord: {
        pondId: this.toPond.pondId,
        farmingId: this.toPond.farmingId,
        dialogVisible1: false,
        dialogVisible2: false,
      },
    };
  },
  created() {
    this.getGermchitList(); //获取池塘信息
  },
  methods: {
    async editPondInfo() {
      this.toDialogEdit.dialogVisible = false;
      console.log(this.editInfo);
      const { data: res } = await this.$pondController.put(
        `?id=${this.editInfo.id}&baseId=${this.editInfo.baseId}&name=${this.editInfo.name}&area=${this.editInfo.area}&depth=${this.editInfo.depth}&type=${this.editInfo.type}`
      );
      if (res.statusCode === 20000) {
        console.log(res);
        this.$emit("fatherMethod");
        this.elMessage.success("修改成功");
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
    // 获取基地种苗信息列表
    async getGermchitList() {
      const { data: res } = await this.$germchitManagerController.get(
        `${this.baseId}`
      );
      // console.log(res);
      if (res.statusCode === 20000) {
        this.germchitList = res.data;
      }
    },
    //删除池塘
    async deletePond(pondId) {
      const confirmResult = await this.elConfirm(
        "此操作将删除该池塘，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$pondController.delete(`${pondId}`);
      if (res.statusCode === 20000) {
        console.log(res);
        this.elMessage.success("删除池塘成功！！");
        this.$emit("fatherMethod");
      } else {
        this.elMessage.error("删除池塘失败");
      }
    },
    async catchEvent() {
      this.toCatchingInfo.dialogVisible = true;
      const { data: res } = await this.$pondController.get(
        `getOneInfo/${this.toCatchingInfo.pondId}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.toCatchingInfo.max = res.data.surplusWeight;
        console.log(this.toCatchingInfo.max);
      }
    },
    async farmInfoEvent() {
      console.log(this.germchitList);
      console.log(this.farmInfo);
      console.log(this.max);
      if (this.max < this.farmInfo.inputNum) {
        this.elMessage.info("该种苗剩余量为" + this.max);
        return;
      }
      const { data: res } = await this.$pondController.post(
        `/farming`,
        this.farmInfo
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.elMessage.success("投苗成功！！");
        this.$emit("fatherMethod");
        this.toDialogFarmInfo.dialogVisible = false;
      }
      console.log(res);
    },
    async searchGermchitInfo(germchitId) {
      const { data: res } = await this.$germchit.get(`${germchitId}`);
      if (res.statusCode === 20000) {
        this.germchitDetail = res.data;
      }
    },
    RefreshPond() {
      this.$emit("fatherMethod");
    },
    selectEvent(res) {
      this.max = this.germchitList[res].germchitSurplusNumber;
      this.farmInfo.germchitId = this.germchitList[res].id;
      this.germchitName = this.germchitList[res].germchitSpecies;
    },
    feedHistoryEvent() {
      this.feedRecord.dialogVisible1 = false;
      this.feedRecord.dialogVisible2 = false;
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
  width: 31%;
  padding: 5px;
  margin: 0 0 10px 10px;
  border-radius: 4px;
  height: 260px;
  position: relative;
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
  width: 100px;
  height: 100px;
  .imgBox {
    border: 1px solid rgb(175, 172, 172);
    padding: 5px;
    border-radius: 100%;
    width: 100%;
    height: 100%;
  }
}
.pondInfo {
  height: 180px;
}
.buttons {
  bottom: 1px;
  right: 5px;
}
</style>
