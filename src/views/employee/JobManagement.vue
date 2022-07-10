<template>
  <Layout>
    <Title title="岗位管理"></Title>
    <div style="margin-top: 10px">
      <el-table
        :data="jobList"
        stripe
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="name" label="岗位名称" width="200">
        </el-table-column>

        <el-table-column prop="basicSalary" label="基本工资（元）" width="120">
        </el-table-column>

        <el-table-column
          prop="jobSalary"
          label="岗位工资（元）"
          width="120"
        ></el-table-column>

        <el-table-column prop="jobLevel" label="岗位等级" width="80">
        </el-table-column>

        <el-table-column
          prop="calculateMethod"
          label="薪资计算方式"
          width="220"
        >
        </el-table-column>

        <el-table-column prop="paymentMethod" label="薪资发放方式" width="130">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editInfo(scope.row.name)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="修改岗位信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="close()"
    >
      <el-form :model="editForm" :label-width="'100px'" size="mini">
        <el-form-item label="基本工资">
          <el-input
            v-model="editForm.basicSalary"
            placeholder="0"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="岗位工资">
          <el-input
            v-model="editForm.jobSalary"
            placeholder="0"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="岗位级别">
          <el-input v-model="editForm.jobLevel" placeholder="0"></el-input>
        </el-form-item>

        <el-form-item label="薪资计算方式">
          <el-select v-model="editForm.calculateMethod">
            <el-option
              v-for="method in calculateMethodList"
              :key="method"
              :label="method"
              :value="method"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="薪资发放方式">
          <el-select v-model="editForm.paymentMethod">
            <el-option
              v-for="method in paymentMethodList"
              :key="method"
              :label="method"
              :value="method"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEdit(false)">取 消</el-button>
        <el-button type="primary" @click="handleEdit(true)">确 定</el-button>
      </div>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  findAllJob,
  updateJob,
  findAllCalculateMethod,
  findAllPaymentMethod,
} from "../../network/employee";
export default {
  name: "JobView",
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      jobList: [],
      editDialogVisible: false,
      editForm: {
        name: "",
        basicSalary: "",
        jobSalary: "",
        jobLevel: "",
        calculateMethod: 0,
        paymentMethod: "",
        tax: "",
      },
      calculateMethod: "",
      calculateMethodList: [],
      paymentMethodList: [],
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      await findAllJob({})
        .then((_res) => {
          this.jobList = _res.result;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取岗位列表失败!" + err,
          });
        });
      await findAllCalculateMethod({})
        .then((_res) => {
          this.calculateMethodList = _res.result;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取薪资计算方法失败!" + err,
          });
        });
      await this.calculateMethodNumToStr(this.jobList);
      findAllPaymentMethod({}).then((_res) => {
        this.paymentMethodList = _res.result;
      });
    },
    async calculateMethodNumToStr(list) {
      for (let index = 0; index < list.length; index++) {
        list[index]["calculateMethod"] =
          this.calculateMethodList[list[index]["calculateMethod"] - 1];
      }
    },
    calculateMethodStrToNum(obj) {
      for (let index = 0; index < this.calculateMethodList.length; index++) {
        if (obj["calculateMethod"] == this.calculateMethodList[index]) {
          obj["calculateMethod"] = index + 1;
        }
      }
    },
    filterCalMethod(value, row) {
      return row.calculate_method === value;
    },

    filterPayMethod(value, row) {
      return row.payment_method === value;
    },

    editInfo(name) {
      this.editForm = this.jobList.filter((x) => x.name === name)[0];
      if (this.editForm.recentPp === "暂无") {
        this.editForm.recentPp = null;
      }
      if (this.editForm.recentRp === "暂无") {
        this.editForm.recentRp = null;
      }
      this.editDialogVisible = true;
    },

    handleEdit(type) {
      if (type === false) {
        this.editDialogVisible = false;
        this.editForm = {};
      } else if (type === true) {
        this.calculateMethodStrToNum(this.editForm);
        console.log(this.editForm);
        updateJob(this.editForm)
          .then((_res) => {
            if (_res.code === "B0003") {
              this.$message({
                type: "error",
                message: _res.msg,
              });
            } else {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.editForm = {};
              this.editDialogVisible = false;
              this.getAll();
            }
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "修改失败!" + err,
            });
          });
      }
    },

    close() {
      this.editForm = {};
    },
  },
};
</script>

<style>
</style>
