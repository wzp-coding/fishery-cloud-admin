<template>
    <div>
        <!-- 面包屑导航区域——start -->
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <!-- 面包屑导航区域——end -->

        <!-- 卡片区域--用户发表得文章——start -->
        <el-card>
            <!-- 标题区域——start -->
            <el-row class="globalHeader" style="margin-bottom: 20px;padding-bottom: 45px">
                <el-col :span="18">
                    <i class="el-icon-search"></i>
                    <span>疾病诊断</span>
                </el-col>
                <el-col :span="6">
                    <SearchDisease @getsearch="getsearch($event)"></SearchDisease>
                </el-col>
            </el-row>
            <!-- 标题区域——end -->
            <!-- 内容区域——start -->
            <MyAritcles v-show="ShowMyAritcles"></MyAritcles>
            <SearchDiseaseDiagnosis ref="SearchDiseaseDiagnosis" v-show="ShowSearchDiseaseDiagnosis"></SearchDiseaseDiagnosis>
            <!-- 内容区域——end -->
        </el-card>
        <!-- 卡片区域--用户发表得文章——end -->
    </div>
</template>

<script>
import SearchDisease from '../../components/yzc/Diagnosis/SearchDisease'
import MyAritcles from '../../components/yzc/Diagnosis/MyAritcles'
import Breadcrumb from '../../components/public_components/Breadcrumb'
import SearchDiseaseDiagnosis from '../../components/yzc/Diagnosis/SearchDiseaseDiagnosis'
export default {
    components: {
        SearchDisease,
        MyAritcles,
        Breadcrumb,
        SearchDiseaseDiagnosis
    },
    data() {
        return {
            breadcrumbs:['我的基地','疾病诊断'],
            // 用户发表的文章
            ShowMyAritcles: true,
            // 搜索的文章
            ShowSearchDiseaseDiagnosis: false
        }
    },
    methods: {
        // 接受搜索的input传入搜索展示的组件并发起请求
        getsearch(input) {
            if(input == '') {
                this.ShowMyAritcles = true
                this.ShowSearchDiseaseDiagnosis = false
            }else {
                this.$refs.SearchDiseaseDiagnosis.getsearcharticles(input)
                this.ShowMyAritcles = false
                this.ShowSearchDiseaseDiagnosis = true
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>