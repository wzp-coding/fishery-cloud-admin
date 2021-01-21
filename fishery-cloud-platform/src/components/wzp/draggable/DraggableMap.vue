<template>
  <el-col :span="11">
    <Map map-name="base"></Map>
  </el-col>
</template>
<script>
import Map from "../../public_components/Map";
export default {
  components: {
    Map,
  },
};
</script>