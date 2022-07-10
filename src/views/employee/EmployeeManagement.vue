<template>
  <Layout>
    <Title title="员工管理"></Title>
    <div class="employee-body">
      <el-table
        :data="
          employeeList.filter(
            (data) =>
              !search || data.name.includes(search) || data.id.includes(search)
          )
        "
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed prop="id" label="员工编号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="100">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="80">
        </el-table-column>
        <el-table-column prop="birthDate" label="生日" width="100">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="125">
        </el-table-column>
        <el-table-column prop="job" label="岗位" width="200"> </el-table-column>
        <el-table-column prop="jobLevel" label="岗位级别" width="80">
        </el-table-column>
        <el-table-column prop="account" label="工资卡账户" width="200">
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <div class="top">
              <div class="left">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                />
              </div>
              &nbsp;
              <div class="right">
                <el-button
                  type="primary"
                  size="mini"
                  @click="addDialogVisible = true"
                  >新增员工</el-button
                >
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
              @click="findUserAccuount(scope.row.id)"
              type="text"
              size="small"
            >
              查看账户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增员工"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addClose()"
    >
      <el-form :model="addForm" :label-width="'100px'" size="mini">
        <el-form-item label="名 称">
          <el-input
            v-model="addForm.name"
            placeholder="请输入员工名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="addForm.gender">
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生 日">
          <el-date-picker
            v-model="addForm.birthDate"
            type="date"
            placeholder="选择生日"
            value-format="yyyy-MM-dd"
            :clearable="true"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input
            v-model="addForm.phoneNumber"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>

        <el-form-item label="请输入岗位">
          <el-select v-model="addForm.job">
            <el-option v-for="item in jobList" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位级别">
          <el-select v-model="addForm.jobLevel">
            <el-option :key="1" :value="1"></el-option>
            <el-option :key="2" :value="2"></el-option>
            <el-option :key="3" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工资卡账户">
          <el-input
            v-model="addForm.account"
            placeholder="请输入工资卡账户"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="账户信息"
      :visible.sync="userdialogVisible"
      width="80%"
      :before-close="userClose"
    >
      <el-descriptions>
        <el-descriptions-item label="用户名">{{
          cur_employeeUser.name
        }}</el-descriptions-item>
        <el-descriptions-item label="职位">{{
          cur_employeeUser.role
        }}</el-descriptions-item>
        <el-descriptions-item label="密码">{{
          cur_employeeUser.password
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  findUser,
  createEmployee,
  findAllEmployee,
  findAllJob,
} from "../../network/employee";
export default {
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      cur_employeeUser: {},
      employeeList: [],
      search: "",
      jobList: [],
      userdialogVisible: false,
      addDialogVisible: false,
      addForm: {
        id: "",
        name: "",
        gender: "",
        birth_date: "",
        phone_number: "",
        job: "",
        job_level: "",
        account: "",
      },
    };
  },
  mounted() {
    this.getAll();
    findAllJob({})
      .then((_res) => {
        this.jobList = _res.result;
        var tempList = this.jobList.map((item, index) => {
          return item.name;
        });
        this.jobList = Array.from(new Set(tempList));
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "获取岗位列表失败!" + err,
        });
      });
  },
  methods: {
    findUserAccuount(id) {
      this.userdialogVisible = true;
      let config = {
        params: {
          id: id,
        },
      };
      findUser(config)
        .then((_res) => {
          this.cur_employeeUser = _res.result;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取员工对应账户信息失败!" + err,
          });
        });
    },
    getAll() {
      findAllEmployee({})
        .then((_res) => {
          this.employeeList = _res.result;
          for (let i in this.employeeList) {
            this.employeeList[i].birthDate = this.employeeList[
              i
            ].birthDate.substring(0, 10);
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取员工列表失败!" + err,
          });
        });
    },
    handleAdd(type) {
      if (type === false) {
        this.addDialogVisible = false;
        this.addForm = {};
      } else if (type === true) {
        createEmployee(this.addForm)
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
              message: "创建员工失败!" + err,
            });
          });
      }
    },
    addClose() {
      this.addForm = {};
    },
    userClose() {
      this.userdialogVisible = false;
      this.cur_employeeUser = {};
    },
  },
};
</script>

<style scoped>
.commodity-body {
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
