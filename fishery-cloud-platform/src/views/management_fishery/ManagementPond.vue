 <template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>养殖管理</el-breadcrumb-item>
      <el-breadcrumb-item>池塘管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <TheCardHead>
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-receiving"></i>
            <span>池塘管理</span>
          </el-col>
          <el-col style="width: 100px; float: right">
            <el-button type="primary" @click="addPondInfo.dialogVisible = true"
            v-auth="'traceability_pond_add'"
              >添加池塘</el-button
            >
          </el-col>
        </div>
        <div class="bigBox" slot="bigBox">
          <!-- 池塘子组件 -->
          <pond
            :toPond="item"
            v-for="item in pondList"
            :key="item.pondId"
            @fatherMethod="getPondList"
          ></pond>
        </div>
      </TheCardHead>
      <ThePagination
        :toPagination="paginationInfo"
        @fatherMethod="paginationChangeEvent"
      ></ThePagination>
    </el-card>
    <!-- 添加池塘 -->
    <addPond :toDialogInfo="addPondInfo" @fatherMethods="getPondList"></addPond>

  </div>
</template>

<script>
import TheCardHead from "../../components/ccy/TheCardHead";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import ThePagination from "../../components/ccy/ThePagination";
import pond from "../../components/ccy/ManagementPond/pond";
import addPond from "../../components/ccy/ManagementPond/addPond"

export default {
  components: { TheCardHead, pond, ThePagination, TheDialogAll,addPond },
  data() {
    return {
      //全部池塘信息
      pondList: [],
      paginationInfo:{
        size:6,
        page:1,
        total:0
      },
      baseId: this.$store.state.userInfo.baseId, //基地ID
      // 添加池塘的表单数据
      addeForm: {
        //与对话框的输入数据绑定
        area: "", //池塘面积
        baseId: "1248910886228332544", //基地id
        creator: "boss", //创建者
        depth: "", //池塘深度
        name: "", //池塘名称
        type: "", //池塘类型
      },
      addPondInfo: {
        
        dialogVisible: false,
        total: 0,
        size: 3,
        page: 1,
        pondId: "",
        // sizeGroup:[3,6,9],
        addeForm: this.addeForm,
        // 添加表单的验证规则对象
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
          depth: [
            { required: true, message: "请输入池塘深度", trigger: "blur" },
          ],
          area: [
            { required: true, message: "请输入池塘面积", trigger: "blur" },
          ],
        },
        // rules:
      },
      editPondInfo: {
        title: "修改池塘信息",
        dialogVisible: false,
      },
      //投苗
      germchitList: [], // 种苗信息列表
      farmInfo: {
        title: "投苗信息面板",
        dialogVisible: false,
      },
      // 建议卡信息输入表单
      kindForm: {
        pondVolume: 0,
        pondDeep: 0,
        shrimpKindId: "",
        shrimpMethod: "",
      },
      //建议卡输入
      adviseInput: {
        title: "池塘信息输入",
        dialogVisible: false,
        // 建议卡的信息输入的验证规则对象
        kindFormRules: {
          kindName: [
            { required: true, message: "请输入虾的品种", trigger: "blur" },
          ],
          pondVolume: [
            { required: true, message: "请输入池塘面积", trigger: "blur" },
          ],
          pondDeep: [
            { required: true, message: "请输入池塘深度", trigger: "blur" },
          ],
        },
      },
    };
  },
  created() {
    this.getPondList(); //获取池塘信息
  },
  methods: {
    paginationChangeEvent(size, page){
      this.paginationInfo.size = size
      this.paginationInfo.page = page
      this.getPondList()
    },
    async getPondList() {
      console.log("获取池塘信息");
      const { data: res } = await this.$pondController.get(
        `getInfo/${this.baseId}/${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        console.log(res);
        this.pondList = res.data.records;
        this.addPondInfo.total = res.data.total;
        this.paginationInfo.total = res.data.total
      } else {
        console.log("查询池塘信息失败");
      }
    },
    eventRefresh() {
      this.getPondList(this.addPondInfo.size, 1);
    },
    //创建池塘
    async createPond() {
      console.log(this.addeForm);
      this.addPondInfo.baseId = "1248910886228332544";
      const { data: res } = await this.$pondController.post(
        `create}`,
        this.addeForm
      );
      if (res.statusCode !== 20000) {
        console.log("请求创建池塘失败");
      } else {
        console.log(res);
        this.addPondInfo.dialogVisible = !this.addPondInfo.dialogVisible;
        this.getPondList(this.addPondInfo.size, this.addPondInfo.page);
        this.reRender = true;
        this.elMessage.success("添加池塘成功!!");
      }
      console.log(res);
    },
    addPondEvent() {
      //确认添加池塘事件
      console.log("创建池塘事件");
      this.$refs.addeFormRef.dialogVerification();
    },

    //触发子组件的表单验证表单验证
    verification() {
      this.$refs.addeFormRef.dialogVerification();
      // if (this.$refs.addeFormRef.dialogVerification()) {
      //   console.log("验证通过");
      //   return true
      // } else {
      //   console.log("验证不通过");
      //   return false;
      // }
    },
    parentMehod() {
      this.createPond();
    },
    // 监听捕捞对话框的关闭事件,关闭时对表单进行重置
    catchDialogClosed() {
      this.$refs.catchFormRef.resetFields();
    },

  },
};
</script>
<style lang="less">
.bigBox {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
.bigBox p {
  color: #636e7b;
  margin: 5px 0;
}
.infoBox {
  padding-left: 20px;
}
.imgBox {
  width: 120px;
  height: 120px;
}
.imgBox img {
  border: 1px solid rgb(175, 172, 172);
  padding: 5px;
  border-radius: 100%;
  width: 100%;
  height: 100%;
}
.pondBody {
  border: 1px solid rgb(179, 179, 179);
  width: 31.5%;
  height: 200px;
  margin-left: 10px;
  border-radius: 4px;
}
.btnBox {
  border: 1px solid black;
  height: 10px;
  width: 100%;
}
.btnBox .blank {
  width: 120px;
}
.btnBox .btnGround {
  padding-left: 50px;
}
.dididi {
  border-collapse: collapse;
  border: 1px solid #c6e2ff;
  border-radius: 4px;
  width: 95%;
  td,
  th {
    border: 1px solid #b4b5b6;
    padding: 10px;
    text-align: center;
  }
  th {
    color: rgb(116, 114, 114);
  }
}
</style>
