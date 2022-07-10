<template>
  <Layout>
    <Title title="策略制定"></Title>
    <div class="container">
      <el-tabs :stretch="true" v-model="defaultTab">
        <el-tab-pane
          label="针对不同级别的用户制定促销策略"
          name="针对不同级别的用户制定促销策略"
        >
          <UserStrategyTable></UserStrategyTable>
        </el-tab-pane>
        <el-tab-pane label="制定特价包" name="制定特价包">
          <PromotionPackageList></PromotionPackageList>
        </el-tab-pane>
        <el-tab-pane
          label="针对不同总价的促销策略"
          name="针对不同总价的促销策略"
        >
        <PriceStragetyTable></PriceStragetyTable>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layout>
</template>
<script>
import UserStrategyTable from "./components/UserStrategyTable";
import PromotionPackageList from "./components/PromotionPackageList.vue"
import PriceStragetyTable from "./components/PriceStragetyTable"
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
// 将不策略选择UI实现在不同的组件中
export default {
  name: "StrategyView",
  components: {
    UserStrategyTable,
    PromotionPackageList,
    PriceStragetyTable,
    Layout,
    Title,
  },
  data() {
    return {
      defaultTab: "针对不同级别的用户制定促销策略",
    }
  }
};
</script>

<style scoped>
</style>
