<!--
* @FileDescription: 
用途：用于上传文件（包括图片，视频等），支持大文件上传，断点续传
没有删除文件接口，也就是说，删除文件时不用调接口

接受三个参数：
is-open:用来控制上传文件弹窗的显示

upload-success:文件上传成功时的回调
回调函数接受一个参数，参数内容包含文件路径和文件名

close-modal:关闭弹窗时的回调


* @Author: 吴泽鹏
* @Date: 2021/2/4 21:46
* @LastEditors: 吴泽鹏
* @LastEditTime: 
-->
<script>
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { DashboardModal } from "@uppy/vue";
import Uppy from "@uppy/core";
import Tus from "@uppy/Tus";
export default {
  props: {
    uploadSuccess: {
      type: Function,
    },
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
    closeModal:{
      type:Function
    }
  },
  data() {
    return {
      uppy: undefined,
      uppyOptions: {
        id: "uppy",
      },
      tusOptions: {
        id: "Tus",
        endpoint: "http://119.23.218.131:9800/group1/big/upload/",
      },
    };
  },
  components: {
    DashboardModal,
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      let { uppy, uppyOptions, tusOptions } = this.$data;
      uppy = new Uppy(uppyOptions);
      uppy.use(Tus, tusOptions);
      uppy.on("file-added", (file) => {
        uppy.setFileMeta(file);
      });
      uppy.on("upload-success", (file, res) => {
        let ret = { name: file.name, url: res.uploadURL };
        this.uploadSuccess(ret);
      });
      uppy.on("dashboard:modal-closed", () => {
        this.closeModal();
      });
      this.uppy = uppy;
    },
  },
  beforeDestroy() {
    this.uppy.close();
  },
  render(h) {
    return (
      <DashboardModal
        {...{
          props: {
            uppy: this.uppy,
            open: this.isOpen,
          },
        }}
      />
    );
  },
};
</script>