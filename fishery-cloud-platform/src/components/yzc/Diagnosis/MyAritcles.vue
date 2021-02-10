<template>
    <div>
        <el-row style="color: #555555;font-weight: bold;">
            <el-col :span="21">
                <i class="el-icon-notebook-1"></i>
                <span style="margin-left:5px">{{this.username}}发布的文章</span>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="publishdialogVisible = true">发布文章</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="articles" border stripe>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="diseaseName" label="疾病名称"></el-table-column>
                <el-table-column prop="gmtCreate" label="上传时间"></el-table-column>
                <el-table-column prop="username" label="作者"></el-table-column>
                <el-table-column prop="readAmount" label="阅读数量"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                    <el-tooltip content="文章详情"><el-button type="warning" icon="el-icon-document-copy" @click="ArticleDetails(scope.row)" size="mini"></el-button></el-tooltip>
                    <el-tooltip content="修改文章"><el-button type="primary" icon="el-icon-edit" @click="EditArticle(scope.row)" size="mini"></el-button></el-tooltip>
                    <el-tooltip content="删除文章"><el-button type="danger" icon="el-icon-delete" @click="DeleteArticle(scope.row.id)" size="mini"></el-button></el-tooltip>
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

        <!-- 修改文章——start -->
        <el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="this.ArticleDetailO">
            <el-form-item label="疾病名称">
                <el-input v-model="ArticleDetailO.diseaseName"></el-input>
            </el-form-item>
            <el-form-item label="症状">
                <el-input type="textarea" v-model="ArticleDetailO.symptom"></el-input>
            </el-form-item>
            <el-form-item label="解决方法">
                <el-input type="textarea" v-model="ArticleDetailO.solution"></el-input>
            </el-form-item>
        </el-form>
        <el-upload class="upload-demo" :on-success="handleurl" :on-remove="handleRemove" :file-list="fileList" multiple list-type="picture" action="http://119.23.218.131:9112/search/diagnose/picture">
        <el-button size="small" type="primary">点击上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="modify">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 修改文章——end -->

        <!-- 发布文章——start -->
        <el-dialog :visible.sync="publishdialogVisible" width="50%" close="close">
            <el-form :model="this.publishform">
                <el-form-item label="疾病名称">
                    <el-input v-model="publishform.diseaseName"></el-input>
                </el-form-item>
                <el-form-item label="症状">
                    <el-input type="textarea" v-model="publishform.symptom"></el-input>
                </el-form-item>
                <el-form-item label="解决方法">
                    <el-input type="textarea" v-model="publishform.solution"></el-input>
                </el-form-item>
            </el-form>
            <el-upload class="upload-demo" :on-success="geturl" :on-remove="handleRemove" :file-list="fileList" multiple list-type="picture" action="http://119.23.218.131:9112/search/diagnose/picture">
            <el-button size="small" type="primary">点击上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="PublishArticle">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 发布文章——end -->
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
            srcList:[],
            // 对话框显示隐藏
            dialogVisible:false,
            // 用户id
            userId: this.$store.state.userInfo.id,
            username: this.$store.state.userInfo.userName,
            // 用户发布的文章
            articles:[],
            // 文章详情显示与否
            ShowArticleDetail:false,
            ArticleDetailO: {
                diseaseName:'',
                solution:'',
                symptom:'',
                picture: '',
                gmtModified: ''
            },
            // 分页
            total:0,
            page_index:1,
            page_size:5,
            // 修改文章图片内容
            fileList: [],
            // 发表文章对话框显示
            publishdialogVisible: false,
            // 发表文章表单
            publishform: {
                diseaseName:'',
                id:'',
                picture:'',
                solution:'',
                symptom:'',
                userId: '',
                username: ''
            }
        }
    },
    created() {
        this.getmyarticle()
    },
    methods: {
        async getmyarticle() {
            const {data:res} = await this.$diagnose.get(`/my/${this.userId}/${this.page_size}/${this.page_index}}`)
            if(res.statusCode !== 20000) {
                return this.elmessage.error('获取用户发表文章失败')
            }
            this.articles = res.data.records
            this.total = res.data.total
        },
        // 页码改变
        pageChange(page) {
          this.page_size = page.pagesize
          this.page_index = page.pageindex
          this.getmyarticle()
        },
        // 打开文章详情页
        ArticleDetails(info) {
            this.ShowArticleDetail = true
            this.ArticleDetailO = info
            this.srcList.push(info.picture)
        },
        // 根据id删除文章 
        async DeleteArticle(id) {
            const confirmResult = await this.elConfirm('此操作将删除该文章，是否继续？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch((err)=> {
                return err
            })
            if (confirmResult !== 'confirm') {
              return this.elMessage.info('已取消删除')
            }
            const {data:res} = await this.$diagnose.delete(`/${id}`)
            if(res.statusCode!==20000) {
                return this.elMessage.error('删除失败')
            }
            this.elMessage.success(res.message)
            this.getmyarticle()
        },
        handleurl(res) {
            var data = JSON.parse(res.data)
            this.ArticleDetailO.picture = data.url
        },
        handleRemove() {
            this.ArticleDetailO.picture = ''
        },
        // 修改文章对话框
        EditArticle(info) {
            this.dialogVisible = true
            this.ArticleDetailO = info
            if(info.picture !== '') {
                this.fileList.push({name:info.diseaseName,url:info.picture})
            }
        },
        // 监听修改对话框的关闭
        handleClose() {
            this.ArticleDetailO = {
                diseaseName:'',
                solution:'',
                symptom:'',
                picture: '',
                gmtModified: ''
            },
            this.fileList = []
            this.dialogVisible = false
        },
        // 确认修改按钮
        async modify() {
            var info = {
                diseaseName: this.ArticleDetailO.diseaseName,
                userId:this.ArticleDetailO.userId,
                id:this.ArticleDetailO.id,
                solution:this.ArticleDetailO.solution,
                symptom:this.ArticleDetailO.symptom,
                username:this.ArticleDetailO.username,
                picture:this.ArticleDetailO.picture
            }
            await this.$diagnose.put(``,info).then(res=> {
                if(res.data.statusCode !== 20000) {
                    return this.elMessage.error('修改文章内容失败')
                }
                this.elMessage.success(res.data.message)
                this.getmyarticle()
                this.handleClose()
            })
        },
        // 获取发表文章的图片按钮
        geturl(res) {
            var data = JSON.parse(res.data)
            this.publishform.picture = data.url
        },
        // 发表文章对话框关闭事件
        close() {
            this.publishform = {
                diseaseName:'',
                id:'',
                picture:'',
                solution:'',
                symptom:'',
                userId: '',
                username: ''
            }
            this.publishdialogVisible = false
            this.fileList = []
        },
        // 发布文章按钮
        async PublishArticle() {
            this.publishform.userId = this.userId
            this.publishform.username = this.username
            await this.$diagnose.post('/publish',this.publishform).then(res => {
                if(res.data.statusCode !== 20000) {
                    return this.elMessage.error('发表失败')
                }
                this.close()
                this.elMessage.success(res.data.message)
                this.getmyarticle()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.detail {
    width: 800px;
    position: absolute;
    top: 20%;
    left: 25%;
}
</style>