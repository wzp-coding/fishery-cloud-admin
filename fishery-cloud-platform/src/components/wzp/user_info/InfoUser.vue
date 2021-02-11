
<script>
import { mapState } from 'vuex';
import Form from "./Form";
export default {
  components: {
    Form,
  },
  data() {
    return {
      infoForm: {},
    };
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
    handleSubmit(form) {
      console.log("form: ", form);
      
    },
  },
  created() {
    this.infoForm = this.userInfo;
  },
  render(h) {
    return (
      <Form
        callback={this.handleSubmit}
        options={["avatar", "userName", "email", "phone"]}
        button="修改信息"
        defaultForm={this.infoForm}
      >
        <template slot="showInfo">
          <el-form-item label="基地id">
            <el-input value={this.infoForm.baseId} disabled></el-input>
          </el-form-item>
          <el-form-item label="基地身份">
            <el-input value={this.infoForm.baseIdentity} disabled></el-input>
          </el-form-item>
        </template>
      </Form>
    );
  },
};
</script>