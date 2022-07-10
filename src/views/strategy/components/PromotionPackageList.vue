<template>
  <div>
    <el-button
      type="primary"
      size="medium"
      @click="dialogVisible = true"
      style="float: right"
      >制定特价包</el-button
    >
    <div v-if="promotionPackageList.length === 0">
      <el-empty description="暂无数据"></el-empty>
    </div>
    <div v-else>
      <div class="card">
        <el-card
          v-for="item in promotionPackageList"
          :key="item.id"
          shadow="hover"
        >
          <div>
            <el-row>
              <span><strong>起始时间: </strong>{{ item.begin_date }}</span>
            </el-row>
            <el-row>
              <span><strong>截止时间: </strong>{{ item.end_date }}</span>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="6">
                <span><strong>满减: </strong>{{ item.voucher_amount }}</span>
              </el-col>
            </el-row>
          </div>
          <el-table
            :data="item.productList"
            style="width: 100%"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="name" label="商品名"></el-table-column>
            <el-table-column prop="id" label="商品"></el-table-column>
            <el-table-column prop="amount" label="数量"></el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>

    <el-dialog
      title="创建特价包"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="addForm" label-width="100px" ref="addForm">
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
          <el-form-item label="满减: " prop="voucher_amount">
            <el-input v-model="addForm.voucher_amount"></el-input>
          </el-form-item>

          <el-form-item
            v-for="(item, index) in addForm.productList"
            :key="index"
            :label="'商品' + index"
          >
            <div>
              <el-select
                v-model="item.id"
                placeholder="请选择商品"
                style="width: 40%; margin-right: 5%"
              >
                <el-option
                  v-for="item in commordiryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-input
                v-model="item.amount"
                style="width: 50%; margin-right: 5%"
                placeholder="请输入商品数量"
              ></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-button
                type="text"
                size="small"
                @click="addProduct"
                v-if="index === addForm.productList.length - 1"
                >添加
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.prevent="removeProduct(item)"
                v-if="index !== 0"
                >删除</el-button
              >
            </div>
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
  packagePromotionCreate,
  packagePromotionShow,
} from "../../../network/strategy";
export default {
  data() {
    return {
      dialogVisible: false,
      promotionPackageList: [],
      commordiryList: [],
      addForm: { productList: [{}] },
    };
  },
  async mounted() {
    await getAllCommodity({})
      .then((_res) => {
        console.log(this.commordiryList);
        this.commordiryList = _res.result;
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "获取商品列表失败!" + err,
        });
      });
    this.getPromotionPackageList();
  },
  methods: {
    getCommodityName(id) {
      console.log(this.commordiryList);
      for (let i in this.commordiryList) {
        console.log(id + "vs" + this.commordiryList[i].id);
        if (this.commordiryList[i].id === id) {
          return this.commordiryList[i].name;
        }
      }
      return "未知商品";
    },
    getPromotionPackageList() {
      // 以下方法对后端传过来的List进行重新构造
      // 以方便前端展示，具体有：
      // + 重新组织时间格式
      // + 将 product_id和product_amount两个list合并为一个productList
      packagePromotionShow({})
        .then((_res) => {
          this.promotionPackageList = _res.result;
          for (let j in this.promotionPackageList) {
            this.promotionPackageList[j]["productList"] = [];
            for (
              let i = 0;
              i < this.promotionPackageList[j].product_id.length;
              i++
            ) {
              let name = this.getCommodityName(
                this.promotionPackageList[j].product_id[i]
              );
              this.promotionPackageList[j]["productList"].push({
                name: name,
                id: this.promotionPackageList[j].product_id[i],
                amount: this.promotionPackageList[j].product_amount[i],
              });
            }
          }
          for (let i in this.promotionPackageList) {
            if (
              this.promotionPackageList[i].begin_date != null &&
              this.promotionPackageList[i].end_date != null
            ) {
              this.promotionPackageList[i].begin_date =
                this.promotionPackageList[i].begin_date.substring(0, 10);
              this.promotionPackageList[i].end_date = this.promotionPackageList[
                i
              ].end_date.substring(0, 10);
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取特价包列表失败!" + err,
          });
        });
    },
    addProduct() {
      this.addForm.productList.push({});
    },
    removeProduct(item) {
      var index = this.addForm.productList.indexOf(item);
      if (index !== -1) {
        this.addForm.productList.splice(index, 1);
      }
    },
    submitForm() {
      this.addForm["product_id"] = [];
      this.addForm["product_amount"] = [];
      for (let i = 0; i < this.addForm.productList.length; i++) {
        this.addForm["product_id"].push(this.addForm["productList"][i]["id"]);
        this.addForm["product_amount"].push(
          this.addForm["productList"][i]["amount"]
        );
      }
      packagePromotionCreate(this.addForm)
        .then(() => {
          this.getPromotionPackageList();
          this.dialogVisible = false;
          this.addForm = {};
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "创建特价包失败!" + err,
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          (this.addForm = { productList: [{}] }), done();
        })
        .catch((_) => {});
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
</style>
