<template>
    <div>
        <el-row>
            <el-table :data="searcharticles" border stripe>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column label="疾病名称">
                    <template slot-scope="scope">
                        <span v-html="scope.row.diseaseName"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="gmtCreate" label="上传时间"></el-table-column>
                <el-table-column prop="username" label="作者"></el-table-column>
                <el-table-column prop="readAmount" label="阅读数量"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                    <el-tooltip content="文章详情"><el-button type="warning" icon="el-icon-document-copy" @click="ArticleDetails(scope.row)" size="mini"></el-button></el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!--分页区域——start-->
        <Pagination :total="total" @pageChange="pageChange" :page_index="page_index" :page_size="page_size"></Pagination>
        <!--分页区域——end-->
        <!-- 文章详情——start -->
        <div class="detail" v-show="ShowArticleDetail">
        <el-card class="box-card" style="height:100%">
            <div slot="header" class="clearfix">
                <span style="font-weight:900" v-html="this.ArticleDetailO.diseaseName"><span style="font-size:10px;color:#a1a1a1">最近修改于{{this.ArticleDetailO.gmtModified}}</span></span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="ShowArticleDetail=false">关闭</el-button>
            </div>
            <el-card style="margin-bottom:30px">
                <div style="padding-bottom:10px;">症状 <span style="float: right; padding: 3px 0;color:#a1a1a1;font-size:10px">查看图片<el-image style="width: 17px; height: 17px" error :src="this.ArticleDetailO.picture" :preview-src-list="srcList">
                    <div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i></div>
                    </el-image></span></div>
                <div>{{this.ArticleDetailO.symptom}}</div>
            </el-card>
            <el-card>
                <div style="padding-bottom:10px;">解决方法</div>
                <div>{{this.ArticleDetailO.solution}}</div>
            </el-card>
        </el-card>
        </div>
        <!-- 文章详情——end -->
    </div>
</template>

<script>
import Pagination from '../pagination'
export default {
    components: {
        Pagination
    },
    data() {
        return {
            // 查询到的文章
            searcharticles:[],
            ArticleDetailO: {
                diseaseName:'',
                solution:'',
                symptom:'',
                picture: '',
                gmtModified: ''
            },
            ShowArticleDetail: false,
            srcList: [],
            total:0,
            page_size:5,
            page_index:1,
            // 存储搜索框内数据
            inputs:''
        }
    },
    methods: {
        // 开始查询 
        async getsearcharticles(input) {
            this.inputs = input
            await this.$diagnose.post('',{
                content:input,
                current:this.page_index,
                size:this.page_size,
                keyword:'diseaseName'
            }).then((res)=> {
                if(res.data.statusCode !== 20000) {
                    return this.elMessage.error('执行失败')
                }
                this.searcharticles = res.data.data.records
                this.total = res.data.data.total
            })
        },
        // 打开文章详情页
        ArticleDetails(info) {
            this.ShowArticleDetail = true
            this.ArticleDetailO = info
            this.srcList.push(info.picture)
        },
        // 页码改变
        pageChange(page) {
          this.page_size = page.pagesize
          this.page_index = page.pageindex
          this.getsearcharticles(this.inputs)
        },
    }
}
</script>

<style lang="less" scoped>
</style>