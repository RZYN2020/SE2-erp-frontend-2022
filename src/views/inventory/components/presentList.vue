<template>
  <div class="card">
    <el-card
      v-for="(item, index) in list"
      :index="item.index"
      :key="item.id"
      shadow="hover"
    >
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>id: </strong>{{ item.id }}</span
            >&nbsp;
            <el-button
              style="margin-left: 10px"
              type="success"
              icon="el-icon-check"
              circle
              size="mini"
              v-if="authorization()"
              @click="approval(item.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-close"
              circle
              size="mini"
              v-if="authorization()"
              @click="deny(item.id)"
            ></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 2" effect="dark" type="success"
                >审核通过</el-tag
              >
              <el-tag v-if="type === 3" effect="dark" type="danger"
                >审核未通过</el-tag
              >
            </span>
          </el-col>
          <el-col :span="6">
            <el-button
              class="button"
              type="text"
              v-if="!showAll[index]"
              @click="changeState(index)"
            >
              展开
            </el-button>
            <el-button
              class="button"
              type="text"
              v-if="showAll[index]"
              @click="changeState(index)"
            >
              收起</el-button
            >
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <span><strong>操作员: </strong>{{ item.operator }}</span>
        </el-row>
        <br />
        <el-row>
          <span><strong>关联销售单ID: </strong>{{ item.saleSheetId }}</span>
        </el-row>
        <br />
        <el-row v-if="type != 1">
          <span><strong>创建时间: </strong>{{ item.created_time }}</span>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <div style="margin-bottom: 15px"><strong>详细商品清单:</strong></div>
          <el-table
            :data="item.products"
            stripe
            style="width: 100%"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
          >
            <el-table-column prop="pid" label="商品id" width="500">
            </el-table-column>
            <el-table-column prop="amount" label="数量" width="400">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { approveInventoryPresent } from "../../../network/purchase";
export default {
  name: "presentList",
  props: {
    list: Array,
    type: Number,
  },
  data() {
    return {
      showAll: [],
    };
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false);
  },
  methods: {
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index]);
    },
    authorization() {
      if (sessionStorage.getItem("role") === "GM" && this.type === 1) {
        return true;
      } else {
        return false;
      }
    },
    approval(id) {
      let config = {
        params: {
          id: id,
          state: "SUCCESS",
        },
      };
      approveInventoryPresent(config)
        .then((res) => {
          this.$emit("refresh");
          this.$message({
            message: "操作成功!",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "审批失败!" + err,
          });
        });
    },
  },
  deny(id) {
    let config = {
      params: {
        id: id,
        state: "FAILURE",
      },
    };
    Approval(config)
      .then((res) => {
        this.$emit("refresh");
        this.$message({
          message: "操作成功!",
          type: "success",
        });
      })
      .catch((err) => {
        this.$message({
          type: "error",
          message: "审批失败!" + err,
        });
      });
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

.el-card {
  margin-bottom: 20px;
  background: #eef7f2;
}
</style>