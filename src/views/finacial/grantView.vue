<template>
  <Layout>
    <Title title="工资发放单管理"></Title>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pending.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <grant-list :list="pending" :type="1" @refresh="getgrant()" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <grant-list :list="successList" :type="2" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <grant-list :list="failureList" :type="3" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import grantList from "./components/grantList";
import { findAllGrantSheet } from "../../network/finacial";
export default {
  name: "grantView",
  components: {
    Layout,
    Title,
    grantList,
  },
  data() {
    return {
      activeName: "PENDING",
      grantList: [],
      pending: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
    };
  },
  mounted() {
    this.getgrant();
  },
  methods: {
    getgrant() {
      findAllGrantSheet({})
        .then((_res) => {
          this.grantList = _res.result;
          this.pending = this.grantList.filter(
            (item) => item.state === "待审批"
          );
          this.successList = this.grantList.filter(
            (item) => item.state === "审批完成"
          );
          this.failureList = this.grantList.filter(
            (item) => item.state === "审批失败"
          );
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取工资发放单失败!" + err,
          });
        });
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