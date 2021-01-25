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
              >添加池塘</el-button
            >
          </el-col>
          <el-col style="width: 120px; float: right">
            <el-button type="success">养殖建议卡</el-button>
          </el-col>
        </div>
        <div class="bigBox" slot="bigBox">
          <!-- 池塘子组件 -->
          <pond></pond>
        </div>
      </TheCardHead>
      <ThePagination></ThePagination>
    </el-card>
    <!-- @click="dialogFormVisible = false" -->
    <TheDialogAll :toDialogInfo="addPondInfo" ref="addeFormRef" :addFormInfo="addeForm">
        <el-form-item label="池塘名称" prop="name">
          <el-input v-model="addeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="池塘类型" prop="type">
          <el-input v-model="addeForm.type"></el-input>
        </el-form-item>
        <el-form-item label="池塘面积/m²" prop="area">
          <el-input-number
            v-model="addeForm.area"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="池塘深度/m" prop="depth">
          <el-input-number
            v-model="addeForm.depth"
            controls-position="right"
            :min="1"
          ></el-input-number>
        </el-form-item>
      <span slot="footer">
        <el-row :gutter="80" class="elrow">
          <el-col :span="5" :offset="9">
            <el-button @click="addPondInfo.dialogVisible = false"
              >取 消</el-button
            ></el-col
          >
          <el-col :span="5"
            ><el-button type="primary" @click="addPondEvent"
              >确 定</el-button
            ></el-col
          >
        </el-row>
      </span>
    </TheDialogAll>
    <!-- <TheDialogAll></TheDialogAll> -->
  </div>
</template>

<script>
import TheCardHead from "../components/ccy/TheCardHead";
import TheDialogAll from "../components/ccy/TheDialogAll";
import ThePagination from "../components/ccy/ThePagination";
import pond from "../components/ccy/pond";
export default {
  components: { TheCardHead, pond, ThePagination, TheDialogAll },
  data() {
    return {
      // 添加池塘的表单数据
      addeForm: {
        id:'',          //池塘
        baseId: "",     //基地id
        name: "",       //池塘名称
        area: "",       //池塘面积
        depth: "",      //池塘深度
        type: "",       //池塘类型
      },
      addPondInfo: {
        title: "添加池塘",
        dialogVisible: false,
        addeForm:this.addeForm,
        // 添加表单的验证规则对象
        addeFormRules: {
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
    };
  },
  // data() {
  //   return {
  //     // token: window.localStorage.getItem("token"),
  //     // 虾管理信息，用于展示
  //     shrimpInfo: [],
  //     // 基地编码
  //     baseId: this.defines.baseId,
  //     // 用于控制分页的当前页码和条数
  //     pageInfo: {
  //       // 当前页码
  //       pagenum: 1,
  //       // 每页显示条数
  //       pagesize: 6,
  //     },
  //     // 分类信息
  //     valueType: [],
  //     categoryOptions: [],
  //     // 总条数
  //     total: 0,
  //     // 对应id虾苗总数
  //     remainNumber: 0,
  //     // 目前虾苗量
  //     constNum: "",
  //     // 保存虾苗品种
  //     shrimpSpecies: "",
  //     // 保存投放状态选项·
  //     options: [
  //       {
  //         value: "0",
  //         label: "未投放",
  //       },
  //       {
  //         value: "1",
  //         label: "已投放",
  //       },
  //     ],
  //     // 保存捕捞规格
  //     options3: [
  //       {
  //         value: "60以上",
  //       },
  //       {
  //         value: "50~60",
  //       },
  //       {
  //         value: "30~40",
  //       },
  //       {
  //         value: "20~10",
  //       },
  //       {
  //         value: "10~0",
  //       },
  //     ],
  //     // 保存虾的养殖方式
  //     options4: [
  //       {
  //         value: "工厂流水养殖",
  //       },
  //       {
  //         value: "外塘传统养殖",
  //       },
  //       {
  //         value: "大棚温室养殖",
  //       },
  //       {
  //         value: "稻虾套养模式",
  //       },
  //     ],
  //     // 池塘列表
  //     pondList: [],
  //     // 虾苗品种列表
  //     ShrimpSpeciesList: [],
  //     // 用于获取虾苗编号
  //     shrimpManagement: [],
  //     // 用于获取农资名称
  //     suppliesName: [],
  //     // 用于存放人员信息
  //     personInfoList: [],
  //     // 添加池塘的表单数据
  //     addeForm: {
  //       pondName: "",
  //       pondVolume: "",
  //       depth: "",
  //       pondType: "",
  //       baseId: "",
  //     },
  //     // 投苗表单数据
  //     drogForm: {
  //       id: "",
  //       shrimpId: "",
  //       baseId: "",
  //       inputNum: "",
  //       createDate: "",
  //       species: "",
  //     },
  //     // 投料表单数据
  //     farmForm: {
  //       suppliesName: "",
  //       applyTime: "",
  //       pondId: "",
  //       applicator: "",
  //       applyType: "",
  //       deliveryVolume: "",
  //       suppliesInfoId: "",
  //     },
  //     // 捕捞表单数据
  //     catchForm: {
  //       id: "",
  //       shrimpId: "",
  //       catchDate: "",
  //       people: "",
  //       yield: "",
  //       specification: "",
  //     },
  //     // 查询到的池塘信息对象，用于修改池塘信息
  //     editForm: {
  //       id: "",
  //       pondName: "",
  //       pondType: "",
  //       depth: "",
  //       baseId: "",
  //       shrimpId: "",
  //       pondVolume: 0,
  //       inputNum: 0,
  //       createDate: null,
  //       deliveryStatus: "",
  //       catchDate: null,
  //     },
  //     // 建议卡信息输入表单
  //     kindForm: {
  //       pondVolume: 0,
  //       pondDeep: 0,
  //       shrimpKindId: "",
  //       shrimpMethod: "",
  //     },
  //     // 查询到的建议卡信息
  //     suggest: {
  //       id: "string",
  //       kindName: "string",
  //       minDensity: "string",
  //       maxDensity: "string",
  //       waterTemperature: 0,
  //       salinity: 0,
  //       ph: 0,
  //       ammoniaValue: 0,
  //       dissolvedOxygen: 0,
  //       pondVolume: 0,
  //       pondDeep: 0,
  //     },
  //     // 控制添加池塘面板的显示与隐藏
  //     addDialogVisible: false,
  //     // 控制修改池塘面板的显示和隐藏
  //     aditDialogVisible: false,
  //     // 控制投苗面板的显示和隐藏
  //     drogDialogVisible: false,
  //     // 控制投料面板的显示和隐藏
  //     farmDialogVisible: false,
  //     // 控制捕捞面板的显示和隐藏
  //     catchDialogVisible: false,
  //     // 控制建议卡:池塘信息输入面板的显示和隐藏
  //     kindDialogVisible: false,
  //     // 控制建议卡面板的显示和隐藏
  //     suggestDialogVisible: false,
  //     // 添加表单的验证规则对象
  //     addeFormRules: {
  //       pondName: [
  //         { required: true, message: "请输入池塘名称", trigger: "blur" },
  //         {
  //           min: 2,
  //           max: 10,
  //           message: "池塘名称的长度在2~10个字符之间",
  //           trigger: "blur",
  //         },
  //       ],
  //       pondType: [
  //         { required: true, message: "请输入池塘类型", trigger: "blur" },
  //         {
  //           min: 2,
  //           max: 10,
  //           message: "池塘类型的长度在2~10个字符之间",
  //           trigger: "blur",
  //         },
  //       ],
  //       depth: [{ required: true, message: "请输入池塘深度", trigger: "blur" }],
  //       pondVolume: [
  //         { required: true, message: "请输入池塘面积", trigger: "blur" },
  //       ],
  //     },
  //     // 投苗表单的验证规则对象
  //     drogFormRules: {
  //       shrimpId: [
  //         { required: true, message: "请输入虾苗批次名称", trigger: "blur" },
  //       ],
  //       inputNum: [
  //         { required: true, message: "请输入投放尾数", trigger: "blur" },
  //       ],
  //     },
  //     // 投料表单的验证规则对象
  //     farmFormRules: {
  //       suppliesInfoId: [
  //         { required: true, message: "请输入农资名称", trigger: "blur" },
  //       ],
  //       applicator: [
  //         { required: true, message: "请输入操作人", trigger: "blur" },
  //       ],
  //       applyType: [
  //         { required: true, message: "请输入操作类别", trigger: "blur" },
  //       ],
  //       deliveryVolume: [
  //         { required: true, message: "请输入投放量", trigger: "blur" },
  //       ],
  //     },
  //     // 捕捞表单的验证规则对象
  //     catchFormRules: {
  //       people: [{ required: true, message: "请输入操作员", trigger: "blur" }],
  //       specification: [
  //         { required: true, message: "请输入捕捞规格", trigger: "blur" },
  //       ],
  //       yield: [{ required: true, message: "请输入产量", trigger: "blur" }],
  //     },
  //     // 修改表单的验证规则对象
  //     editFormRules: {
  //       pondName: [
  //         { required: true, message: "请输入池塘名称", trigger: "blur" },
  //         {
  //           min: 2,
  //           max: 10,
  //           message: "池塘名称的长度在2~10个字符之间",
  //           trigger: "blur",
  //         },
  //       ],
  //       pondType: [
  //         { required: true, message: "请输入池塘类型", trigger: "blur" },
  //         {
  //           min: 2,
  //           max: 10,
  //           message: "池塘类型的长度在2~10个字符之间",
  //           trigger: "blur",
  //         },
  //       ],
  //       pondVolume: [
  //         { required: true, message: "请输入池塘面积", trigger: "blur" },
  //       ],
  //       depth: [{ required: true, message: "请输入池塘深度", trigger: "blur" }],
  //       deliveryStatus: [
  //         { required: true, message: "请输入投放状态", trigger: "blur" },
  //       ],
  //     },
  //     // 建议卡的信息输入的验证规则对象
  //     kindFormRules: {
  //       kindName: [
  //         { required: true, message: "请输入虾的品种", trigger: "blur" },
  //       ],
  //       pondVolume: [
  //         { required: true, message: "请输入池塘面积", trigger: "blur" },
  //       ],
  //       pondDeep: [
  //         { required: true, message: "请输入池塘深度", trigger: "blur" },
  //       ],
  //     },
  //   };
  // },
  created() {
    this.getPondList();  //获取池塘信息
    // this.createPond();
  },
  methods: {
    async getPondList() {
      const { data: res } = await this.$pondController.get(
        `getInfo/1/3/1`
      );
      if (res.statusCode !== 2000) {
        console.log(res);
      } else {
        console.log("查询池塘信息失败");
      }
    },
    //创建池塘
    async createPond() {
      this.addPondInfo.baseId = 1;
      const { data: res } = await this.$pondController.post(`/create?pond=${this.addeForm}`);
      if (res.status !== 400) {
        console.log("请求创建池塘失败");
      } else {
        console.log(res);
        this.addPondInfo.dialogVisible = !this.addPondInfo.dialogVisible;
        this.$message.success('添加池塘成功!!')
      }
    },
    addPondEvent() {    //确认添加池塘事件
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
