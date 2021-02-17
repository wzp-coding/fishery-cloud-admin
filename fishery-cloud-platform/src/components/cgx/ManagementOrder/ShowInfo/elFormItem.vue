<template>
    <el-form-item :label="label" :prop="this.prop">
        <el-input v-model="form.shrimpBatchName" disabled></el-input>
      </el-form-item>
</template>
<script>
export default {
  
    props:{
        form:{
            type:Object,
        },
        label:{
            type:String,
        },
        prop:{
            type:String,
        }
    },
    // mounted(){
    //     console.log("label1--->",this.label)
    // }
}

</script>
