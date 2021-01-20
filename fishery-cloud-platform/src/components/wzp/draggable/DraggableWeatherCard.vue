<template>
  <el-col :span="6">
    <WeatherCard></WeatherCard>
  </el-col>
</template>
<script>
import WeatherCard from "../WeatherCard";
export default {
  components: {
    WeatherCard,
  },
};
</script>