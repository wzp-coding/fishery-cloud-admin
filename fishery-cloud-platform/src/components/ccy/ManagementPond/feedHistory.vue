<template>
  <el-dialog :visible.sync="dialogVisible" title="投喂记录" @close="closeEvent">
    <el-table border stripe :data="tableData">
      <el-table-column prop="operatorName" label="投喂者"></el-table-column>
      <el-table-column prop="operatorIdentity" label="身份"></el-table-column>
      <el-table-column prop="supplyName" label="饲料"></el-table-column>
      <el-table-column prop="feedingVolume" label="投喂量"></el-table-column>
    </el-table>
    <ThePagination
      :toPagination="paginationInfo"
      @fatherMethod="paginationChangeEvent"
    ></ThePagination>
  </el-dialog>
</template>

<script>
import ThePagination from "../../ccy/ThePagination";
export default {
  components: {
    ThePagination,
  },
  props: {
    feedRecord: {
      type: Object,
    },
  },
  watch: {
    feedRecord: {
      handler(newVal, oldVal) {
        if (newVal.dialogVisible1) {
          this.getFeedRecord();
        } else if (newVal.dialogVisible2) {
          this.getHistory();
        }
        this.dialogVisible = newVal.dialogVisible;
      },
      deep: true, //深度检测reload对象的属性值变化
      immediate: true,
    },
    dialogVisible: {
      handler(newVal, oldVal) {
        if (!newVal) {
        }
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      feedList: [],
      feedHisttoryList: [],
      tableData: [],
      paginationInfo: {
        total: null,
        size: 6,
        page: 1,
      },
    };
  },
  created() {
    // this.getHistory();
  },
  methods: {
    async getFeedRecord() {
      const { data: res } = await this.$pondController.get(
        `feeding/current/${this.feedRecord.farmingId}/${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      // console.log(res);
      if (res.statusCode === 20000) {
        this.tableData = res.data.records;
        this.paginationInfo.total = res.data.total;
        this.dialogVisible = true;
      }
    },
    closeEvent() {
      this.feedRecord.dialogVisible = false;
      this.$emit("fatherMethods");
    },
    async getHistory() {
      const { data: res } = await this.$pondController.get(
        `feeding/pond/${this.feedRecord.pondId}/${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
      // console.log(res);
      if (res.statusCode === 20000) {
        this.tableData = res.data.records;
        this.paginationInfo.total = res.data.total;
        this.dialogVisible = true;
      }
    },
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      if (this.feedRecord.dialogVisible1) {
        this.getFeedRecord();
      } else {
        this.getHistory();
      }
    },
  },
};
</script>

<style>
p {
  cursor: pointer;
}
</style>