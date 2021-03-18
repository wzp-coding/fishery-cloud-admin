<template>
    <div>
        <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>基地管理</el-breadcrumb-item>
      <el-breadcrumb-item>备忘录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
        class="globalHeader"
        style="margin-bottom: 20px; padding-bottom: 45px"
      >
        <el-col :span="4">
          <i class="el-icon-document"></i>
          <span >备忘录</span>
        </el-col>
        <!-- <div style="width: 75px; float: right;padding:0 28px 0 0">
          <el-button type="success" style=" " plain @click="card=!card">顾客管理</el-button>
        </div> -->
      </el-row>
    <!-- 卡片视图区域 -->
    <el-tabs type="border-card" @tab-click="changes()">
        <el-row>
      <div style="width: 75px; float: right;padding:0 30px 0 0">
          <el-button type="primary" style=" " @click="creatememo()">添加备忘录</el-button>
        </div>
      </el-row>

      <!-- 订单信息列表区域 -->
      <el-table :data="form" border stripe>
        <!-- border： 加入边框线 -->
        <!-- type="index"： 索引列 -->
        >
        <el-table-column type="index"> </el-table-column>

        <el-table-column
          prop="taskWeekday"
          label="提醒日期"
          :formatter="memoType"
         
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="statusType"
         
        ></el-table-column>
        <el-table-column
          prop="taskContent"
          label="内容"
         
        ></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
             <el-row :gutter="24">
               <!-- 修改按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="修改备忘录"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditmemo(scope.row)"
            ></el-button>
              </el-tooltip>
            </el-col>
            <!-- 暂停按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="暂停提醒"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="warning"
              
              size="mini"
              @click="suspended(scope.row.id)"
            >暂停</el-button>
              </el-tooltip>
            </el-col>
            <!-- 恢复按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="恢复提醒"
              placement="top"
              :enterable="false"
            >
            <el-button
              type="success"
              
              size="mini"
              @click="restore(scope.row.id)"
            >恢复</el-button>
              </el-tooltip>
            </el-col>
            <!-- 删除按钮 -->
            <el-col :span="6">
              <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deletememo(scope.row.id)"
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
    </el-tabs>
    <CreateMemo
    :title="title"
    :memocrad="memocrad"
    :look="look"
    :memodata="memodata"
    @createnotifyParent="createnotifyParent"
    >
    </CreateMemo>
    </div>
</template>
<script>
import CreateMemo from "../../components/cgx/Memorandum/CreatedMemo"
  export default {
    components:{
      CreateMemo,
    },
    data() {
      return {
        title:"",
        memocrad:false,
        memodata:{},
        look:true,
        status:['已暂停','正在进行'],
        memojuge:['每天提醒','星期一','星期二','星期三','星期四','星期五','星期六','星期天'],
        tatlo:null,
        userId:"",
        form: [],
        // 用于控制分页的当前页码和条数
      pageInfo: {
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
        total:null,
      },
      }
    },
    methods: {
      //删除
      async deletememo(id){
       const confirmResult = await this.elConfirm(
        `该提醒将永久删除这条提醒, 是否继续?`,
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
        return this.elMessage.info("已取消删除");
      }
        const {data : res} = await this.$memo.delete(`task/${id}`)
        if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.setNode();
      },
      //恢复
     async restore(id){
       const confirmResult = await this.elConfirm(
        `该提醒将恢复提醒, 是否继续?`,
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
        return this.elMessage.info("已取消操作");
      }
        const {data : res} = await this.$memo.post(`task/${id}`)
        if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.setNode();
      },
      //暂停
     async suspended(id){
       const confirmResult = await this.elConfirm(
        `该提醒将暂停提醒, 是否继续?`,
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
        return this.elMessage.info("已取消操作");
      }
        const {data : res} = await this.$memo.put(`task/${id}`)
        if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.setNode();
      },
      // 监听pagesize(每页显示条数)改变事件
    handleSizeChange(newSize) {
      this.pageInfo.pagesize = newSize;
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.pageInfo.pagenum = newPage;
      console.log("222333")
    },
    //打开创建
        creatememo(){
            this.memocrad = true
            this.title = "添加备忘录"
        },
        //关闭创建
        createnotifyParent(){
          this.memocrad = false;
          this.setNode()
        },
        //打开修改
        showEditmemo(data){
          this.memocrad = true
            this.title = "修改备忘录"
            this.memodata = data
            this.look = !this.look
        },
        statusType(row){
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
        return this.$message.error("获取备忘录列表失败！！");
      }
      this.form = res.data
      this.total =res.data.length 
      }
    },
    created(){
        this.userId = this.$store.state.userInfo.phone
        this.setNode()
    }
  }
</script>