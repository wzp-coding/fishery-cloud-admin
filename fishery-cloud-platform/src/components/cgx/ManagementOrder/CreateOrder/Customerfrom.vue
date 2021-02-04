<template>
<el-dialog
      title="顾客列表"
      :visible.sync="CustomerVisible"
      width="50%"
      @close="closed"
> 
  <el-table
    :data="tableData.filter(data => !search || data.address.toLowerCase().includes(search.toLowerCase())||data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Date"
      prop="date">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      label="address"
      prop="address">
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: ''
      }
    },
    methods: {
        // 关闭列表
        closed(){
            this.$emit("CustomerClose");
        },
      handleEdit(row) {
        this.$emit("setCustomer",row);
      },
      handleDelete(index, row) {
        console.log(index, row)
        },
        // 获取顾客数据
        getComputedlist(){
        }
            

      },
    
  }
</script>