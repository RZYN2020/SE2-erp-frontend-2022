<template>
  <Layout>
    <Title title="库存盘点"></Title>
    <el-button @click="exportExcel">导出Excel</el-button>
    <div class="table-body">
      <el-table :data="cur_list" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }" id="ex_table">
        <el-table-column fixed type="index" label="行号" min-width="12%">
        </el-table-column>
        <el-table-column label="商品Id" min-width="20%">
          <template slot-scope="scope">
            <el-button type="text" @click="showProduct(scope.row)">{{
                scope.row.product.id
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="12%">
        </el-table-column>
        <el-table-column prop="batchId" label="批次" min-width="12%">
        </el-table-column>
        <el-table-column prop="purchasePrice" label="价格" min-width="12%">
        </el-table-column>
        <el-table-column prop="productionDate" label="日期" min-width="12%">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="商品详细信息" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <div>
        <el-table :data="cur_product" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }">
          <el-table-column fixed prop="id" label="编号" min-width="15%">
          </el-table-column>
          <el-table-column prop="name" label="名称" min-width="10%">
          </el-table-column>
          <el-table-column prop="type" label="型号" min-width="15%">
          </el-table-column>
          <el-table-column prop="quantity" label="库存数量" min-width="8%">
          </el-table-column>
          <el-table-column prop="purchasePrice" label="进价" min-width="8%">
          </el-table-column>
          <el-table-column prop="retailPrice" label="零售价" min-width="8%">
          </el-table-column>
          <el-table-column prop="recentPp" label="最近进价" min-width="8%">
          </el-table-column>
          <el-table-column prop="recentRp" label="最近零售价" min-width="8%">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </Layout>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getWarehouseCounting,
  getWarehouseCountingExcel,
} from "@/network/warehouse";

export default {
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      cur_list: [],
      cur_row: {},
      dialogVisible: false,
    };
  },
  computed: {
    cur_product() {
      let temp = [];
      temp.push(this.cur_row.product);
      return temp;
    },
  },
  mounted() {
    getWarehouseCounting().then((_res) => {
      this.cur_list = _res.result;
      this.cur_row = this.cur_list[0];
    });
  },
  methods: {
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
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "库存盘点表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    exportAsExcel() {
      //TODO 导出Excel
      getWarehouseCountingExcel({ responseType: "arraybuffer" }).then(
        (_res) => {
          var blob = new Blob([_res], { type: "application/octet-stream" });
          this.saveAs(blob, "inventory.xlsx");
        }
      );
    },
    saveAs(blob, fileName) {
      var url = window.URL.createObjectURL(blob);

      var anchorElem = document.createElement("a");
      anchorElem.style = "display: none";
      anchorElem.href = url;
      anchorElem.download = fileName;

      document.body.appendChild(anchorElem);
      anchorElem.click();

      document.body.removeChild(anchorElem);

      // On Edge, revokeObjectURL should be called only after
      // a.click() has completed, atleast on EdgeHTML 15.15048
      setTimeout(function () {
        window.URL.revokeObjectURL(url);
      }, 1000);
    },
    showProduct(row) {
      this.cur_row = row;
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
  },
};
</script>

<style scoped>
.table-body {
  width: 100%;
  margin: 20px auto;
}
</style>
