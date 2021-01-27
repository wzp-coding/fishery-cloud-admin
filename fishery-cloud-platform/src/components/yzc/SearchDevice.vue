<template>
    <div style="" class="search"><input placeholder="输入设备名称进行查询" v-model="searchinput" style="border:0;outline:none"><i class="el-icon-search"></i></div>
</template>

<script>
export default {
    props: {
        equipmentList: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            // 搜索输入
            searchinput: ''
        }
    },
    watch: {
        searchinput: function() {
            const input = this.searchinput
            const searchdate = this.equipmentList.filter(value => {
                return value.equipmentName.match(input)
            })
            this.$emit('searchdate',searchdate)
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
</style>