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
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
    <el-form-item label="定时提醒">
    <el-select v-model="form.region" placeholder=" 任务定时提醒的为周几">
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
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
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
      id:{
        type:String
      },
      memodata:{
        type:Object
      }
    },
    data() {
      return {
        form: {
          region: '',
          date2: '',
          desc: '',
          userId :""
        }
      }
    },
    methods: {
      //关闭
      close(){
        this.form.region = ""
        this.form.date2 = ""
        this.form.desc = ""
        this.form.userId = this.$store.state.userInfo.id
        
      },
      onSubmit() {
        console.log('submit!');
      }
    },
    created(){
        this.form.userId = this.$store.state.userInfo.id
    },
  }
</script>