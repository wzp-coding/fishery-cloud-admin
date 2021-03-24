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
                <span style="font-weight:900">{{this.ArticleDetailO.diseaseName}} <span style="font-size:10px;color:#a1a1a1">最近修改于{{this.ArticleDetailO.gmtModified}}</span></span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="closeDetail">关闭</el-button>
            </div>
            <div style="margin-left:10%;margin-bottom:10px">
            <el-image v-if="showimage" style="width: 500px; height: 200px" error :src="this.ArticleDetailO.picture" :preview-src-list="srcList">
                <div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i></div>
            </el-image>
            </div>
            <el-card style="margin-bottom:30px">
                <div style="padding-bottom:10px;">症状 
                    <span class="viewimg" style="float: right; padding: 3px 0;color:#a1a1a1;font-size:10px" @click="showimage = !showimage" v-show="!showimage">查看图片</span>
                    <span class="viewimg" style="float: right; padding: 3px 0;color:#a1a1a1;font-size:10px" @click="showimage = !showimage" v-show="showimage">关闭图片</span>
                </div>
                
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
            showimage:false,
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
        // 打开文章详情页
        async ArticleDetails(info) {
            const {data:res} = await this.$diagnose.get(`/${info.id}/${info.userId}`)
            if(res.statusCode !== 20000) {
                return this.elMessage.error('获取文章详情失败')
            }
            this.ArticleDetailO = res.data
            this.ShowArticleDetail = true
            this.srcList.push(res.data.picture)
        },
        // 页码改变
        pageChange(page) {
          this.page_size = page.pagesize
          this.page_index = page.pageindex
          this.getsearcharticles(this.inputs)
        },
        //关闭详情卡片
        closeDetail() {
            this.showimage = false
            this.ShowArticleDetail = false
        },
    }
}
</script>

<style lang="less" scoped>
.detail {
    width:50%;
    position: absolute;
    left: 25%;
    top: 25%;
    z-index: 1500;
}
.viewimg:hover {
    cursor: pointer;
}
</style>