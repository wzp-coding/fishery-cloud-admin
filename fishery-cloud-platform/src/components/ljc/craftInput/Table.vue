<template>
  <div>
    <!-- 表格开始 -->
    <el-table
      :data="allList[0]"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      height="600"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.inputName">
                  <span>{{ props.row.inputName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.specification">
                  <span>{{ props.row.specification }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.inputProduceDate">
                  <span>{{ props.row.inputProduceDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.inputExpireDate">
                  <span>{{ props.row.inputExpireDate }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.inspector">
                  <span>{{ props.row.inspector }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.supplierName">
                  <span>{{ props.row.supplierName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.supplierAddr">
                  <span>{{ props.row.inspector }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.supplierPhone">
                  <span>{{ props.row.supplierPhone }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item :label="labels.inputPicture">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.inputPicture"
                    :preview-src-list="[props.row.inputPicture]"
                  >
                  </el-image>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="labels.supplierLicense">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.supplierLicense"
                    :preview-src-list="[props.row.supplierLicense]"
                  >
                  </el-image>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        :label="labels.id"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="inputName"
        :label="labels.inputName"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="specification"
        :label="labels.specification"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="inputProduceDate"
        :label="labels.inputProduceDate"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-row :gutter="20">
            <el-col :span="6" style="margin-left: 20px">
              <Delete
                :id="scope.row.id"
                :title="title"
                :root="root"
                :deleteUrl="deleteUrl"
                @getAllInfo="getAllInfo()"
                :auth="'traceability_process'"
              />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
  </div>
</template>

<script>
import Delete from "../public/delete";
export default {
  components: {
    Delete,
  },
  props: {
    // 表格数据
    allList: {},

    // 数据标签
    labels: {},

    // 主题
    title: {},

    // 工艺编号
    craftId: {},
  },
  data() {
    return {
      // 删除接口的根路径标签
      root: "plant",

      // 删除接口的路径
      deleteUrl: `/processingFactory/craft/${this.craftId}`,

      // 图片列表
      picList: [],
    };
  },
  computed: {},
  methods: {
    getAllInfo() {
      this.$emit("getAllInfo");
    },
  },
};
</script>

<style lang="less" scoped>
</style>

