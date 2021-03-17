<template>
  <div>
    <el-tooltip
      :disabled="Fdata.tooltip.tipDisabled"
      :content="Fdata.tooltip.tipContent"
      placement="bottom"
      :effect="Fdata.tooltip.effect"
    >
      <el-button
        :type="Fdata.button.type"
        :icon="Fdata.button.icon"
        :size="Fdata.button.size"
        @click="GetInfo()"
        >{{ Fdata.button.text }}</el-button
      >
    </el-tooltip>
    <!-- 按钮开始 -->
    <!-- 按钮结束 -->

    <!-- 表单区域开始 -->
    <el-dialog
      :title="Fdata.form.title"
      :visible.sync="dialogVisible"
      @close="dialogClosed()"
      width="40%"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="Fdata.form.formRules"
        label-position="left"
        :hide-required-asterisk="true"
        label-width="auto"
      >
        <slot :data="{ form, change: onChange }"></slot>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表单区域结束 -->
  </div>
</template>
<script>
export default {
  props: {
    id: {},
    Fdata: {},
    GetInfoFn: {},
    submitFn: {},
  },
  data() {
    return {
      dialogVisible: false,

      form: {},
    };
  },
  created() {},
  methods: {
    /* 根据Id查询信息开始 */
    async GetInfo() {
      if (this.id) {
        let res = await this.GetInfoFn();
      }

      this.dialogVisible = true;
    },
    /* 根据Id查询信息结束 */

    /* 提交表单 */
    async submit() {
      this.$refs.formRef.validate(async (val) => {
        if (!val) return false;
        let res = await this.submitFn(this.form);
        return;
      });
    },

    dialogClosed() {
      this.form = {};
      this.$refs.formRef.resetFields();
    },

    onChange(key, value) {
      this.form[key] = value;
      console.log(this.form);
    },
  },
};
</script>

/* 
    => 传入形式
    - 参数一
    Fdata: {
      tooltip: {
        tipDisabled,
        tipContent,
        effect,
      },
      button: {
        type,
        icon,
        size,
        text,
      },
      form: {
        formRules,
        title,
      },
    },

    - 参数二 // 用于获取当前项的信息
    :GetInfoFn: fn 

    - 参数三 // 用于提交表单
    :submitFn: fn

*/


