<template>
  <el-dialog :visible.sync="feedRecord.dialogVisible" title="投喂记录" @close="closeEvent">
    <el-table border stripe :data="feedList">
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
  data() {
    return {
      dialogVisible: this.feedRecord.dialogVisible,
      feedList: [],
      paginationInfo: {
        total: null,
        size: 6,
        page: 1,
      },
    };
  },
  created() {
    this.getFeedRecord();
  },
  methods: {
    async getFeedRecord() {
      const { data: res } = await this.$pondController.get(
        `feeding/current/${this.feedRecord.pondId}/${this.paginationInfo.size}/${this.paginationInfo.page}`
      );
        // console.log(res);
      if (res.statusCode === 20000) {
        this.feedList = res.data.records;
        this.paginationInfo.total = res.data.total;
      }
    },
    closeEvent() {
      this.feedRecord.dialogVisible = false;
    },
    paginationChangeEvent(size, page) {
      this.paginationInfo.size = size;
      this.paginationInfo.page = page;
      this.getFeedRecord();
    },
  },
};
</script>

<style>
</style>