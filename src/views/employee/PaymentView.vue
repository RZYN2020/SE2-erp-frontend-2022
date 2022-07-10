<template>
  <Layout>
    <Title title="工资管理"></Title>
    <el-button
      type="primary"
      size="medium"
      @click="dialogVisible = true"
      v-if="authorization()"
      >制定工资单</el-button
    >
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list
              :list="pendingLevel1List"
              :type="1"
              @refresh="getPayment()"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list
              :list="pendingLevel2List"
              :type="2"
              @refresh="getPayment()"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="successList" :type="3" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="failureList" :type="4" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="制定工资单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="paymentForm" label-width="80px" ref="paymentForm">
          <el-form-item label="员工: " prop="employee">
            <el-select
              v-model="paymentForm.employee_id"
              placeholder="请选择员工"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import PaymentList from "./components/PaymentList";
import {
  findAllEmployee,
  findAllPayment,
  createPayment,
} from "../../network/employee";
export default {
  name: "PaymentView",
  components: {
    Layout,
    Title,
    PaymentList,
  },
  data() {
    return {
      activeName: "PENDING_LEVEL_1",
      paymentList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      paymentForm: {
        id: "",
        operator: "",
        employee_id: 0,
        employee_name: "",
        basic_salary: "",
        actual_paid: "",
        job_salary: "",
        commission: "",
        remark: "",
        state: null,
        tax: null,
      },
      employeeList: [],
    };
  },
  mounted() {
    this.getPayment();
    findAllEmployee({}).then((_res) => {
      let res = _res.result;
      res.forEach((item) =>
        this.employeeList.push({ id: item.id, name: item.name })
      );
    });
  },
  methods: {
    authorization() {
      return sessionStorage.getItem("role") != "GM";
    },
    getEmployeeName() {
      this.paymentForm.employee_name = this.employeeList.filter(
        (item) => item.id === this.paymentForm.employee_id
      )[0]["name"];
    },
    getPayment() {
      findAllPayment({})
        .then((_res) => {
          this.paymentList = _res.result;
          this.pendingLevel1List = this.paymentList.filter(
            (item) => item.state === "待一级审批"
          );
          this.pendingLevel2List = this.paymentList.filter(
            (item) => item.state === "待二级审批"
          );
          this.successList = this.paymentList.filter(
            (item) => item.state === "审批完成"
          );
          this.failureList = this.paymentList.filter(
            (item) => item.state === "审批失败"
          );
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取工资单失败!" + err,
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.resetForm();
          done();
        })
        .catch((_) => {});
    },
    submitForm() {
      this.getEmployeeName();
      this.paymentList["opreator"] = sessionStorage.getItem("role");
      createPayment(this.paymentForm)
        .then((_res) => {
          if (_res.msg === "Success") {
            this.$message.success("创建成功!");
            this.resetForm();
            this.dialogVisible = false;
            this.getPayment();
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "创建工资单失败!" + err,
          });
        });
    },
    resetForm() {
      this.paymentForm = {};
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
