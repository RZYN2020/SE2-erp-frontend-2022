<template>
  <Layout>
    <Title title="年终奖制定"></Title>
    <div class="container">
      <el-table
        :data="employeeList"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="employeeId" label="员工ID"></el-table-column>
        <el-table-column prop="employeeName" label="员工姓名"></el-table-column>
        <el-table-column prop="totalSalaryExceptDecember" label="员工年工资"></el-table-column>
        <el-table-column prop="yearEndAwards" label="年终奖"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              @click="makeAnnualBonus(scope.row)"
              type="text"
              size="small"
            >
              制定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="制定年终奖"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <div style="width: 90%; margin: 0 auto">
          <el-form :model="editForm" label-width="100px" ref="editForm">
            <el-form-item label="年终奖: " prop="awards">
              <el-input v-model="editForm.awards"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm()">确认制定</el-button>
        </span>
      </el-dialog>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getTotalSalaryExceptDecember,
  establishYearEndAwards,
} from "../../network/strategy";
export default {
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      dialogVisible: false,
      employeeList: [],
      editForm: {},
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      // console.log("HHHHHHHHHHHHHHH");
      getTotalSalaryExceptDecember({})
        .then((_res) => {
          this.employeeList = _res.result;
          for (let i in this.employeeList) {
            if (this.employeeList[i].award == null) {
              this.employeeList[i].award = "未制定";
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取员工年终奖列表失败!" + err,
          });
        });
    },
    makeAnnualBonus(row) {
      this.editForm = row;
      this.dialogVisible = true;
    },
    submitForm() {
      let config = {
        params: {
          employeeId: this.editForm.employeeId,
          awards: this.editForm.awards,
        },
      };
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH");
      establishYearEndAwards(config)
        .then((_res) => {
          this.getAll();
          this.dialogVisible = false;
          this.editForm = {};
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "新增年终奖失败!" + err,
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.editForm = {};
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
</style>
