<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="addCustomer"
      >新增客户</el-button
    >
    <div style="margin-top: 10px">
      <el-table
        :data="customerList"
        stripe
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="id" label="id" width="50"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="70"> </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="80"
          :filters="[
            { text: '供应商', value: '供应商' },
            { text: '销售商', value: '销售商' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '供应商' ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="level" label="级别" width="50">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="140">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="150">
        </el-table-column>
        <el-table-column prop="zipcode" label="邮编" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="170">
        </el-table-column>
        <el-table-column prop="lineOfCredit" label="应收额度(元)" width="110">
        </el-table-column>
        <el-table-column prop="receivable" label="应收(元)" width="110">
        </el-table-column>
        <el-table-column prop="payable" label="应付(元)" width="110">
        </el-table-column>
        <el-table-column prop="operator" label="操作员" width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editInfo(scope.row.id)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click="deleteInfo(scope.row.id)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增客户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="close()"
    >
      <el-form :model="addForm" :label-width="'100px'" size="mini">
        <el-form-item label="姓 名">
          <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="addForm.type">
            <el-option label="销售商" value="销售商" />
            <el-option label="供货商" value="供货商"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="级别">
          <el-input
            v-model="addForm.level"
            placeholder="0"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="addForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>

        <el-form-item label="地址">
          <el-input
            v-model="addForm.address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮编">
          <el-input
            v-model="addForm.zipcode"
            placeholder="请输入邮编"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="addForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="应收额度(元)">
          <el-input v-model="addForm.lineOfCredit" type="number"></el-input>
        </el-form-item>

        <el-form-item label="应收(元)">
          <el-input
            v-model="addForm.receivable"
            placeholder="0"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="应付(元)">
          <el-input
            v-model="addForm.payable"
            placeholder="0"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改客户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="close()"
    >
      <el-form :model="editForm" :label-width="'100px'" size="mini">
        <el-form-item label="姓 名">
          <el-input v-model="editForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="editForm.type">
            <el-option label="销售商" value="销售商" />
            <el-option label="供货商" value="供货商"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="级别">
          <el-input
            v-model="editForm.level"
            placeholder="0"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input
            v-model="editForm.phone"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>

        <el-form-item label="地址">
          <el-input
            v-model="editForm.address"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮编">
          <el-input
            v-model="editForm.zipcode"
            placeholder="请输入邮编"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input
            v-model="editForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item label="应收额度(元)">
          <el-input
            v-model="editForm.lineOfCredit"
            placeholder="请输入应收额度"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="应收(元)">
          <el-input
            v-model="editForm.receivable"
            placeholder="请输入应收金额"
            type="number"
          ></el-input>
        </el-form-item>

        <el-form-item label="应付(元)">
          <el-input
            v-model="editForm.payable"
            placeholder="请输入应付金额"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEdit(false)">取 消</el-button>
        <el-button type="primary" @click="handleEdit(true)">确 定</el-button>
      </div>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getAllCustomer } from "../../network/sale";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../network/customer";
export default {
  name: "CustomerView",
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      customerList: [],
      addDialogVisible: false,
      addForm: {
        address: "",
        email: "",
        level: "",
        lineOfCredit: "",
        name: "",
        operator: "",
        payable: "",
        phone: "",
        receivable: "",
        type: "",
        zipcode: "",
      },
      editDialogVisible: false,
      editForm: {
        id: "",
        address: "",
        email: "",
        level: "",
        lineOfCredit: "",
        name: "",
        operator: "",
        payable: "",
        phone: "",
        receivable: "",
        type: "",
        zipcode: "",
      },
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.customerList = [];
      getAllCustomer({ params: { type: "SUPPLIER" } })
        .then((_res) => {
          this.customerList = this.customerList.concat(_res.result);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取供货商列表失败!" + err,
          });
        });
      getAllCustomer({ params: { type: "SELLER" } })
        .then((_res) => {
          this.customerList = this.customerList.concat(_res.result);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "获取销售商列表失败!" + err,
          });
        });
    },

    filterTag(value, row) {
      return row.type === value;
    },

    addCustomer() {
      this.addDialogVisible = true;
    },

    editInfo(id) {
      this.editForm = this.customerList.filter((x) => x.id === id)[0];
      if (this.editForm.recentPp === "暂无") {
        this.editForm.recentPp = null;
      }
      if (this.editForm.recentRp === "暂无") {
        this.editForm.recentRp = null;
      }
      this.editDialogVisible = true;
    },

    deleteInfo(id) {
      let config = {
        params: {
          id: id,
        },
      };
      this.$confirm("是否要删除该客户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCustomer(config).then((_res) => {
            if (_res.msg === "Success") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getAll();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handleAdd(type) {
      if (type === false) {
        this.addDialogVisible = false;
        this.addForm = {};
      } else if (type === true) {
        this.addForm.operator = sessionStorage.getItem("name");
        createCustomer(this.addForm)
          .then((_res) => {
            if (_res.code === "B0001" || _res.code === "B0002") {
              this.$message({
                type: "error",
                message: _res.msg,
              });
            } else {
              this.$message({
                type: "success",
                message: "新增成功!",
              });
              this.addForm = {};
              this.addDialogVisible = false;
              this.getAll();
            }
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "新增客户失败!" + err,
            });
          });
      }
    },

    handleEdit(type) {
      if (type === false) {
        this.editDialogVisible = false;
        this.editForm = {};
      } else if (type === true) {
        this.addCustomer.operator = sessionStorage.getItem("name");
        updateCustomer(this.editForm).then((_res) => {
          if (_res.code === "B0003") {
            this.$message({
              type: "error",
              message: _res.msg,
            });
          } else {
            this.$message({
              type: "success",
              message: "修改成功！",
            });
            this.editForm = {};
            this.editDialogVisible = false;
            this.getAll();
          }
        }).catch((err) => {
          this.$message({
            type: "error",
            message: "修改客户失败!" + err,
          });
        });
      }
    },

    close() {
      this.addForm = {};
      this.editForm = {};
    },
  },
};
</script>

<style>
</style>