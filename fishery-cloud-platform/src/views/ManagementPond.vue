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
            <el-button type="primary">添加池塘</el-button>
          </el-col>
          <el-col style="width: 120px; float: right">
            <el-button type="success">养殖建议卡</el-button>
          </el-col>
        </div>
        <div class="bigBox" slot="bigBox">
          <!-- 包含整每一个池塘的盒子 -->
          <div style="padding: 5px; margin-bottom: 10px" class="pondBody">
            <table>
              <tbody>
                <tr>
                  <td
                    style="
                      height: 30px;
                      display: flex;
                      justify-content: space-between;
                    "
                  >
                    <div style="color: #000; font-size: 20px">池塘名</div>
                    <div
                      style="
                        color: #000;
                        position: relative;
                        left: 270px;
                        top: 0px;
                      "
                    >
                      <!-- 鼠标覆盖到更多按钮时弹出 -->
                      <el-popover
                        placement="bottom-start"
                        width="1000px"
                        trigger="hover"
                        title="虾苗信息"
                      >
                        <el-form
                          size="small"
                          label-width="100px"
                          v-model="shrimpInfo"
                          font-size="14px"
                        >
                          <el-form-item label="虾苗批次名称">
                            <el-input disabled style="color: black"></el-input>
                          </el-form-item>
                          <el-form-item label="虾苗品种">
                            <el-input disabled style="color: black"></el-input>
                          </el-form-item>
                          <el-form-item label="虾苗产地">
                            <el-input disabled style="color: black"></el-input>
                          </el-form-item>
                          <el-form-item label="虾苗供应商">
                            <el-input disabled style="color: black"></el-input>
                          </el-form-item>
                        </el-form>
                        <el-button slot="reference" size="mini">更多</el-button>
                      </el-popover>
                    </div>
                  </td>
                </tr>
                <tr>
                  <!-- 池塘图片显示区域 -->
                  <td class="imgBox">
                    <img src="../assets/pond.jpg" style="cursor: pointer" />
                  </td>
                  <!-- 池塘信息显示区域 -->
                  <td class="infoBox">
                    <p>虾苗品种：大虾</p>
                    <p>池塘面积/m²：100</p>
                    <p>池塘深度/m：100</p>
                    <p>池塘类型：超大型</p>
                    <p>投放尾数/尾：100</p>
                    <p>投放时间：100</p>
                    <p>上次捕捞时间：100</p>
                    <p>投放状态：未投放</p>
                  </td>
                </tr>
                <tr class="btnBox">
                  <td class="blank"></td>
                  <td class="btnGround">
                    <!-- 捕捞按钮 -->
                    <el-tooltip
                      effect="dark"
                      content="捕捞"
                      placement="left"
                      :enterable="false"
                    >
                      <el-button
                        type="success"
                        icon="el-icon-wind-power"
                        size="mini"
                      ></el-button>
                    </el-tooltip>
                    <!-- 投料按钮 -->
                    <el-tooltip
                      effect="dark"
                      content="投料"
                      placement="top"
                      :enterable="false"
                    >
                      <el-button
                        type="warning"
                        icon="el-icon-caret-bottom"
                        size="mini"
                      ></el-button>
                    </el-tooltip>
                    <!-- 投苗按钮 -->
                    <el-tooltip
                      effect="dark"
                      content="投苗"
                      placement="top"
                      :enterable="false"
                    >
                      <el-button
                        type="success"
                        icon="el-icon-arrow-down"
                        size="mini"
                      ></el-button>
                    </el-tooltip>
                    <!-- 修改按钮 -->
                    <el-button
                      type="info"
                      icon="el-icon-edit"
                      size="mini"
                    ></el-button>
                    <!-- 删除按钮 -->    <!-- 看情况保留或隐藏 -->
                    <!-- <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </TheCardHead>
    </el-card>
  </div>
</template>

<script>
import TheCardHead from "../components/ccy/TheCardHead";
import TheDialogAll from "../components/ccy/TheDialogAll";
export default {
  components: { TheCardHead },
  //   data() {
  //     return {
  //       token: window.localStorage.getItem("token"),
  //       // 虾管理信息，用于展示
  //       shrimpInfo: [],
  //       // 基地编码
  //       baseId: this.defines.baseId,
  //       // 用于控制分页的当前页码和条数
  //       pageInfo: {
  //         // 当前页码
  //         pagenum: 1,
  //         // 每页显示条数
  //         pagesize: 6,
  //       },
  //       // 分类信息
  //       valueType: [],
  //       categoryOptions: [],
  //       // 总条数
  //       total: 0,
  //       // 对应id虾苗总数
  //       remainNumber: 0,
  //       // 目前虾苗量
  //       constNum: "",
  //       // 保存虾苗品种
  //       shrimpSpecies: "",
  //       // 保存投放状态选项·
  //       options: [
  //         {
  //           value: "0",
  //           label: "未投放",
  //         },
  //         {
  //           value: "1",
  //           label: "已投放",
  //         },
  //       ],
  //       // 保存捕捞规格
  //       options3: [
  //         {
  //           value: "60以上",
  //         },
  //         {
  //           value: "50~60",
  //         },
  //         {
  //           value: "30~40",
  //         },
  //         {
  //           value: "20~10",
  //         },
  //         {
  //           value: "10~0",
  //         },
  //       ],
  //       // 保存虾的养殖方式
  //       options4: [
  //         {
  //           value: "工厂流水养殖",
  //         },
  //         {
  //           value: "外塘传统养殖",
  //         },
  //         {
  //           value: "大棚温室养殖",
  //         },
  //         {
  //           value: "稻虾套养模式",
  //         },
  //       ],
  //       // 池塘列表
  //       pondList: [],
  //       // 虾苗品种列表
  //       ShrimpSpeciesList: [],
  //       // 用于获取虾苗编号
  //       shrimpManagement: [],
  //       // 用于获取农资名称
  //       suppliesName: [],
  //       // 用于存放人员信息
  //       personInfoList: [],
  //       // 添加池塘的表单数据
  //       addeForm: {
  //         pondName: "",
  //         pondVolume: "",
  //         depth: "",
  //         pondType: "",
  //         baseId: "",
  //       },
  //       // 投苗表单数据
  //       drogForm: {
  //         id: "",
  //         shrimpId: "",
  //         baseId: "",
  //         inputNum: "",
  //         createDate: "",
  //         species: "",
  //       },
  //       // 投料表单数据
  //       farmForm: {
  //         suppliesName: "",
  //         applyTime: "",
  //         pondId: "",
  //         applicator: "",
  //         applyType: "",
  //         deliveryVolume: "",
  //         suppliesInfoId: "",
  //       },
  //       // 捕捞表单数据
  //       catchForm: {
  //         id: "",
  //         shrimpId: "",
  //         catchDate: "",
  //         people: "",
  //         yield: "",
  //         specification: "",
  //       },
  //       // 查询到的池塘信息对象，用于修改池塘信息
  //       editForm: {
  //         id: "",
  //         pondName: "",
  //         pondType: "",
  //         depth: "",
  //         baseId: "",
  //         shrimpId: "",
  //         pondVolume: 0,
  //         inputNum: 0,
  //         createDate: null,
  //         deliveryStatus: "",
  //         catchDate: null,
  //       },
  //       // 建议卡信息输入表单
  //       kindForm: {
  //         pondVolume: 0,
  //         pondDeep: 0,
  //         shrimpKindId: "",
  //         shrimpMethod: "",
  //       },
  //       // 查询到的建议卡信息
  //       suggest: {
  //         id: "string",
  //         kindName: "string",
  //         minDensity: "string",
  //         maxDensity: "string",
  //         waterTemperature: 0,
  //         salinity: 0,
  //         ph: 0,
  //         ammoniaValue: 0,
  //         dissolvedOxygen: 0,
  //         pondVolume: 0,
  //         pondDeep: 0,
  //       },
  //       // 控制添加池塘面板的显示与隐藏
  //       addDialogVisible: false,
  //       // 控制修改池塘面板的显示和隐藏
  //       aditDialogVisible: false,
  //       // 控制投苗面板的显示和隐藏
  //       drogDialogVisible: false,
  //       // 控制投料面板的显示和隐藏
  //       farmDialogVisible: false,
  //       // 控制捕捞面板的显示和隐藏
  //       catchDialogVisible: false,
  //       // 控制建议卡:池塘信息输入面板的显示和隐藏
  //       kindDialogVisible: false,
  //       // 控制建议卡面板的显示和隐藏
  //       suggestDialogVisible: false,
  //       // 添加表单的验证规则对象
  //       addeFormRules: {
  //         pondName: [
  //           { required: true, message: "请输入池塘名称", trigger: "blur" },
  //           {
  //             min: 2,
  //             max: 10,
  //             message: "池塘名称的长度在2~10个字符之间",
  //             trigger: "blur",
  //           },
  //         ],
  //         pondType: [
  //           { required: true, message: "请输入池塘类型", trigger: "blur" },
  //           {
  //             min: 2,
  //             max: 10,
  //             message: "池塘类型的长度在2~10个字符之间",
  //             trigger: "blur",
  //           },
  //         ],
  //         depth: [{ required: true, message: "请输入池塘深度", trigger: "blur" }],
  //         pondVolume: [
  //           { required: true, message: "请输入池塘面积", trigger: "blur" },
  //         ],
  //       },
  //       // 投苗表单的验证规则对象
  //       drogFormRules: {
  //         shrimpId: [
  //           { required: true, message: "请输入虾苗批次名称", trigger: "blur" },
  //         ],
  //         inputNum: [
  //           { required: true, message: "请输入投放尾数", trigger: "blur" },
  //         ],
  //       },
  //       // 投料表单的验证规则对象
  //       farmFormRules: {
  //         suppliesInfoId: [
  //           { required: true, message: "请输入农资名称", trigger: "blur" },
  //         ],
  //         applicator: [
  //           { required: true, message: "请输入操作人", trigger: "blur" },
  //         ],
  //         applyType: [
  //           { required: true, message: "请输入操作类别", trigger: "blur" },
  //         ],
  //         deliveryVolume: [
  //           { required: true, message: "请输入投放量", trigger: "blur" },
  //         ],
  //       },
  //       // 捕捞表单的验证规则对象
  //       catchFormRules: {
  //         people: [{ required: true, message: "请输入操作员", trigger: "blur" }],
  //         specification: [
  //           { required: true, message: "请输入捕捞规格", trigger: "blur" },
  //         ],
  //         yield: [{ required: true, message: "请输入产量", trigger: "blur" }],
  //       },
  //       // 修改表单的验证规则对象
  //       editFormRules: {
  //         pondName: [
  //           { required: true, message: "请输入池塘名称", trigger: "blur" },
  //           {
  //             min: 2,
  //             max: 10,
  //             message: "池塘名称的长度在2~10个字符之间",
  //             trigger: "blur",
  //           },
  //         ],
  //         pondType: [
  //           { required: true, message: "请输入池塘类型", trigger: "blur" },
  //           {
  //             min: 2,
  //             max: 10,
  //             message: "池塘类型的长度在2~10个字符之间",
  //             trigger: "blur",
  //           },
  //         ],
  //         pondVolume: [
  //           { required: true, message: "请输入池塘面积", trigger: "blur" },
  //         ],
  //         depth: [{ required: true, message: "请输入池塘深度", trigger: "blur" }],
  //         deliveryStatus: [
  //           { required: true, message: "请输入投放状态", trigger: "blur" },
  //         ],
  //       },
  //       // 建议卡的信息输入的验证规则对象
  //       kindFormRules: {
  //         kindName: [
  //           { required: true, message: "请输入虾的品种", trigger: "blur" },
  //         ],
  //         pondVolume: [
  //           { required: true, message: "请输入池塘面积", trigger: "blur" },
  //         ],
  //         pondDeep: [
  //           { required: true, message: "请输入池塘深度", trigger: "blur" },
  //         ],
  //       },
  //     };
  //   },
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
  // border: 1px solid black;
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
