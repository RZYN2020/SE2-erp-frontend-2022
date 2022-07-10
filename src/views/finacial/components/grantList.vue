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
              v-if="authorization()"
              style="margin-left: 10px"
              type="success"
              icon="el-icon-check"
              circle
              size="mini"
              @click="approval(item.id)"
            ></el-button>
            <el-button
              v-if="authorization()"
              type="danger"
              icon="el-icon-close"
              circle
              size="mini"
              @click="deny(item.id)"
            ></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 2" effect="dark" type="success"
                >审核通过</el-tag
              >
              <el-tag v-if="type === 3" effect="dark" type="danger"
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
            <span><strong>员工id: </strong>{{ item.employeeId }}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>员工名称: </strong>{{ item.employeeName }}</span>
          </el-col>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <el-row>
            <span><strong>实发工资: </strong>{{ item.realSalary }}</span>
          </el-row>
          <el-row>
            <span><strong>应发工资: </strong>{{ item.salaryBeforeTax }}</span>
          </el-row>
          <el-row>
            <span><strong>提成: </strong>{{ item.commission }}</span>
          </el-row>
          <el-row>
            <el-col>
              <span><strong>个人所得税: </strong>{{ item.incomeTax }}</span>
            </el-col>
            <el-col>
              <span><strong>失业保险: </strong>{{ item.insurance }}</span>
            </el-col>
            <el-col>
              <span><strong>住房公积金: </strong>{{ item.fund }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Approval } from "../../../network/finacial";
export default {
  name: "grantList",
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
      if (sessionStorage.getItem("role") === "GM" && this.type === 1) {
        return true;
      }
      return false;
    },
    approval(id) {
      let config = {
        params: {
          id: id,
          state: "SUCCESS",
        },
      };
      Approval(config)
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
    },
  },
  deny(id) {
    let config = {
      params: {
        id: id,
        state: "FAILURE",
      },
    };
    Approval(config)
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