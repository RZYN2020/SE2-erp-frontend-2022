<template>
  <Layout>
    <Title title="期初建账"></Title>
    <div class="container">
      <div class="block">
        <el-date-picker v-model="month" type="month" format="yyyy-MM" placeholder="选择月份">
        </el-date-picker>
        <el-button type="primary" @click="findAccount()">查询</el-button>

        <el-button type="primary" style="float: right" @click="openAccount()"
          >期初建账</el-button
        >
      </div>
      <div class="header">商 品 列 表：</div>
      <el-table
        :data="productList"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="id" label="商品ID"></el-table-column>
        <el-table-column prop="name" label="商品名"></el-table-column>
        <el-table-column prop="type" label="商品型号"></el-table-column>
        <el-table-column prop="quantity" label="商品数量"></el-table-column>
        <el-table-column prop="purchasePrice" label="进价"></el-table-column>
        <el-table-column prop="retailPrice" label="零售价"></el-table-column>
        <el-table-column prop="recentPp" label="最近进价"></el-table-column>
        <el-table-column prop="recentRp" label="最近零售价"></el-table-column>
      </el-table>

      <div class="header">客 户 列 表：</div>
      <el-table
        :data="customerList"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="type" label="分类"></el-table-column>
        <el-table-column prop="level" label="级别"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="zipcode" label="邮编"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column prop="lineOfCredit" label="信用额度"></el-table-column>
        <el-table-column prop="receivable" label="应收"></el-table-column>
        <el-table-column prop="payable" label="应付"></el-table-column>
        <el-table-column prop="operator" label="默认业务员"></el-table-column>
      </el-table>

      <div class="header">账 户 列 表：</div>

      <el-table
        :data="bankAccountList"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="name" label="账户名"></el-table-column>
        <el-table-column prop="amount" label="账户余额"></el-table-column>
      </el-table>
    </div>
  </Layout>
</template>
<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  findOpenningAccounts,
  openOpenningAccounts,
} from "../../network/finacial";
export default {
  name: "OpeningAccounts",
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      month: "2022-07",
      productList: [],
      customerList: [],
      bankAccountList: [],
    };
  },
  methods: {
    findAccount() {
      console.log(this.month);
      let m = ("" + this.month).substring(0, 7);
      let config = {
        params: {
          time: m,
        },
      };
      findOpenningAccounts(config)
        .then((_res) => {
          this.productList = _res.result.productVOList;
          this.customerList = _res.result.customerVOList;
          this.bankAccountList = _res.result.bankAccountVOList;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "期初建账失败" + err,
          });
        });
    },
    openAccount() {
      openOpenningAccounts({})
        .then((_res) => {
          this.$message({
            type: "success",
            message: "期初建账成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "期初建账失败" + err,
          });
        });
    },
  },
};
</script>

<style scoped>
.header {
  font-family: "Helvetica Neue";
  font-size: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
  margin-top: 50px;
  padding: 10px;
}
</style>
