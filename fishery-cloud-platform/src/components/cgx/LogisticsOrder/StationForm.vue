<template>
<el-dialog
      :title="title"
      :visible.sync="stationVisible"
      width="50%"
      :before-close="closed"
> 
  <el-table height="450" 
    :data="tableData.filter(data => !search || data.logisticsStationAddress.toLowerCase().includes(search.toLowerCase())||
    data.phoneNumber.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="站点地址"
      prop="logisticsStationAddress">
    </el-table-column>
    <el-table-column
      label="电话"
      prop="phoneNumber">
    </el-table-column>
    <el-table-column
      label="类型"
      :formatter="stationjudge"
      prop="logisticsStationType">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="{}">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入搜索关键字"/>
      </template>
      <template slot-scope="scope">
        <el-button 
        size="mini"
        @click="handleEdit(scope.row)">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
   <span slot="footer" class="dialog-footer">
       <el-button @click="closed">关 闭</el-button>
      </span>
</el-dialog> 
</template>

<script>
  export default {
      props:{
          stationVisible:{
              type:Boolean
          },
          title:{
            type:String
          }
      },
    data() {
      return {
        tableData: [],
        search: '',
        stationType:['养殖基地','个人', '企业', '加工厂', '冷库']
      }
    },
    methods: {
        //判断类型
        stationjudge(rwo){
            return this.stationType[rwo.logisticsStationType]
        },
        // 关闭列表
        closed(){
            this.$emit("formClose");
        },
       async handleEdit(row) {
         const confirmResult = await this.elConfirm(
        `是否决定选择此站点`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmResult !== "confirm") {
        return this.elMessage.info("已取消选择");
      }
        if(this.title=="选择入站站点"){
         this.$emit("InsetStation",row);
        //  this.elMessage.success("已选择该站点");
         console.log("选择的站点信息-->",row)
        }
        if(this.title=="选择出站站点"){

         this.$emit("OutsetStation",row);
         this.elMessage.success("已选择该站点");
         console.log("选择的站点信息-->",row)
        }
        this.closed()
      },
        // 获取顾客数据
       async getComputedlist(){
        const { data: res } = await this.$logistics.get(`station/${this.$store.state.userInfo.baseId}`);
        console.log("stationifon--->",res.data)
      if (res.statusCode !== 20000) {
        return this.elMessage.error("查询该虾苗信息失败！！");
      }
      this.tableData = res.data;
        },
      },
      created() {
          this.getComputedlist();
      },
    
  }
</script>