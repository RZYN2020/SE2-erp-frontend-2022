<template>
  <Layout>
    <Title title="销售退货管理"></Title>
    <el-button
      type="primary"
      size="medium"
      @click="dialogVisible = true"
      v-if="authorization()"
      >制定销售退货单</el-button
    >
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list
              :list="pendingLevel1List"
              :type="1"
              @refresh="getSaleReturn()"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list
              :list="pendingLevel2List"
              :type="2"
              @refresh="getSaleReturn()"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="successList" :type="3" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="failureList" :type="4" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="创建销售退货单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form
          :model="saleReturnForm"
          label-width="100px"
          ref="saleReturnForm"
        >
          <el-form-item label="销售单id: " prop="saleSheetID">
            <el-select
              v-model="saleReturnForm.saleSheetID"
              placeholder="请选择关联的销售单id"
              @change="
                selectSale(
                  completedSale.filter(
                    (item) => item.id === saleReturnForm.saleSheetID
                  )
                )
              "
            >
              <el-option
                v-for="(item, index) in completedSale"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              >
                <el-popover placement="right" width="800" trigger="hover">
                  <el-table :data="completedSale[index].saleSheetContent">
                    <el-table-column
                      width="100"
                      property="id"
                      label="id"
                    ></el-table-column>
                    <el-table-column
                      width="200"
                      property="pid"
                      label="pid"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="unitPrice"
                      label="单价"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="quantity"
                      label="数量"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="totalPrice"
                      label="总价"
                    ></el-table-column>
                    <el-table-column
                      property="remark"
                      label="备注"
                    ></el-table-column>
                  </el-table>
                  <span slot="reference">{{ item.id }}</span>
                </el-popover>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="销售退货清单: "
            v-if="this.saleReturnForm.saleReturnSheetContent.length === 0"
          >
            原销售单无货可退！
          </el-form-item>

          <el-form-item label="销售退货清单: " v-else>
            <div
              v-for="(item, index) in saleReturnForm.saleReturnSheetContent"
              :key="index"
            >
              <el-divider />
              <el-row>
                <span>id: {{ item.pid }}</span>
              </el-row>
              <el-row>
                数量:
                <el-input
                  v-model="item.quantity"
                  size="mini"
                  style="width: 120px"
                ></el-input>
              </el-row>
              <el-row> 单价: {{ item.unitPrice }} </el-row>
              <el-row>
                备注:
                <el-input v-model="item.remark" type="textarea"></el-input>
              </el-row>
            </div>
          </el-form-item>

          <el-form-item label="总备注: ">
            <el-input
              type="textarea"
              v-model="saleReturnForm.remark"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('saleReturnForm')"
          >立即创建</el-button
        >
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import saleReturnList from "./components/SaleReturnList";
import {
  getAllSaleReturn,
  getAllSale,
  createSaleReturn,
} from "../../network/sale";
export default {
  name: "SaleReturnView",
  components: {
    Layout,
    Title,
    saleReturnList,
  },
  data() {
    return {
      activeName: "PENDING_LEVEL_1",
      saleReturnList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      saleReturnForm: {
        saleReturnSheetContent: [
        ],
      },
      completedSale: [],
    };
  },
  mounted() {
    this.getSaleReturn();
    getAllSale({ params: { state: "SUCCESS" } })
      .then((_res) => {
        this.completedSale = _res.result;
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "获取审批完成的销售单列表失败!" + err,
        });
      });

    // 当由红冲复制操作跳转到本页时，执行以下操作
    let sheet = sessionStorage.getItem("sheet");
    if (sheet != null) {
      this.saleReturnForm = JSON.parse(sheet);
      this.dialogVisible = true;
      sessionStorage.setItem("sheet", null);
    }
  },
  methods: {
    authorization() {
      return sessionStorage.getItem("role") != "GM";
    },
    getSaleReturn() {
      getAllSaleReturn({})
        .then((_res) => {
          this.saleReturnList = _res.result;
          this.pendingLevel1List = this.saleReturnList.filter(
            (item) => item.state === "待一级审批"
          );
          this.pendingLevel2List = this.saleReturnList.filter(
            (item) => item.state === "待二级审批"
          );
          this.successList = this.saleReturnList.filter(
            (item) => item.state === "审批完成"
          );
          this.failureList = this.saleReturnList.filter(
            (item) => item.state === "审批失败"
          );
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取销售退货单列表失败!" + err,
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.saleReturnForm = {};
          this.saleReturnForm.saleReturnSheetContent = [];
          done();
        })
        .catch((_) => {});
    },
    selectSale(content) {
      this.saleReturnForm.saleReturnSheetContent = content[0].saleSheetContent;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saleReturnForm.id = null;
          this.saleReturnForm.operator = sessionStorage.getItem("name");
          this.saleReturnForm.totalAmount = null;
          this.saleReturnForm.state = null;
          this.saleReturnForm.saleReturnSheetContent.forEach((item) => {
            item.id = null;
            item.remark = null;
            item.quantity = parseInt(item.quantity);
            item.unitPrice = parseInt(item.unitPrice);
            item.totalPrice = item.quantity * item.unitPrice;
          });
          console.log(this.saleReturnForm);
          createSaleReturn(this.saleReturnForm)
            .then((_res) => {
              if (_res.msg == "Success") {
                this.$message.success("创建成功!");
                this.dialogVisible = false;
                this.saleReturnForm = {};
                this.saleReturnForm.saleReturnSheetContent = [];
                this.getSaleReturn();
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "创建销售退货单失败!" + err,
              });
            });
        }
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