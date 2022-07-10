<template>
  <Layout>
    <Title title="经营情况表"></Title>
    <div class="block">
      <span><strong>请选择一个时间段: </strong></span>&nbsp;
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker
      >&nbsp;
      <el-button @click="getSheet">查询</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :offset="0">
        <div class="header">收 入 信 息：</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          折让后总收入：{{ BSinfo.businessIncomeVO.incomeAfterDiscount }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          折扣：{{ BSinfo.businessIncomeVO.discount }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          销售输入：{{ BSinfo.businessIncomeVO.saleIncome }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          进货退货收入：{{ BSinfo.businessIncomeVO.purchaseReturnsIncome }}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="0">
        <div class="header">支 出 信 息：</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          总支出：{{ BSinfo.businessOutcomeVO.outcome }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          销售退货支出：{{ BSinfo.businessOutcomeVO.saleReturnOutcome }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          进货支出：{{ BSinfo.businessOutcomeVO.purchaseOutcome }}
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          人力成本：{{ BSinfo.businessOutcomeVO.salary }}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :offset="0">
        <div class="header">汇总：</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">利润：{{ BSinfo.profit }}</div>
      </el-col>
    </el-row>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getBSsheet } from "../../network/finacial";
import { formatDate } from "@/common/utils";

export default {
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      date: "",
      BSinfo: {
        businessIncomeVO: {},
        businessOutcomeVO: {},
        profit: 0,
      },
    };
  },
  mounted() {},
  computed: {
    beginDate: function () {
      return this.date === "" ? "" : formatDate(this.date[0]);
    },
    endDate: function () {
      return this.date === "" ? "" : formatDate(this.date[1]);
    },
  },
  methods: {
    getSheet() {
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate,
        },
      };
      getBSsheet(config)
        .then((_res) => {
          this.BSinfo = _res.result;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取经营情况失败!" + err,
          });
        });
    },
  },
};
</script>

<style>
.header {
  font-family: "Helvetica Neue";
  font-size: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
  margin-top: 50px;
  padding: 10px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #95b4dc;
}

.bg-purple {
  background: #f2f3f8;
}

.bg-purple-light {
  background: #bbcdf7;
}

.grid-content {
  height: 50px;
  line-height: 50px;
  /*设置line-height与父级元素的height相等*/
  text-align: center;
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>