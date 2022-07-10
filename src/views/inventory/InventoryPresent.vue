<template>
  <Layout>
    <Title title="库存赠送单"></Title>
    <!-- （库存赠送单，选择一些库存中的商品进行赠送，单据提交后从库存中减去这些商品。） -->
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pending.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <present-list :list="pending" :type="1" @refresh="getAllList()" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <present-list :list="successList" :type="2" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <present-list :list="failureList" :type="3" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import presentList from "./components/presentList";
import { getInventoryPresent } from "../../network/purchase";
export default {
  name: "inventoryPresentView",
  components: {
    Layout,
    Title,
    presentList,
  },
  data() {
    return {
      activeName: "PENDING",
      pending: [],
      grantList: [],
      successList: [],
      failureList: [],
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      getInventoryPresent({})
        .then((_res) => {
          this.grantList = _res.result;
          // if (this.grantList ==)
          this.pending = this.grantList.filter(
            (item) => item.state === "待审批"
          );
          console.log(this.pending);
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
            message: "获取库存赠送单失败!" + err,
          });
        });
    },
    approve() {
      approveInventoryPresent().catch((err) => {
        this.$message({
          type: "error",
          message: "审批失败!" + err,
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
