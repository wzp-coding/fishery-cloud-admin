<template>
  <div style="containter">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>渔业管理</el-breadcrumb-item>
      <el-breadcrumb-item>投入品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="containter">
      <TheCardAll :toCardInfo="allSupplyList">
        <div slot="CardTitle">
          <el-col :span="4">
            <i class="el-icon-folder"></i>
            <span>投入品管理</span>
          </el-col>
          <el-col style="width: 100px; float: right; margin-right: 12px">
            <el-button
              type="primary"
              @click="toDialogSupply.dialogVisible = true"
              v-auth="'traceability_fishery_add'"
              >添加投入品</el-button
            >
          </el-col>
        </div>
        <el-table-column type="expand">
          <template slot-scope="props" class="labelStyle">
            <el-form label-position="left" label-width="170px">
              <TheInfoSupplyLayout>
                <el-form-item label="投入品名称" class="down-label" slot="pre">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="投入品 ID" class="down-label" slot="after">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout>
                <el-form-item label="生产日期" class="down-label" slot="pre">
                  <span>{{ props.row.produceDate }}</span>
                </el-form-item>
                <el-form-item label="到期时间" class="down-label" slot="after">
                  <span>{{ props.row.shelfDate }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout
                ><el-form-item label="规格(mm)" class="down-label" slot="pre">
                  <span>{{ props.row.specification }}</span>
                </el-form-item>
                <el-form-item
                  label="投入品成分"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.ingredient }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout>
                <el-form-item label="供应商名称" class="down-label" slot="pre">
                  <span>{{ props.row.supplierName }}</span>
                </el-form-item>
                <el-form-item
                  label="供应商地址"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.supplierAddress }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <TheInfoSupplyLayout>
                <el-form-item label="检验人" class="down-label" slot="pre">
                  <span>{{ props.row.inspector }}</span>
                </el-form-item>
                <el-form-item
                  label="供应商电话"
                  class="down-label"
                  slot="after"
                >
                  <span>{{ props.row.supplierPhone }}</span>
                </el-form-item>
              </TheInfoSupplyLayout>
              <el-form-item label="供应商生产许可证" class="down-label">
                <div class="downBox">
                  <el-image
                    v-if="props.row.supplierLicense"
                    :src="props.row.supplierLicense"
                    :preview-src-list="srcListLicense"
                  />
                  <!-- <i v-if="props.row.supplierLicense" class="el-icon-zoom-in avatar-uploader-icon" ></i> -->
                </div>
              </el-form-item>
              <el-form-item label="投入品照片" class="down-label">
                <div class="downBox">
                  <el-image
                    v-if="props.row.picture"
                    :src="props.row.picture"
                    :preview-src-list="srcList"
                  ></el-image>
                  <!-- <i v-if="props.row.picture" class="el-icon-zoom-in avatar-uploader-icon" ></i> -->
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="140"></el-table-column>
        <el-table-column label="投入品名称" prop="name"></el-table-column>
        <el-table-column label="投入品类型" prop="type"></el-table-column>
        <el-table-column
          label="供应商电话"
          prop="supplierPhone"
        ></el-table-column>

        <el-table-column label="生产日期" prop="produceDate"></el-table-column>
        <el-table-column label="到期时间" prop="shelfDate"></el-table-column>
        <el-table-column label="操作" width="143">
          <template slot-scope="scope">
            <el-row :gutter="15">
              <el-col :span="11"
                ><el-button
                  size="mini"
                  @click="editSupplyEvent(scope.row.id)"
                  v-auth="'traceability_fishery_update'"
                  >编辑</el-button
                ></el-col
              >
              <el-col :span="11"
                ><el-button
                  size="mini"
                  type="danger"
                  @click="removeSupply(scope.row.id)"
                  v-auth="'traceability_fishery_delete'"
                  >删除</el-button
                ></el-col
              >
            </el-row>
          </template>
        </el-table-column>
      </TheCardAll>
      <ThePagination
        :toPagination="paginationInfo"
        @fatherMethod="paginationChangeEvent"
      ></ThePagination>
    </el-card>
    <!-- 添加信息 -->
    <TheDialogAll :toDialogInfo="toDialogSupply" :FormInfo="addSupplyInfo">
      <TheDialogLayout>
        <el-form-item label="投入品名称" prop="name" slot="pre">
          <el-input
            placeholder="请输入投入品名称"
            v-model="addSupplyInfo.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="检验人名称" prop="inspector" slot="after">
          <el-input
            placeholder="请输入检验人姓名"
            v-model="addSupplyInfo.inspector"
            clearable
          ></el-input>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="生产日期" prop="produceDate" slot="pre">
          <el-date-picker
            v-model="addSupplyInfo.produceDate"
            type="datetime"
            placeholder="选择生产日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到期时间" prop="shelfDate" slot="after">
          <el-date-picker
            v-model="addSupplyInfo.shelfDate"
            type="datetime"
            placeholder="选择到期时间时间"
          ></el-date-picker>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="规格(mm)" prop="specification" slot="pre">
          <el-input
            placeholder="请输入投入品规格"
            v-model="addSupplyInfo.specification"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="投入品类型" slot="after" prop="type">
          <el-select
            v-model="addSupplyInfo.type"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOption"
              :key="item.id"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="供应商姓名" prop="supplierName" slot="pre">
          <el-input
            placeholder="请输入供应商名称"
            v-model="addSupplyInfo.supplierName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商电话" prop="supplierPhone" slot="after">
          <el-input
            placeholder="请输入供应商电话"
            v-model="addSupplyInfo.supplierPhone"
            clearable
          ></el-input>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-form-item label="投入品成分" prop="ingredient" slot="pre">
          <el-input
            placeholder="请输入投入品成分"
            clearable
            v-model="addSupplyInfo.ingredient"
          ></el-input>
        </el-form-item>
      </TheDialogLayout>
      <TheDialogLayout>
        <el-row slot="pre">
          <el-col :span="9">供应商生产许可证</el-col>
          <el-col :span="7">
            <el-upload
              action="http://119.23.218.131:9103/base/file/upload"
              ref="upload"
              name="multipartFile"
              class="avatar-uploader"
              :on-success="handleAvatarSuccessLicense"
              multiple
              :show-file-list="false"
              :file-list="fileList"
              :on-remove="handleRemove(1)"
              list-type="picture"
            >
              <img
                v-if="addSupplyInfo.supplierLicense"
                :src="addSupplyInfo.supplierLicense"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row slot="after">
          <el-col :span="6">投入品照片</el-col>
          <el-col :span="7">
            <el-upload
              action="http://119.23.218.131:9103/base/file/upload"
              ref="upload"
              name="multipartFile"
              :on-remove="handleRemove(2)"
              class="avatar-uploader"
              :on-success="handleAvatarSuccess"
              multiple
              :show-file-list="false"
              :file-list="fileList"
              list-type="picture"
            >
              <img
                v-if="addSupplyInfo.picture"
                :src="addSupplyInfo.picture"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </TheDialogLayout>

      <el-form-item label="收货地址" prop="supplierAddress">
        <el-select
          style="width: 100%"
          v-model="addSupplyInfo.supplierAddress"
          placeholder="请通过拖拽地图选择收货地址"
        >
          <el-option
            v-for="(item, index) in addressArray"
            :key="item + index"
            :label="item.address + item.title"
            :value="item.address + item.title"
            @click.native="setcoordinates(item.location)"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <Map
        :selectedLocation="location"
        @getCenterAddress="setAddress"
        @getAroundPoi="setpoi"
      ></Map>
      <el-row style="margin-top:7px">
        <el-col
        :offset="19"
        :span="2.8"
          ><el-button @click="toDialogSupply.dialogVisible = false"
            >取 消</el-button
          ></el-col
        >
        <el-col :span="2.8"
          ><el-button type="primary" @click="addSupplise"
            >确 定</el-button
          ></el-col
        >
      </el-row>
      <div slot="footer" class="dialog-footer"></div>
    </TheDialogAll>
    <!-- 编辑信息 -->
    <editSupply
      :toDialogInfo="toDialogEditInfo"
      @fatherMethod="getAllSupplInfo"
    ></editSupply>
    <!-- <TheDialogAll :toDialogInfo="toDialogEditInfo"></TheDialogAll> -->
    <el-dialog :visible.sync="isPreview">
      <img :src="previewImg" alt class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import TheCardAll from "../../components/ccy/TheCardAll";
import TheCardHead from "../../components/ccy/TheCardHead";
import ThePagination from "../../components/ccy/ThePagination";
import TheDialogAll from "../../components/ccy/TheDialogAll";
import TheDialogLayout from "../../components/ccy/public/TheDialogLayout";
import TheInfoSupplyLayout from "../../components/ccy/TheInfoSupplyLayout";
import editSupply from "../../components/ccy/InfoSupply/editSupply";
import Map from "../../components/public_components/MyLocationPicker";
export default {
  name: "Suppliesinfo",
  components: {
    TheCardAll,
    ThePagination,
    TheDialogAll,
    TheDialogLayout,
    TheInfoSupplyLayout,
    TheCardHead,
    editSupply,
    Map,
  },
  data() {
    return {
      allSupplyList: [],
      toDialogSupply: {
        title: "添加投入品来源信息",
        dialogVisible: false,
        addeForm: this.addSupplyInfo,
        FormRules: {
          name: [
            { required: true, message: "请输入投入品名称", trigger: "blur" },
          ],
          produceDate: [
            { required: true, message: "请输入生产日期", trigger: "blur" },
          ],
          shelfDate: [
            { required: true, message: "请输入到期时间", trigger: "blur" },
          ],
          supplierName: [
            { required: true, message: "请输入供应商名称", trigger: "blur" },
          ],
          supplierPhone: [
            { required: true, message: "请输入供应商电话", trigger: "blur" },
            {
              min: 8,
              max: 11,
              message: "长度在 8 到 11 个字符",
              trigger: "blur",
            },
          ],
          supplierAddress: [
            { required: true, message: "请输入供应商地址", trigger: "blur" },
          ],
          specification: [
            { required: true, message: "请输入规格", trigger: "blur" },
          ],
        },
      },
      // 地图传来的地址数组
      addressArray: [],
      // 传入地图的中心坐标
      location: {
        lat: "",
        lng: "",
      },
      initPoint: {
        lat: "",
        lng: "",
      },
      fileList: [],
      paginationInfo: {
        total: 0,
        size: 6,
        page: 1,
      },
      // 放大图片路径
      previewImg: "",
      // 控制放大面板的显示和隐藏
      isPreview: false,
      // 图片预览
      srcList: [],
      srcListLicense: [],
      addSupplyInfo: {
        ingredient: "", //投入品成分
        inspector: "", //检验人
        name: "", //投入品名称
        picture: null, //投入品照片
        produceDate: "", //生产日期
        shelfDate: "", //保质期
        specification: 0, //规格
        supplierAddress: "", //供应商地址
        supplierLicense: null, //供应商许可证
        supplierName: "", //供应商姓名
        supplierPhone: "", //供应商电话
        type: "", //投入品编号 1鱼料 2饲料
        gmtCreate: "", //创造时间
      },
      typeOption: [
        {
          id: 1,
          name: "鱼料",
        },
        {
          id: 2,
          name: "饲料",
        },
      ],
      //修改投入品信息
      edifSupplyInfo: {
        id: "",
      },
      toDialogEditInfo: {
        title: "修改投入品信息",
        dialogVisible: false,
      },
    };
  },
  created() {
    this.getAllSupplInfo();
  },
  methods: {
    // 添加投入品
    async addSupplise() {
      let date = new Date();
      this.addSupplyInfo.specification = parseInt(
        this.addSupplyInfo.specification
      );
      console.log(this.addSupplyInfo.specification);
      this.addSupplyInfo.gmtCreate = this.timeFormat(date);
      this.addSupplyInfo.produceDate = this.timeFormat(
        this.addSupplyInfo.produceDate
      );
      this.addSupplyInfo.shelfDate = this.timeFormat(
        this.addSupplyInfo.shelfDate
      );
      console.log(this.addSupplyInfo);
      if (this.addSupplyInfo.type == "鱼料") {
        this.addSupplyInfo.type = 1;
      } else {
        this.addSupplyInfo.type = 2;
      }
      console.log(this.addSupplyInfo);
      const { data: res } = await this.$supplyController.post(
        "",
        this.addSupplyInfo
      );
      if (res.statusCode === 20000) {
        this.elMessage.success("添加投入品成功");
        this.toDialogSupply.dialogVisible = false;
        this.getAllSupplInfo();
      }
      console.log(res);
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
    async getAllSupplInfo() {
      console.log(this.paginationInfo);
      const { data: res } = await this.$supplyController.get(
        `${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      console.log(res);
      if (res.statusCode === 20000) {
        this.allSupplyList = res.data.records;
        this.paginationInfo.total = res.data.total;
        for (let i = 0; i < this.allSupplyList.length; i++) {
          this.allSupplyList[i].type = "饲料";
          if (
            this.allSupplyList[i].picture ||
            this.allSupplyList[i].supplierLicense
          ) {
            this.srcList.push(this.allSupplyList[i].picture);
            this.srcListLicense.push(this.allSupplyList[i].supplierLicense);
          }
        }
      }
    },
    editSupplyEvent(id) {
      this.toDialogEditInfo.dialogVisible = true;
      this.toDialogEditInfo.id = id;
    },

    // 分页组件事件
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getAllSupplInfo();
    },
    //删除事件
    async removeSupply(id) {
      const confirmResult = await this.elConfirm(
        "此操作将永久删除该投入品信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
        // .catch 用于捕获错误返回给confirmResult
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        // this.$message.info: 灰色提示框
        return this.elMessage.info("已取消删除");
      }
      const { data: res } = await this.$supplyController.delete(`${id}`);
      if (res.statusCode === 20000) {
        this.elMessage.success("已成功删除该投入品信息");
        this.getAllSupplInfo();
      }
    },
    async uploadEvent() {
      console.log("11");
      const { data: res } = await this.$fileUpload.post();
      console.log(res);
    },
    handleAvatarSuccess(res) {
      let picUrl = JSON.parse(res.data);
      this.addSupplyInfo.picture = picUrl.url;
      console.log(this.addSupplyInfo.picture);
    },
    handleAvatarSuccessLicense(res) {
      let picUrl = JSON.parse(res.data);
      this.addSupplyInfo.supplierLicense = picUrl.url;
      console.log(this.addSupplyInfo.supplierLicense);
    },
    handleRemove(x) {
      if (x === 1) {
        this.addSupplise.supplierLicense = "";
      } else {
        this.addSupplise.picture = "";
      }
    },
    // 设置地图返回的定点位置
    setAddress(address) {
      console.log("address-->", address);
      this.addSupplyInfo.supplierAddress = address;
    },
    // 设置地图返回的位置数组
    setpoi(poi) {
      console.log("pio-->", poi);
      this.addressArray = poi;
    },
    // 设置坐标
    setcoordinates(location) {
      this.location = location;
      // this.addSupplyInfo.addressLatitude =this.location.lat
      // this.addSupplyInfo.addressLongitude = this.location.lng
      console.log("location-->", this.location);
    },
  },
};
</script>

<style lang="less">
.down-label {
  .el-form-item__label {
    font-weight: bold;
  }
}
.containter {
  height: 1700px;
}
.downBox {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  .el-image {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  .el-icon-zoom-in {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
.avatar-uploader .el-upload {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>