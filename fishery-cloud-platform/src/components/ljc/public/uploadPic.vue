<template>
  <div>
    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :on-change="handleChange"
      name="multipartFile"
      :limit="picLimit"
      :class="{ hide: hideUploadCard }"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    // 图片限制个数
    picLimit: {},
    // 上传路径
    uploadUrl: {},
    // 图片标签标志
    tag: {},
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      hideUploadCard: false,
    };
  },
  created() {},
  methods: {
    /* 上传处理开始 */
    // 删除图片的处理
    handleRemove(file, fileList) {
      this.hideUploadCard = false;
    },

    // 图片放大的处理
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 上传成功的处理
    handleAvatarSuccess(res) {
      this.$emit("getPic", this.tag, res.data);
    },

    // 控制上传按钮的隐藏
    handleChange(file, fileList) {
      if (fileList.length >= this.picLimit) {
        this.hideUploadCard = true;
      }
    },
    /* 上传处理结束 */
  },
};
</script>

<style lang="less">
.hide .el-upload--picture-card {
  display: none;
}
</style>
