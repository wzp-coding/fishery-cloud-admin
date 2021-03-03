<template>
  <div>
    <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      name="multipartFile"
      :limit="picLimit"
      :file-list="imageUrlArray"
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
    // 默认数组值
    imageUrlArray: {},
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.editHideImage();
  },
  methods: {
    // 删除图片的处理
    handleRemove(file, fileList) {
      this.$emit("getPic", this.tag, "");
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
    handleChange(file, fileList) {},

    // 修改
    editHideImage() {},

    // 超过限制
    handleExceed(file, fileList) {
      this.elMessage.warning(`请最多上传 ${this.picLimit} 个文件。`);
    },
  },
};
</script>
