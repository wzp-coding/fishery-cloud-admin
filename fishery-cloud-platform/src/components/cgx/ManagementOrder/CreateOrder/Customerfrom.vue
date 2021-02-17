<template>
<el-dialog
      title="列表"
      :visible.sync="CustomerVisible"
      width="50%"
      @close="closed"
> 
  <el-table
    :data="tableData.filter(data => !search || data.customerName.toLowerCase().includes(search.toLowerCase())||
    data.phoneNumber.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="客户名"
      prop="customerName">
    </el-table-column>
    <el-table-column
      label="电话"
      prop="phoneNumber">
    </el-table-column>
    <el-table-column
      label="收货地址"
      prop="receiveAddress">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="{}">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button 
        size="mini"
        @click="handleEdit(scope.row)">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
   <span slot="footer" class="dialog-footer">
       <el-button @click="closed">确 定</el-button>
        <el-button @click="closed">取 消</el-button>
      </span>
</el-dialog> 
</template>

<script>
  export default {
      props:{
          CustomerVisible:{
              type:Boolean
          }
      },
    data() {
      return {
        tableData: [],
        search: '',
        baseid:"1350657222372835330",
      }
    },
    methods: {
        // 关闭列表
        closed(){
            this.$emit("CustomerClose");
        },
      handleEdit(row) {
        this.$emit("setCustomer",row);
        console.log(row)
      },
        // 获取顾客数据
       async getComputedlist(){
        const { data: res } = await this.$Customer.get(this.baseid);
        console.log("customer--->",res.data)
      if (res.statusCode !== 20000) {
        return this.$message.error("查询该虾苗信息失败！！");
      }
      this.tableData = res.data;
        },
      },
      created() {
          this.getComputedlist();
      },
    
  }
</script>