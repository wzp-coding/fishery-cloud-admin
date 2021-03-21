<!--
* @FileDescription: 
用途：用于上传文件（包括图片，视频等），支持大文件上传，断点续传
没有删除文件接口，也就是说，删除文件时不用调接口

8个参数：
is-open<Boolean>:用来控制上传文件弹窗的显示

控制文件类型（type或者types）
type<string>(简单版):只需要传数组["image"(图片), "video"(视频), "text"(html,css,js), "audio"(音频), "application"(PPT,word,xls等文档)]其中一种即可，
示例：:type="'image'"
types<Array>(复杂版):传入一个数组，数组每一项是 MIME文件类型 或者 文件名后缀 的检验规则，可以是正则，也可以是字符串
示例：:types="['image/*',.jpg,.png]"
MIME类型链接：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types

上传文件数量限制(默认是1)
max<Number>:最大数量，示例：:max="1"
min<Number>:最小数量，示例：:min="1"

upload-success<Function>:文件上传成功时的回调
回调函数接受一个参数，参数内容是一个字符串，包含所有文件路径（逗号分隔）

close-modal<Function>:关闭弹窗时的回调(需要手动将isOpen变为false)

initFiles<String>:初始展示时的文件（传文件路径,逗号分隔）
示例："xxx.jpg,yyy.png"

* @Author: 吴泽鹏
* @Date: 2021/2/4 21:46
* @LastEditors: 吴泽鹏
* @LastEditTime: 2021/3/9 18:47
-->
<script>
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { DashboardModal } from "@uppy/vue";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import chinese from "@uppy/locales/lib/zh_CN";
export default {
  props: {
    type: {
      type: String,
      validator(val) {
        const types = ["image", "video", "text", "audio", "application"];
        return types.includes(val);
      },
    },
    types: {
      type: Array,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
    uploadSuccess: {
      type: Function,
    },
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
    closeModal: {
      type: Function,
    },
    initFiles: {
      type: String,
    },
  },
  data() {
    return {
      uppy: undefined,
      uppyOptions: {
        id: "uppy",
        // 文件添加之前做校验
        onBeforeFileAdded: (file) => {
          if (!this.type) {
            // 如果传了types数组，没传type字符串，则用uppy内置校验
            return true;
          }
          const reg = new RegExp(this.type + "/*");
          const flag = reg.test(file.type);
          if (!flag) {
            let errormsg = "";
            switch (this.type) {
              case "image":
                errormsg = "图片";
                break;
              case "video":
                errormsg = "视频";
                break;
              case "text":
                errormsg = "文本";
                break;
              case "audio":
                errormsg = "音频";
                break;
              case "application":
                errormsg = "文档";
                break;
            }
            this.elMessage.error("请上传" + errormsg + "类型的文件！！");
            return false;
          }
          return true;
        },
        // 不支持多选
        allowMultipleUploads: false,
        // 控制文件数量
        restrictions: {
          minNumberOfFiles: this.min,
          maxNumberOfFiles: this.max,
          allowedFileTypes: this.types || [this.type + "/*"] || null,
        },
        locale: chinese,
      },
      tusOptions: {
        id: "Tus",
        // 上传地址
        endpoint: "http://119.23.218.131:9800/group1/big/upload/",
      },
      fileStr: "",
      hideUploadButton:false
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
      let retryNum = 0;// 重传次数
      uppy = new Uppy(uppyOptions);
      uppy.use(Tus, tusOptions);
      uppy.on("file-added", (file) => {
        uppy.setFileMeta(file);
      });
      // 监听单个文件上传成功
      uppy.on("upload-success", (file, res) => {
        // console.log("file: ", file);
        if (this.fileStr == "") {
          this.fileStr += res.uploadURL;
        } else {
          this.fileStr += "," + res.uploadURL;
        }
      });
      // 监听单个文件上传失败
      uppy.on("upload-error", (file, error, res) => {
        this.elMessage.error(error);
        setTimeout(() => {
          if(retryNum >3){ 
            uppy.off('upload-error',()=>{
              this.elMessage.error('尝试次数过多，均失败');
            });
          }
          this.elMessage.info("正在尝试重新上传");
          uppy.retryUpload(file.id);
          retryNum++;
        }, 2000);
      });
      // 监听所有文件上传成功
      uppy.on("complete", (result) => {
        this.uploadSuccess(this.fileStr);
        // console.log('this.fileStr: ', this.fileStr.split(','));
      });
      // 监听关闭弹窗事件
      uppy.on("dashboard:modal-closed", () => {
        this.closeModal();
      });
      // 监听打开弹窗事件
      uppy.on("dashboard:modal-open", () => {
        // 初始展示的文件
        if (this.initFiles) {
          // 如果需要初始文件展示，先将容器清空
          const files = uppy.getFiles();
          files.forEach(file=>uppy.removeFile(file.id));
          // 接下来添加展示文件
          const cFiles = this.initFiles.split(",");
          if(cFiles.length == this.max){
            this.hideUploadButton = true
          }
          cFiles.forEach((file, index) => {
            fetch(file)
              .then((res) => res.blob())
              .then((blob) => {
                uppy.addFile({
                  name: `文件${index + 1}`,
                  type: blob.type,
                  data: blob,
                });
              });
          });
        }
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
            hideUploadButton:{hideUploadButton}
          },
        }}
      />
    );
  },
};
</script>