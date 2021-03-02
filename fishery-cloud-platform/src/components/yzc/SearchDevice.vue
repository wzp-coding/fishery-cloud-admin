<template>
    <div style="" class="search"><input class="wzp_style_input" placeholder="输入设备名称(序列号)" v-model="searchinput" style="border:0;outline:none"><i class="el-icon-search searchicon" @click="search"></i></div>
</template>

<script>
export default {
    props: {
        SearchType: {
            reauire:true
        },
    },
    data() {
        return {
            // 搜索输入
            searchinput: '',
            fff:[],
            baseId:this.$store.state.userInfo.baseId
        }
    },
    methods: {
        async search () {
            if(this.searchinput == '') {
                return this.elMessage.error('请输入搜索内容')
            }
            if(this.SearchType === '水质设备'||this.SearchType === '气象设备') {
                await this.$equipment.post('search/1/5',{
                    equipmentName:this.searchinput,
                    baseId:this.baseId
                }).then(res=> {
                    if(res.data.statusCode !== 20000) {
                        return this.$messsge.error('查询失败')
                    }
                    this.elMessage.success('查询成功')
                    this.$emit('searchfor',res.data.data.records)
                })
            }
            if(this.SearchType === '监控设备') {
                await this.$baseid.post('/search/1/5',{
                    deviceSerial:this.searchinput,
                    baseId:this.baseId
                }).then(res => {
                    if(res.data.statusCode !== 20000) {
                        return this.$messsge.error('查询失败')
                    }
                    this.elMessage.success('查询成功')
                    this.$emit('searchfor',res.data.data.records)
                })
            }
        }
    },
    watch: {
        searchinput: function() {
            if(this.searchinput=='') {
                this.$emit('getequipmentList')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.search {
    position: relative;
    left: 35px;
    border: 1px solid rgb(176, 190, 197);
    border-radius: 50px;
    text-align: center;
    width: 250px;
    height: 40px;
}
.searchicon:hover {
    color: #598cff;
    cursor: pointer;
}
</style>