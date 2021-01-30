<template>
    <el-form-item :label="label" :prop="prop">
        <el-date-picker
          v-model="form.seedlingTime"
          type="datetime"
          placeholder="选择日期时间"
          disabled
        >
        </el-date-picker>
      </el-form-item>
</template>
<script>

export default {
    props:{
        form:{
            type:Object,
        },
        label:{
            type:String
        },
        prop:{
            type:String,
        },

    },
    // mounted(){
    //     console.log("label--->",label)
    // }
}
</script>