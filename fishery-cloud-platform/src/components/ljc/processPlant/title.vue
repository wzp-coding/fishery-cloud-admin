<template>
  <div>
    <el-row
      class="globalHeader"
      style="margin-bottom: 20px; padding-bottom: 45px"
    >
      <el-col :span="4">
        <i class="el-icon-house"></i>
        <span>{{ myTitle }}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    myTitle: {},
  },
};
</script>

