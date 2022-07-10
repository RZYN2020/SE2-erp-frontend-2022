<template>
  <div class="container">
    <el-table
      :data="userStragetyList"
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="effect_level" label="用户级别"></el-table-column>
      <el-table-column prop="product_id" label="赠品ID"></el-table-column>
      <el-table-column prop="product_amount" label="赠品数目"></el-table-column>
      <el-table-column prop="discount" label="折让"></el-table-column>
      <el-table-column prop="coupon" label="代金券金额"></el-table-column>
      <el-table-column prop="begin_date" label="起始时间"></el-table-column>
      <el-table-column prop="end_date" label="截止时间"></el-table-column>

      <el-table-column>
        <template slot="header">
          <div class="top">
            <el-button type="primary" size="mini" @click="dialogVisible = true"
              >新增用户策略</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="创建用户策略"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="addForm" label-width="100px" ref="addForm">
          <el-form-item label="用户级别: " prop="effect_level">
            <el-input v-model="addForm.effect_level"></el-input>
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
          <el-form-item label="折让: " prop="discount">
            <el-input v-model="addForm.discount"></el-input>
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
  userPromotionCreate,
  userPromotionShow,
} from "../../../network/strategy";
export default {
  data() {
    return {
      dialogVisible: false,
      userStragetyList: [],
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
          message: "获取商品列表失败!" + err,
        });
      });
    this.getuserPromotion();
  },
  methods: {
    getuserPromotion() {
      userPromotionShow({})
        .then((_res) => {
          this.userStragetyList = _res.result;
          for (let i in this.userStragetyList) {
            if (
              this.userStragetyList[i].begin_date != null &&
              this.userStragetyList[i].end_date != null
            ) {
              this.userStragetyList[i].begin_date = this.userStragetyList[
                i
              ].begin_date.substring(0, 10);
              this.userStragetyList[i].end_date = this.userStragetyList[
                i
              ].end_date.substring(0, 10);
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取用户优惠列表失败!" + err,
          });
        });
    },
    submitForm() {
      userPromotionCreate(this.addForm)
        .then(() => {
          this.dialogVisible = false;
          this.getuserPromotion();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取用户优惠策略失败!" + err,
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.addForm = {};
          this.dialogVisible = false;
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
</style>
