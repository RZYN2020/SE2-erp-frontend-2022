<template>
  <Layout>
    <Title title="销售明细表"></Title>
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
        :data="all_detail_list"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        id="ex_table"
      >
        <el-table-column
          prop="sale_time"
          sortable
          label="销售时间"
        ></el-table-column>

        <el-table-column prop="record_type" label="明细类型"></el-table-column>

        <el-table-column
          prop="product_name"
          label="商品名称"
          :filters="product_name_list"
          :filter-method="filterProduct"
        >
        </el-table-column>

        <el-table-column prop="product_type" label="商品类型"></el-table-column>

        <el-table-column
          prop="customer_id"
          label="客户ID"
          :filters="customer_id_list"
          :filter-method="filterCustomer"
        >
        </el-table-column>

        <el-table-column
          prop="operator"
          label="操作员"
          :filters="operator_list"
          :filter-method="filterOperator"
        >
        </el-table-column>

        <el-table-column prop="amount" label="数量"></el-table-column>

        <el-table-column
          prop="unit_price"
          label="单价（元/件）"
        ></el-table-column>

        <el-table-column
          prop="total_price"
          label="总价（元）"
        ></el-table-column>

        <el-table-column>
          <template slot="header">
            <div class="top">
              <el-button type="primary" size="mini" @click="exportExcel"
                >导出EXCEL</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getSaleDetail } from "../../network/finacial";

export default {
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      all_detail_list: [],
      all_detail_list_for_dateFilter: [],
      dateRange: "",

      product_name_list: [],
      customer_id_list: [],
      operator_list: [],
    };
  },
  mounted() {
    getSaleDetail()
      .then((_res) => {
        this.all_detail_list = _res.result;
        for (let i in this.all_detail_list) {
          if (this.all_detail_list[i]["sale_time"] != null) {
            this.all_detail_list[i]["sale_time"] = this.all_detail_list[i][
              "sale_time"
            ].substring(0, 10);
          }
        }
        this.all_detail_list_for_dateFilter = this.all_detail_list;
        this.product_name_list = this.getAllProduct(this.all_detail_list);
        this.customer_id_list = this.getAllCustomer(this.all_detail_list);
        this.operator_list = this.getAllOperator(this.all_detail_list);
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "获取销售明细表失败!" + err,
        });
      });
  },
  methods: {
    filterDateRange() {
      let start = this.dateRange[0];
      let end = this.dateRange[1];
      this.all_detail_list = this.all_detail_list_for_dateFilter.filter(
        (item) => {
          if (item.sale_time != undefined) {
            let date = new Date(String(item.sale_time).slice(0, 10));
            return date != undefined && date >= start && date <= end;
          }
          return false;
        }
      );
    },
    resetDateRange() {
      this.all_detail_list = this.all_detail_list_for_dateFilter;
      this.dateRange = "";
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
        wb = XLSX.utils.table_to_book(document.querySelector("#ex_table"));
      }
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "销售明细表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    getAllProduct(detail_list) {
      let p_list = [];
      detail_list.forEach((item) => {
        if (p_list.length === 0) {
          let p = {
            text: item.product_name,
            value: item.product_name,
          };
          p_list.push(p);
        } else {
          let already_in = false;
          p_list.forEach((product) => {
            if (item.product_name === product.text) {
              already_in = true;
              // break;
            }
          });
          if (already_in === false) {
            let p = {
              text: item.product_name,
              value: item.product_name,
            };
            p_list.push(p);
          }
        }
      });
      return p_list;
    },
    getAllCustomer(detail_list) {
      let c_list = [];
      detail_list.forEach((item) => {
        if (c_list.length === 0) {
          let c = {
            text: item.customer_id,
            value: item.customer_id,
          };
          c_list.push(c);
        } else {
          let already_in = false;
          c_list.forEach((customer) => {
            if (item.customer_id === customer.text) {
              already_in = true;
            }
          });
          if (already_in === false) {
            let c = {
              text: item.customer_id,
              value: item.customer_id,
            };
            c_list.push(c);
          }
        }
      });
      return c_list;
    },
    getAllOperator(detail_list) {
      let o_list = [];
      detail_list.forEach((item) => {
        if (o_list.length === 0) {
          let o = {
            text: item.operator,
            value: item.operator,
          };
          o_list.push(o);
        } else {
          let already_in = false;
          o_list.forEach((ope) => {
            if (item.operator === ope.text) {
              already_in = true;
            }
          });
          if (already_in === false) {
            let o = {
              text: item.operator,
              value: item.operator,
            };
            o_list.push(o);
          }
        }
      });
      return o_list;
    },
    filterProduct(value, row) {
      return row.product_name === value;
    },
    filterCustomer(value, row) {
      return row.customer_id === value;
    },
    filterOperator(value, row) {
      return row.operator === value;
    },
  },
};
</script>

<style scoped>
</style>
