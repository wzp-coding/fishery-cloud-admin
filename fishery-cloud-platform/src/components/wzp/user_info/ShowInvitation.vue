
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    closeCallback: {
      type: Function,
    },
  },
  methods: {
  },
  render(h) {
      const listeners = {
      "update:visible": (val) => this.closeCallback(val),
    };
    return (
      <el-dialog
        title="邀请信息"
        visible={this.isShow}
        {...{ on: listeners }}
        width="30%"
        close={() => this.closeCallback()}
      ></el-dialog>
    );
  },
};
</script>
<style lang="less" scoped>
</style>