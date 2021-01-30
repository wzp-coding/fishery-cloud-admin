<template>

    <el-table
       height="250"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="活动内容">
      </el-table-column>
    </el-table>
  </template>
<script>
export default {
    props:{

    },
}
</script>