<template>
  <Layout>
    <Title title="经营历程表"></Title>
    <div class="history">
      <div class="block">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        &nbsp;
        <el-button
          type="primary"
          size="small"
          icon="search"
          @click="filterDateRange()"
          >筛选日期</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="search"
          @click="resetDateRange()"
          >重置日期</el-button
        >
      </div>
      <br />
      <el-table
        :data="allSheetList"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        id="ex_table"
      >
        <el-table-column fixed prop="id" label="单据ID"> </el-table-column>
        <el-table-column
          prop="type"
          label="单据类型"
          :filters="sheetTypes"
          :filter-method="filterType"
        >
        </el-table-column>
        <el-table-column prop="create_time" sortable label="单据创建时间">
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="客户"
          :filters="customers"
          :filter-method="filterCustomers"
        >
        </el-table-column>
        <el-table-column
          prop="operator"
          label="业务员"
          :filters="userList"
          :filter-method="filterOpreators"
        >
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <div class="top">
              <el-button type="primary" size="mini" @click="exportExcel"
                >导出EXCEL</el-button
              >
            </div>
          </template>
          <template slot-scope="scope">
            <el-button @click="showDetails(scope.row)" type="text" size="small">
              查看单据细节
            </el-button>
            <el-button
              v-if="authorization()"
              @click="reverse(scope.row)"
              type="text"
              size="small"
            >
              红冲
            </el-button>
            <el-button
              v-if="authorization()"
              @click="reverseCopy(scope.row)"
              type="text"
              size="small"
            >
              红冲复制
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <AllSheetsManager
        :curVisible="curVisible"
        :visibleTable="visibleTable"
        @detailClose="detailClose"
      >
      </AllSheetsManager>
    </div>
  </Layout>
</template>

<script>
import AllSheetsManager from "./components/AllSheetsManager.vue";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getAllSale,
  getAllSaleReturn,
  createSale,
  createSaleReturn,
} from "../../network/sale";
import {
  getAllPurchase,
  getAllPurchaseReturn,
  getAllCustomer,
  createPurchase,
  createPurchaseReturn,
} from "../../network/purchase";
import { findAllPayment } from "../../network/employee";
import {
  findAllGrantSheet,
  findAllIncomeSheet,
  findAllOutcomeSheet,
} from "../../network/finacial";
import { findAllUser } from "../../network/auth";

export default {
  components: {
    AllSheetsManager,
    Layout,
    Title,
  },
  data() {
    return {
      temp: true,
      dateRange: "",
      sheetInfo: [],
      visibleTable: {},
      curVisible: [],
      allSheet: {
        // 销售类单据
        saleSheetList: [],
        saleReturnSheetList: [],

        // 进货类单据
        purchaseSheetList: [],
        purchaseReturnSheetList: [],

        // 财务类单据
        paymentSheet: [], //工资单
        grantSheet: [], //工资发放单 // GM
        incomeSheet: [], // GM
        outcomeSheet: [], // GM
      },
      customersMap: [],
      allSheetListForDateFilterBackup: [],
      allSheetList: [],
      sheetInfo: [],

      sheetTypes: [],
      customers: [],
      customersfillOver: false,

      userList: [],
      reverseFuncList: {},
    };
  },
  mounted() {
    // 使用表驱动方法来保存不同种单据相关信息
    this.sheetInfo.push([getAllSale, "saleSheetList", "销售单"]);
    this.sheetInfo.push([
      getAllSaleReturn,
      "saleReturnSheetList",
      "销售退货单",
    ]);
    this.sheetInfo.push([getAllPurchase, "purchaseSheetList", "进货单"]);
    this.sheetInfo.push([
      getAllPurchaseReturn,
      "purchaseReturnSheetList",
      "进货退货单",
    ]);
    this.sheetInfo.push([findAllPayment, "paymentSheet", "工资单"]);
    this.sheetInfo.push([findAllGrantSheet, "grantSheet", "工资发放单"]);
    this.sheetInfo.push([findAllIncomeSheet, "incomeSheet", "收款单"]);
    this.sheetInfo.push([findAllOutcomeSheet, "outcomeSheet", "付款单"]);
    for (let i in this.sheetInfo) {
      this.visibleTable[this.sheetInfo[i][2]] = false;

      let type = {
        text: this.sheetInfo[i][2],
        value: this.sheetInfo[i][2],
      };
      this.sheetTypes.push(type);
    }
    this.reverseVisibleTable = this.visibleTable;
    this.getAll();
    this.fillReverseFuncList();
  },
  methods: {
    // 使用await来保证信息的依赖关系与获取关系相同
    async getAll() {
      await this.getAllSheet();
      this.allSheetList = [];
      for (let i in this.allSheet) {
        this.allSheetList = this.allSheetList.concat(this.allSheet[i]);
      }
      this.allSheetList = this.allSheetList.filter(
        (item) => item.state === "审批完成"
      );
      findAllUser({})
        .then((_res) => {
          for (let i in _res.result) {
            let user = {
              text: _res.result[i]["name"],
              value: _res.result[i]["name"],
            };
            this.userList.push(user);
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "用户列表获取失败!" + err,
          });
        });
      await getAllCustomer({ params: { type: "SUPPLIER" } })
        .then((_res) => {
          this.customersMap = this.customersMap.concat(_res.result);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "供货商列表失败!" + err,
          });
        });
      await getAllCustomer({ params: { type: "SELLER" } })
        .then((_res) => {
          this.customersMap = this.customersMap.concat(_res.result);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "销售商列表获取失败!" + err,
          });
        });
      this.fillCustomers();
    },
    fillCustomers() {
      let temp = [];
      for (let i in this.customersMap) {
        temp[this.customersMap[i].id] = this.customersMap[i].name;
      }
      this.customersMap = temp;
      for (let i in this.allSheetList) {
        if (this.allSheetList[i].supplier != undefined) {
          this.allSheetList[i]["supplierName"] =
            this.customersMap[this.allSheetList[i]["supplier"]];
        }
      }
      this.allSheetListForDateFilterBackup = this.allSheetList;

      if (!this.customersfillOver) {
        for (let i in this.customersMap) {
          if (this.customersMap[i] != undefined) {
            let type = {
              text: this.customersMap[i],
              value: this.customersMap[i],
            };
            this.customers.push(type);
          }
        }
        this.customersfillOver = true;
      }
    },
    // 使用promise.all来保证同步约束情况下各个请求的并行执行，提高效率
    async getAllSheet() {
      let promises = [];
      for (let i in this.sheetInfo) {
        promises.push(
          this.getList(
            this.sheetInfo[i][0],
            this.sheetInfo[i][1],
            this.sheetInfo[i][2]
          )
        );
      }
      await Promise.all(promises);
    },
    async getList(fun, name, type) {
      await fun({})
        .then((_res) => (this.allSheet[name] = _res.result))
        .then(() => {
          for (let i in this.allSheet[name]) {
            this.allSheet[name][i]["type"] = type;
            if (this.allSheet[name][i]["create_time"] != undefined) {
              this.allSheet[name][i]["create_time"] = this.allSheet[name][i][
                "create_time"
              ].substring(0, 10);
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取" + name + "失败!" + err,
          });
        });
    },
    filterType(value, row) {
      return row.type === value;
    },
    filterOpreators(value, row) {
      return row.operator === value;
    },
    filterCustomers(value, row) {
      return row.supplierName === value;
    },
    filterDateRange() {
      let start = this.dateRange[0];
      let end = this.dateRange[1];
      console.log(start);
      console.log(end);
      this.allSheetList = this.allSheetListForDateFilterBackup.filter(
        (item) => {
          if (item.create_time != undefined) {
            let date = new Date(String(item.create_time).slice(0, 10));
            if (date != undefined) {
              console.log(date);
            }
            return date != undefined && date >= start && date <= end;
          }
          return false;
        }
      );
    },
    resetDateRange() {
      this.allSheetList = this.allSheetListForDateFilterBackup;
      console.log(this.allSheetList);
    },
    showDetails(row) {
      this.curVisible = [row];
      this.visibleTable[row.type] = true;
    },
    detailClose() {
      this.curVisible = null;
      for (let i in this.visibleTable) {
        this.visibleTable[i] = false;
      }
    },
    authorization() {
      return sessionStorage.getItem("role") != "GM";
    },
    exportExcel() {
      let fix = document.querySelector(".el-table__fixed");
      let wb;
      if (fix) {
        //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
        wb = XLSX.utils.table_to_book(
          document.querySelector("#ex_table").removeChild(fix)
        );
        document.querySelector("#ex_table").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#ex_able"));
      }
      console.log(wb.Sheets);
      wb.Sheets.Sheet1["!ref"] = wb.Sheets.Sheet1["!ref"].replace("F", "E");
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",

        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "经营历程表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 使用表驱动发法来存储不同单据对红冲和红冲复制操作的处理
    // 目前实现了 进货 进货销售 退货 退货销售 的红冲和红冲复制
    fillReverseFuncList() {
      // 每个 reverseFunctionList第一个元素时红冲操作函数，第二个是红冲复制操作函数
      // 两个函数由高阶函数生成
      this.reverseFuncList["销售单"] = new Array(
        this.rfGen(createSale, (sheet) => {
          let sheetCpopy = JSON.parse(JSON.stringify(sheet));
          for (let i in sheetCpopy.saleSheetContent) {
            sheetCpopy.saleSheetContent[i].quantity =
              -sheetCpopy.saleSheetContent[i].quantity;
          }
          return sheetCpopy;
        }),
        this.rcfGen("/saleView")
      );

      this.reverseFuncList["销售退货单"] = new Array(
        this.rfGen(createSaleReturn, (sheet) => {
          let sheetCpopy = JSON.parse(JSON.stringify(sheet));
          for (let i in sheetCpopy.saleReturnSheetContent) {
            sheetCpopy.saleReturnSheetContent[i].quantity =
              -sheetCpopy.saleReturnSheetContent[i].quantity;
          }
          return sheetCpopy;
        }),
        this.rcfGen("/saleReturnView")
      );

      this.reverseFuncList["进货单"] = new Array(
        this.rfGen(createPurchase, (sheet) => {
          let sheetCpopy = JSON.parse(JSON.stringify(sheet));
          for (let i in sheetCpopy.purchaseSheetContent) {
            sheetCpopy.purchaseSheetContent[i].quantity =
              -sheetCpopy.purchaseSheetContent[i].quantity;
          }
          return sheetCpopy;
        }),
        this.rcfGen("/purchaseView")
      );

      this.reverseFuncList["进货退货单"] = new Array(
        this.rfGen(createPurchaseReturn, (sheet) => {
          let sheetCpopy = JSON.parse(JSON.stringify(sheet));
          for (let i in sheetCpopy.purchaseReturnsSheetContent) {
            sheetCpopy.purchaseReturnsSheetContent[i].quantity =
              -sheetCpopy.purchaseReturnsSheetContent[i].quantity;
          }
          return sheetCpopy;
        }),
        this.rcfGen("/purchaseReturnView")
      );

      this.reverseFuncList["工资单"] = new Array(
        this.dummpyFun,
        this.dummpyFun
      );
      this.reverseFuncList["工资发放单"] = new Array(
        this.dummpyFun,
        this.dummpyFun
      );
      this.reverseFuncList["收款单"] = new Array(
        this.dummpyFun,
        this.dummpyFun
      );
      this.reverseFuncList["付款单"] = new Array(
        this.dummpyFun,
        this.dummpyFun
      );
    },
    dummpyFun(SHEET) {
      this.$message({
        type: "error",
        message: "暂不支持该操作",
      });
    },
    // 生成红冲函数的高阶函数
    rfGen(createFun, reverseFun) {
      return (sheet) => {
        console.log(sheet);
        createFun(reverseFun(sheet));
      };
    },
    // 生成红冲复制操作的高阶函数
    // 红冲复制时跳转到改单据管理页面，要复制的数据通过sessionStorage传递
    rcfGen(path) {
      return (sheet) => {
        sessionStorage.setItem("sheet", JSON.stringify(sheet));
        this.$router.push(path);
      };
    },
    reverseCopy(sheet) {
      this.reverseFuncList[sheet.type][1](sheet);
    },
    reverse(sheet) {
      this.$confirm("确定生成红冲？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(sheet);
        this.reverseFuncList[sheet.type][0](sheet);
        this.$message({
          type: "success",
          message: "红冲成功!",
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
