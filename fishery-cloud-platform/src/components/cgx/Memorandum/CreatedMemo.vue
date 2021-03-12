<template>

    <div>
    <el-dialog
      :title="title"
      :visible.sync="memocrad"
      width="50%"
      @close="closed"
     > 
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-time-picker value-format='HH:mm:ss' placeholder="选择时间" v-model="form.taskTime " style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
    <el-form-item label="定时提醒">
    <el-select v-model="form.taskWeekday" placeholder=" 任务定时提醒的为周几">
      <el-option label="每一天" :value="0"></el-option>
      <el-option label="星期一" :value="1"></el-option>
       <el-option label="星期二" :value="2"></el-option>
      <el-option label="星期三" :value="3"></el-option>
       <el-option label="星期四" :value="4"></el-option>
      <el-option label="星期五" :value="5"></el-option>
       <el-option label="星期六" :value="6"></el-option>
        <el-option label="星期天" :value="7"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.taskContent "></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="closed">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
    </div>
</template>
<script>
  export default {

    props:{
      title:{
          type:String
      },
      memocrad:{
        type:Boolean
      },
      look:{
        type:Boolean
      },
      memodata:{
        type:Object
      }
    },
    data() {
      return {
        form: {
          taskWeekday : '',
          taskTime : "",
          taskContent : '',
          userId :""
        }
      }
    },
    methods: {
      //创建
     async creatememo(){
      //  this.form.taskTime = this.form.taskTime.substr(16,8);
       console.log('即将创建的备忘录-> ', this.form);
        const {data : res} = await this.$memo.post("task/",this.form)
        if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.closed();
      },
      //修改
      async Modifyememo(){
        // this.form.taskTime = this.form.taskTime.substr(16,8);
        console.log('即将修改的备忘录--> ', this.form);
        const {data : res} = await this.$memo.put("task/",this.form)
        if (res.statusCode === 20000) {
                this.elMessage.success(res.message);
              } else {
                this.elMessage.error(res.message);
              }
              this.closed();
      },
      //关闭
      closed(){
        this.$emit("createnotifyParent");
        this.setnull();
      },
      setnull(){
        this.form.taskWeekday = ""
        this.form.taskTime = ""
        this.form.taskContent = ""
        this.form.userId = this.$store.state.userInfo.phone
      },
      onSubmit() {
        if(this.title=="添加备忘录"){
          this.creatememo()
        }
        if(this.title=="修改备忘录"){
          this.Modifyememo()
        }
      }
    },
    created(){
        // this.form.userId = this.$store.state.userInfo.id
        this.form.userId =this.$store.state.userInfo.phone
    },
    watch:{
      look(){
        this.form = this.memodata
      }
    }
  }
</script>