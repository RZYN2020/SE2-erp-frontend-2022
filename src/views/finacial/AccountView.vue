<template>
  <Layout>
    <Title title="账户管理"></Title>
    <div class="employee-body">
      <el-table
        :data="
          accountList.filter(
            (data) =>
              !search || data.name.includes(search) || data.id.includes(search)
          )
        "
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed prop="accountName" label="账户名" width="300">
        </el-table-column>
        <el-table-column prop="amount" label="余额" width="300">
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <div class="top">
              <!-- <div class="left">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </div>
              &nbsp;&nbsp; -->
              <div class="right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addDialogVisible = true"
                  >新增账户</el-button
                >
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
              @click="deleteAccuountInTable(scope.row.accountName)"
              type="text"
              size="small"
            >
              删除账户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增账户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addClose()"
    >
      <el-form :model="addForm" :label-width="'100px'" size="mini">
        <el-form-item label="账 户 名">
          <el-input
            v-model="addForm.accountName"
            placeholder="请输入账户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="账 户 余 额">
          <el-input
            v-model="addForm.amount"
            placeholder="请输入账户初始金额"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
      </div>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  createAccount,
  deleteAccount,
  queryAccount,
} from "../../network/finacial";
export default {
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      accountList: [],
      // search: "",
      addDialogVisible: false,
      addForm: {
        accountName: "",
        amount: 0,
      },
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      queryAccount({})
        .then((_res) => {
          this.accountList = _res.result;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取账户列表失败!" + err,
          });
        });
    },
    handleAdd(type) {
      if (type === false) {
        this.addDialogVisible = false;
        this.addForm = {};
      } else if (type === true) {
        createAccount(this.addForm)
          .then((_res) => {
            if (_res.code === "B0001" || _res.code === "B0002") {
              this.$message({
                type: "error",
                message: _res.msg,
              });
            } else {
              this.$message({
                type: "success",
                message: "新增成功!",
              });
              this.addForm = {};
              this.addDialogVisible = false;
              this.getAll();
            }
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "账户创建失败!" + err,
            });
          });
      }
    },
    deleteAccuountInTable(accountName) {
      let config = {
        params: {
          accountName: accountName,
        },
      };
      this.$confirm("是否要删除该账户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAccount(config)
            .then((_res) => {
              if (_res.msg === "Success") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getAll();
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "账户删除失败!" + err,
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addClose() {
      this.addForm = {};
    },
  },
};
</script>

<style scoped>
.employee-body {
  width: 80%;
  margin: 0 auto;
}

.top {
  display: flex;
}

.left {
  float: left;
  width: 80%;
}

.right {
  flex: 1;
}
</style>
