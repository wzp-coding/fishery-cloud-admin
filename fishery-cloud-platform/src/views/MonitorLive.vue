<template>
    <div>
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <el-row class="globalHeader" style="background-color: #eaedf1;">
            <el-col>
                <i class="el-icon-stopwatch"></i>
                实况监控
            </el-col>
        </el-row>
        <div style="margin-bottom:20px">共有{{total}}台设备正在运行</div>
        <el-row :gutter="10">
            <el-col :span="8" v-for="item in baseList" :key="item.id"  style="margin-bottom:20px">
                <el-card>
                    <div>设备序列号：{{item.deviceSerial}}</div>
                    <el-divider></el-divider>
                    <div style="height:200px">
                        <iframe :src="item.vedioUrl" frameborder="0" width="100%" height="100%" style="margin-top:5px;border:1px solid #373d41;border-radius:4px;"></iframe>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Breadcrumb from '../components/public_components/Breadcrumb'
export default {
    components: {
        Breadcrumb
    },
    data() {
        return {
            breadcrumbs:["我的基地","实况监控"],
            // 默认基地
            baseId: '1248910886228332544',
            baseList:[],
            // 所监控的设备台数
            total:0
        }
    },
    created() {
        this.getbaseList()
    },
    methods: {
        async getbaseList() {
            this.$monitor.get(`trace?baseId=${this.baseId}`).then(res=>{
                if(res.data.statusCode!==20000) {
                    return this.$message.error('获取基地信息失败')
                }
                console.log(res.data.data);
                this.baseList = res.data.data
                this.total = res.data.data.length
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>