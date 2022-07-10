<template>
  <Layout>
    <Title title="付款管理"></Title>
    <el-button
      type="primary"
      size="medium"
      @click="dialogVisible = true"
      v-if="authorization()"
      >制定付款单</el-button
    >
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <outcome-list
              :list="pendingList"
              :type="1"
              @refresh="getSheet()"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <outcome-list :list="successList" :type="2" />
          </div>
        </el-tab-pane>

        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <outcome-list :list="failureList" :type="3" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      title="创建付款单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form
          :model="outcomeSheetForm"
          label-width="80px"
          ref="outcomeSheetForm"
          :rules="rules"
        >
          <el-form-item label="客户: " prop="customer">
            <el-select
              v-model="outcomeSheetForm.customer_id"
              placeholder="请选择客户"
            >
              <el-option
                v-for="item in customers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-for="(item, index) in outcomeSheetForm.outcome_sheet_content"
            :key="index"
            :label="'付款单' + (index + 1)"
          >
            <div>
              <el-input
                v-model="item.account"
                style="width: 40%; margin-right: 5%"
                placeholder="请输入汇款方账户"
              ></el-input>
              <el-input
                v-model="item.amount"
                style="width: 40%; margin-right: 5%"
                placeholder="请输入转账金额（元）"
              ></el-input>
            </div>

            <div style="margin-top: 10px">
              <el-input
                v-model="item.remark"
                style="width: 75%; margin-right: 10%"
                placeholder="请填写备注"
              ></el-input>
              <el-button
                type="text"
                size="small"
                @click="addTransfer"
                v-if="
                  index === outcomeSheetForm.outcome_sheet_content.length - 1
                "
                >添加</el-button
              >
              <el-button
                type="text"
                size="small"
                @click.prevent="removeTransfer(item)"
                v-if="index !== 0"
                >删除
              </el-button>
            </div>
          </el-form-item>

          <el-form-item label="备注: ">
            <el-input
              type="textarea"
              v-model="outcomeSheetForm.remark"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('outcomeSheetForm')"
          >立即创建</el-button
        >
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import OutcomeList from "./components/OutcomeList";
import { getAllOutcomeSheet, createOutcomeSheet } from "../../network/finacial";
import { getAllCustomer } from "../../network/sale";
export default {
  name: "OutcomeSheetView",
  components: {
    Layout,
    Title,
    OutcomeList,
  },
  data() {
    return {
      activeName: "PENDING",
      outcomeSheetList: [],
      pendingList: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      outcomeSheetForm: {
        id: "",
        operator: "",
        customer_id: "",
        total_amount: "",
        outcome_sheet_content: [
          {
            id: "",
            account: "",
            amount: "",
            remark: "",
          },
        ],
        remark: "",
      },
      customers: [],
      rules: {
        customers: [
          { required: true, message: "请选择一个客户", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getSheet();
    this.customers = [];
    getAllCustomer({ params: { type: "SUPPLIER" } })
      .then((_res) => {
        this.customers = this.customers.concat(_res.result);
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "获取供货商失败!" + err,
        });
      });
    getAllCustomer({ params: { type: "SELLER" } })
      .then((_res) => {
        this.customers = this.customers.concat(_res.result);
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "获取销售商失败!" + err,
        });
      });
  },
  methods: {
    authorization() {
      return sessionStorage.getItem("role") != "GM";
    },
    getSheet() {
      getAllOutcomeSheet({})
        .then((_res) => {
          this.outcomeSheetList = _res.result;
          this.pendingList = this.outcomeSheetList.filter(
            (item) => item.state === "待审批"
          );
          this.successList = this.outcomeSheetList.filter(
            (item) => item.state === "审批完成"
          );
          this.failureList = this.outcomeSheetList.filter(
            (item) => item.state === "审批失败"
          );
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取付款单列表失败!" + err,
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
    submitForm(formName) {
      this.$refs[formName]
        .validate((valid) => {
          if (valid) {
            this.outcomeSheetForm.id = null;
            this.outcomeSheetForm.operator = sessionStorage.getItem("name");
            this.outcomeSheetForm.total_amount = null;
            this.outcomeSheetForm.outcome_sheet_content.forEach((item) => {
              item.id = null;
              item.amount = parseInt(item.amount);
            });
            createOutcomeSheet(this.outcomeSheetForm).then((_res) => {
              if (_res.msg === "Success") {
                this.$message.success("创建成功!");
                this.resetForm();
                this.dialogVisible = false;
                this.getSheet();
              }
            });
          } else {
            this.$message.error("Error!");
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "创建付款单失败!" + err,
          });
        });
    },
    resetForm() {
      this.outcomeSheetForm = {
        id: "",
        operator: "",
        customer_id: "",
        total_amount: "",
        state: "",
        outcome_sheet_content: [
          {
            id: "",
            account: "",
            amount: "",
            remark: "",
          },
        ],
        remark: "",
      };
    },
    addTransfer() {
      this.outcomeSheetForm.outcome_sheet_content.push({});
    },
    removeTransfer(item) {
      var index = this.outcomeSheetForm.outcome_sheet_content.indexOf(item);
      if (index !== -1) {
        this.outcomeSheetForm.outcome_sheet_content.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>
