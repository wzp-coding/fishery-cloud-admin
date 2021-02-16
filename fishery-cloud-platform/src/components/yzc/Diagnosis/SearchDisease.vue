<template>
    <div class="search">
        <input placeholder="查询疾病" v-model="input" style="border:0;outline:none"><i class="el-icon-search searchicon"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 输入内容
            input:'',
        }
    },
    watch: {
        // 监听输入款的搜索内容并传值给父组件的getsearch方法
        input: function() {
            this.$emit('getsearch',this.input)
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