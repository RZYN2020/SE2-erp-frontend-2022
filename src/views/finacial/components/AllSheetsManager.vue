<template>
  <div>
    <el-dialog
      title="销售单"
      :visible.sync="visibleTable.销售单"
      width="90%"
      :before-close="handleClose"
    >
      <SaleList :list="curVisible" :type="3"></SaleList>
    </el-dialog>

    <el-dialog
      title="销售退货单"
      :visible.sync="visibleTable.销售退货单"
      width="90%"
      :before-close="handleClose"
    >
      <SaleReturnList :list="curVisible" :type="3"></SaleReturnList>
    </el-dialog>

    <el-dialog
      title="进货单"
      :visible.sync="visibleTable.进货单"
      width="90%"
      :before-close="handleClose"
    >
      <PurchaseList :list="curVisible" :type="3"></PurchaseList>
    </el-dialog>

    <el-dialog
      title="进货退货单"
      :visible.sync="visibleTable.进货退货单"
      width="90%"
      :before-close="handleClose"
    >
      <PurchaseReturnList :list="curVisible" :type="3"></PurchaseReturnList>
    </el-dialog>

    <el-dialog
      title="工资单"
      :visible.sync="visibleTable.工资单"
      width="90%"
      :before-close="handleClose"
    >
      <PaymentList :list="curVisible" :type="3"></PaymentList>
    </el-dialog>

    <el-dialog
      title="工资发放单"
      :visible.sync="visibleTable.工资发放单"
      width="90%"
      :before-close="handleClose"
    >
      <grantList :list="curVisible" :type="3"></grantList>
    </el-dialog>

    <el-dialog
      title="收款单"
      :visible.sync="visibleTable.收款单"
      width="90%"
      :before-close="handleClose"
    >
      <IncomeList :list="curVisible" :type="3"></IncomeList>
    </el-dialog>

    <el-dialog
      title="退款单"
      :visible.sync="visibleTable.退款单"
      width="90%"
      :before-close="handleClose"
    >
      <OutcomeList :list="curVisible" :type="3"></OutcomeList>
    </el-dialog>
  </div>
</template>

<script>
import SaleList from "../../sale/components/SaleList.vue";
import SaleReturnList from "../../sale/components/SaleReturnList.vue";
import PurchaseList from "../../purchase/components/PurchaseList.vue";
import PurchaseReturnList from "../../purchase/components/PurchaseReturnList.vue";
import PaymentList from "../../employee/components/PaymentList.vue";
import grantList from "../../finacial/components/grantList.vue";
import IncomeList from "../../finacial/components/IncomeList.vue";
import OutcomeList from "../../finacial/components/OutcomeList.vue";

export default {
  name: "AllSheetsManager",
  props: {
    visibleTable: Object,
    curVisible: Array,
  },
  components: {
    SaleList,
    SaleReturnList,
    PurchaseList,
    PurchaseReturnList,
    PaymentList,
    grantList,
    IncomeList,
    OutcomeList,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleClose() {
        this.$emit('detailClose');

    },
  },
};
</script>
