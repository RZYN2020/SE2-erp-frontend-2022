<template>
  <div class="container">
    <el-table
      :data="priceStragetyList"
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="effect_price" label="生效价格"></el-table-column>
      <el-table-column prop="product_id" label="赠品ID"></el-table-column>
      <el-table-column prop="product_amount" label="赠品数目"></el-table-column>
      <el-table-column prop="coupon" label="代金券金额"></el-table-column>
      <el-table-column prop="begin_date" label="起始时间"></el-table-column>
      <el-table-column prop="end_date" label="截止时间"></el-table-column>
      <el-table-column>
        <template slot="header">
          <div class="top">
            <el-button type="primary" size="mini" @click="dialogVisible = true"
              >新增总价策略</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="创建总价策略"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="addForm" label-width="100px" ref="addForm">
          <el-form-item label="生效价格: " prop="effect_price">
            <el-input v-model="addForm.effect_price"></el-input>
          </el-form-item>
          <el-form-item label="赠品: " prop="product_id">
            <el-select v-model="addForm.product_id" placeholder="请选择赠品">
              <el-option
                v-for="item in commordiryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="赠品数目: " prop="product_amount">
            <el-input v-model="addForm.product_amount"></el-input>
          </el-form-item>


          <el-form-item label="代金券金额: " prop="coupon">
            <el-input v-model="addForm.coupon"></el-input>
          </el-form-item>

          <el-form-item label="起始时间: " prop="begin_date">
            <el-date-picker
              v-model="addForm.begin_date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="截至时间: " prop="end_date">
            <el-date-picker
              v-model="addForm.end_date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCommodity } from "../../../network/commodity";

import {
  pricePromotionCreate,
  pricePromotionShow,
} from "../../../network/strategy";

export default {
  data() {
    return {
      dialogVisible: false,
      priceStragetyList: [],
      commordiryList: [],
      addForm: {},
    };
  },
  mounted() {
    getAllCommodity({})
      .then((_res) => {
        this.commordiryList = _res.result;
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "审批失败!" + err,
        });
      });
    this.getPricePromotion();
  },
  methods: {
    getPricePromotion() {
      pricePromotionShow({})
        .then((_res) => {
          this.priceStragetyList = _res.result;
          for (let i in this.priceStragetyList) {
            if (
              this.priceStragetyList[i].begin_date != null &&
              this.priceStragetyList[i].end_date != null
            ) {
              this.priceStragetyList[i].begin_date = this.priceStragetyList[
                i
              ].begin_date.substring(0, 10);
              this.priceStragetyList[i].end_date = this.priceStragetyList[
                i
              ].end_date.substring(0, 10);
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取总价优惠列表失败!" + err,
          });
        });
    },
    submitForm() {
      pricePromotionCreate(this.addForm)
        .then(() => {
          this.dialogVisible = false;
          this.getPricePromotion();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "创建总价优惠策略失败!" + err,
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.addForm = {};
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
</style>
