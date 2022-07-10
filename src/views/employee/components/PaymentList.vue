<template>
  <div class="card">
    <el-card
      v-for="(item, index) in list"
      :index="item.index"
      :key="item.id"
      shadow="hover"
    >
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>id: </strong>{{ item.id }}</span>
            <el-button
              v-if="authorization() === 1"
              style="margin-left: 10px"
              type="success"
              icon="el-icon-check"
              circle
              size="mini"
              @click="approval(item.id)"
            ></el-button>
            <el-button
              v-if="authorization() === 1"
              type="danger"
              icon="el-icon-close"
              circle
              size="mini"
              @click="deny(item.id)"
            ></el-button>
            <el-button
              v-if="authorization() === 2"
              style="margin-left: 10px"
              type="primary"
              icon="el-icon-check"
              circle
              size="mini"
              @click="approval(item.id)"
            ></el-button>
            <el-button
              v-if="authorization() === 2"
              type="danger"
              icon="el-icon-close"
              circle
              size="mini"
              @click="deny(item.id)"
            ></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 3" effect="dark" type="success"
                >审核通过</el-tag
              >
              <el-tag v-if="type === 4" effect="dark" type="danger"
                >审核未通过</el-tag
              >
            </span>
          </el-col>
          <el-col :span="6">
            <el-button
              class="button"
              type="text"
              v-if="!showAll[index]"
              @click="changeState(index)"
            >
              展开
            </el-button>
            <el-button
              class="button"
              type="text"
              v-if="showAll[index]"
              @click="changeState(index)"
            >
              收起</el-button
            >
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>员工id: </strong>{{ item.employee_id }}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>员工名称: </strong>{{ item.employee_name }}</span>
          </el-col>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <el-row>
            <span><strong>基本工资: </strong>{{ item.basic_salary }}</span>
          </el-row>
          <el-row>
            <span><strong>岗位工资: </strong>{{ item.job_salary }}</span>
          </el-row>
          <el-row>
            <span><strong>提成: </strong>{{ item.commission }}</span>
          </el-row>
          <el-row>
            <el-col :span="7">
              <span><strong>个人所得税: </strong>{{ item.tax.income_tax }}</span>
            </el-col>
            <el-col :span="7">
              <span><strong>失业保险: </strong>{{ item.tax.insurance }}</span>
            </el-col>
            <el-col :span="7">
              <span><strong>住房公积金: </strong>{{ item.tax.fund }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { firstApproval, secondApproval } from "../../../network/employee";
export default {
  name: "PurchaseList",
  props: {
    list: Array,
    type: Number,
  },
  data() {
    return {
      showAll: [],
    };
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false);
  },
  methods: {
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index]);
    },
    authorization() {
      if (this.type === 1 && sessionStorage.getItem("role") === "HR") {
        return 1;
      } else if (this.type === 2 && sessionStorage.getItem("role") === "GM") {
        return 2;
      }
    },
    approval(id) {
      let config = {
        params: {
          id: id,
          state: this.type === 1 ? "PENDING_LEVEL_2" : "SUCCESS",
        },
      };
      if (this.type === 1) {
        firstApproval(config).then((res) => {
          console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH");
          this.$emit("refresh");
          this.$message({
            message: "操作成功!",
            type: "success",
          }).catch((err) => {
            this.$message({
              type: "error",
              message: "审批失败!" + err,
            });
          });
        });
      } else {
        secondApproval(config)
          .then((res) => {
            this.$emit("refresh");
            this.$message({
              message: "操作成功!",
              type: "success",
            });
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "审批失败!" + err,
            });
          });
      }
    },
    deny(id) {
      let config = {
        params: {
          id: id,
          state: "FAILURE",
        },
      };
      if (this.type === 1) {
        firstApproval(config)
          .then((res) => {
            this.$emit("refresh");
            this.$message({
              message: "操作成功!",
              type: "success",
            });
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "审批失败!" + err,
            });
          });
      } else {
        secondApproval(config)
          .then((res) => {
            this.$emit("refresh");
            this.$message({
              message: "操作成功!",
              type: "success",
            });
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "审批失败!" + err,
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;

  .button {
    float: right;
    padding: 3px 0;
  }
}

.el-card {
  margin-bottom: 20px;
  background: #eef7f2;
}
</style>