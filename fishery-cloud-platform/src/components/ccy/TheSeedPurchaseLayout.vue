<template>
    <div>
        <el-row style="margin-bottom: 0">
            <el-col :span="12"><slot name="pre"></slot></el-col>
            <el-col :span="12"><slot name="after"></slot></el-col>
            <slot></slot>
        </el-row>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>