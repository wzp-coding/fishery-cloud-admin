<template>
     <div id="ocode-web">
    <div id="head2">
      <span>溯源信息</span>
    </div>
    <div id="main2">
      <div class="heading">
        <div class="title">
          <p>快速查询</p>
        </div>
        <div id="select1">
          <div class="option" @click="iconbase">
            <i class="el-icon-office-building"></i>
            <p>基地信息</p>
          </div>
          <!-- intoStore -->
          <div class="option" @click="iconshrimp">
            <i class="el-icon-s-order"></i>
            <p>虾苗来源</p>
          </div>
          <div class="option" @click="iconfarm">
            <i class="el-icon-folder"></i>
            <p>投料信息</p>
          </div>
          <div class="option" @click="iconplant">
            <i class="el-icon-house"></i>
            <p>加工信息</p>
          </div>
          <div class="option" @click="iconsto">
            <i class="el-icon-mobile"></i>
            <p>冷库信息</p>
          </div>
          <div class="option" @click="iconDeliver">
            <i class="el-icon-truck"></i>
            <p>物流信息</p>
          </div>
        </div>
      </div>
</template>
<script>
export default {
    
}
</script>
<style lang="sass" scoped>

</style>