<template>
    <div>
        <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>订单物流</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!card">顾客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-document"></i>
          <span v-if="card">订单管理</span>
          <span v-if="!card">顾客管理</span>
        </el-col>
        <!-- <div style="width: 75px; float: right;padding:0 28px 0 0">
          <el-button type="success" style=" " plain @click="card=!card">顾客管理</el-button>
        </div> -->
      </el-row>
    <!-- 卡片视图区域 -->
    <el-tabs type="border-card" @tab-click="changes()">
      <el-tab-pane label="订单管理">
        <el-row>
      <div style="width: 75px; float: right;padding:0 30px 0 0">
          <el-button type="primary" style=" " @click="creatememo()">添加备忘录</el-button>
        </div>
      </el-row>

      <!-- 订单信息列表区域 -->
      <el-table :data="OrderList" border stripe>
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="index"> </el-table-column>

        <el-table-column
          prop="taskWeekday"
          label="提醒日期"
          :formatter="memoType"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="statusType"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="taskContent"
          label="内容"
          width="300"
        ></el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
             <el-row :gutter="10">
            <el-col :span="6">
              <!-- 修改按钮 -->
              <el-tooltip
              effect="dark"
              content="修改订单"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
              </el-tooltip>
            </el-col>
            <!-- 发货按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="发货操作"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-box"
                size="mini"
                @click="delivery(scope.row.id)"
              ></el-button>
            </el-tooltip>
            </el-col>
             </el-row>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      </el-tab-pane>
    </el-tabs>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        status:['已暂停','正在进行'],
        memojuge:['每一天','星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
        tatlo:null,
        userId:"",
        form: [],
        // 用于控制分页的当前页码和条数
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },

      }
    },
    methods: {
        creatememo(){
            
        },
        statusType(rwo){
            return this.status[row.status]
        },
        memoType(row){
            return this.memojuge[row.taskWeekday]
        },
        setNode(){
            this.getpad()
        },
        //获取备忘录
      async getpad() {
        const {data : res} = await this.$memo.get(`task/${this.userId}`)
        console.log("获取到的备忘录列表",res.data)
        if (res.statusCode !== 20000) {
        return this.$message.error("获取虾苗订单列表失败！！");
      }
      this.form = res.data
      }
    },
    created(){
        this.userId = this.$store.state.userInfo.id
        this.setNode()
    }
  }
</script>