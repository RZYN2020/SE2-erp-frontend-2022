//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'
const USER_ALL = "/api/user/show-all"

//@ 商品管理
// 商品分类管理
const COMMODITY_CLASSIFICATION_ALL = '/api/category/queryAll'
const COMMODITY_CLASSIFICATION_CREATE = '/api/category/create'
const COMMODITY_CLASSIFICATION_UPDATE = '/api/category/update'
const COMMODITY_CLASSIFICATION_DELETE = '/api/category/delete'

// 商品管理
const COMMODITY_ALL = '/api/product/queryAll';
const COMMODITY_CREATE = '/api/product/create';
const COMMODITY_UPDATE = '/api/product/update';
const COMMODITY_DELETE = '/api/product/delete';

//@ 库存管理
const WAREHOUSE_INPUT = '/api/warehouse/input';
const WAREHOUSE_OUTPUT_PRE = '/api/warehouse/product/count';
const WAREHOUSE_OUTPUT = '/api/warehouse/output';
const WAREHOUSE_GET_INPUTSHEET = '/api/warehouse/inputSheet/state';
const WAREHOUSE_GET_OUTPUTSHEET = '/api/warehouse/outputSheet/state';
const WAREHOUSE_IO_DEATIL_BY_TIME = '/api/warehouse/sheetContent/time';
const WAREHOUSE_IPQ_BY_TIME = '/api/warehouse/inputSheet/time/quantity';
const WAREHOUSE_OPQ_BY_TIME = '/api/warehouse/outputSheet/time/quantity';
const WAREHOUSE_OUTPUTSHEET_APPROVE = '/api/warehouse/outputSheet/approve';
const WAREHOUSE_INPUTSHEET_APPROVE = '/api/warehouse/inputSheet/approve';
const WAREHOUSE_DAILY_COUNT = '/api/warehouse/warehouse/counting';
const WAREHOUSE_DAYLY_COUNT_EXCEL = '/api/warehouse/warehouse/counting/excel';
const GET_INVENTORY_PRESENT = '/api/warehouse/givenSheet/sheet-show';
const APPROVE_INVENTORY_PRESENT = "/api/warehouse/givenSheet/approve";


//@ 销售管理
// 进货管理
const PURCHASE_ALL = '/api/purchase/sheet-show';
const PURCHASE_FIND_SHEET_BY_ID = '/api/purchase/find-sheet';
const PURCHASE_CREATE = '/api/purchase/sheet-make';
const PURCHASE_FIRST_APPROVAL = '/api/purchase/first-approval';
const PURCHASE_SECOND_APPROVAL = '/api/purchase/second-approval';

// 进货退货管理
const PURCHASE_RETURN_ALL = '/api/purchase-returns/sheet-show';
const PURCHASE_RETURN_CREATE = '/api/purchase-returns/sheet-make';
const PURCHASE_RETURN_FIRST_APPROVAL = '/api/purchase-returns/first-approval';
const PURCHASE_RETURN_SECOND_APPROVAL = '/api/purchase-returns/second-approval';

// 销售管理
const SALE_ALL = '/api/sale/sheet-show';
const SALE_FIND_SHEET_BY_ID = '/api/sale/find-sheet';
const SALE_CREATE = '/api/sale/sheet-make';
const SALE_FIRST_APPROVAL = '/api/sale/first-approval';
const SALE_SECOND_APPROVAL = '/api/sale/second-approval';
const SALE_MAX_AMOUNT_CUSTOMER = '/api/sale/maxAmountCustomer';

// 销售退货管理
const SALE_RETURN_ALL = '/api/saleReturn/sheet-show';
const SALE_RETURN_CREATE = '/api/saleReturn/sheet-make';
const SALE_RETURN_FIRST_APPROVAL = '/api/saleReturn/first-approval';
const SALE_RETURN_SECOND_APPROVAL = '/api/saleReturn/second-approval';

// 客户管理
const CUSTOMER_QUERY = '/api/customer/findByType';

const CUSTOMER_CREATE = '/api/customer/create';
const CUSTOMER_UPDATE = '/api/customer/update';
const CUSTOMER_DELETE = '/api/customer/delete';

//@员工管理

// 员工管理
const EMPLOYEE_CREATE = '/api/employee/createEmployee';
const EMPLOYEE_ALL = '/api/employee/findAllEmployee';
const SIGNIN = '/api/employee/signIn';
const ABSENCE = '/api/employee/findAbsence';
const FIND_USER = '/api/employee/findUser';

// 岗位
const JOB_ALL = '/api/job/findAllJob';
const JOB_UPDATE = '/api/job/updateJob';
const CALCULATE_METHOD_ALL = '/api/job/findAllCalculateMethod';
const PAYMENT_METHOD_ALL = '/api/job/findAllPaymentMethod';


// 工资管理
const PAYMENT_CREATE = '/api/salary/sheet-make';
const PAYMENT_ALL = '/api/salary/sheet-show';
const PAYMENT_FIRST_APPROVAL = '/api/salary/first-approval';
const PAYMENT_SECOND_APPROVAL = '/api/salary/second-approval';


// 账户管理
const ACCOUNT_CREATE = '/api/account/create';
const ACCOUNT_DELETE = '/api/account/delete';
const ACCOUNT_QUERY = '/api/account/findAll';

// 收款单管理
const INCOME_SHEET_ALL = '/api/incomeSheet/sheet-show';
const INCOME_SHEET_CREATE = '/api/incomeSheet/sheet-make';
const INCOME_APPROVAL = '/api/incomeSheet/approval';


// 付款单
const OUTCOME_SHEET_ALL = '/api/outcomeSheet/sheet-show';
const OUTCOME_SHEET_CREATE = '/api/outcomeSheet/sheet-make';
const OUTCOME_APPROVAL = '/api/outcomeSheet/approval';

// 工资发放单
const GRANT_SHEET_ALL = '/api/grantSheet/sheet-show';
const GRANT_SHEET_APPROVAL = '/api/grantSheet/approval';

// 查看经营情况表
const GET_BS_SHEET = '/api/bsSheet/sheet-show';

// 查看销售明细表
const GET_SALE_DETAIL = '/api/salesDetail/show-all';

// 期初建账
const OPENING_ACCOUNTS_OPEN = 'api/openingAccounts/open';
const OPENING_ACCOUNTS_FIND = 'api/openingAccounts/find';

// 策略管理
const COUPON_SHOW =    "/api/promotion/coupon/show";
const USER_PROMOTION_CREATE =    "/api/promotion/user/create";
const USER_PROMOTION_SHOW =      "/api/promotion/user/show-all";
const PRICE_PROMOTION_CREATE =   "/api/promotion/price/create";
const PRICE_PROMOTION_SHOW =     "/api/promotion/price/show-all";
const PACKAGE_PROMOTION_CREATE = "/api/promotion/package/create";
const PACKAGE_PROMOTION_SHOW =   "/api/promotion/package/show-all";

const GET_TOTAL_SALARY_EXCEPT_DECEMBER = "/api/yearEndAwards/findAllYearEndSalary";
const ESTABLISHED_AWARDS = "/api/yearEndAwards/establishYearEndAwards";


module.exports = {
  PAYMENT_FIRST_APPROVAL,
  PAYMENT_SECOND_APPROVAL,
  GRANT_SHEET_APPROVAL,

  SALE_MAX_AMOUNT_CUSTOMER,

  TEST_GET,
  TEST_POST,

  AUTH,
  LOGIN,
  REGISTER,
  USER_ALL,
  COMMODITY_CLASSIFICATION_ALL,
  COMMODITY_CLASSIFICATION_CREATE,
  COMMODITY_CLASSIFICATION_UPDATE,
  COMMODITY_CLASSIFICATION_DELETE,

  COMMODITY_ALL,
  COMMODITY_CREATE,
  COMMODITY_UPDATE,
  COMMODITY_DELETE,

  WAREHOUSE_INPUT,
  WAREHOUSE_OUTPUT_PRE,
  WAREHOUSE_OUTPUT,
  WAREHOUSE_GET_INPUTSHEET,
  WAREHOUSE_GET_OUTPUTSHEET,
  WAREHOUSE_IO_DEATIL_BY_TIME,
  WAREHOUSE_IPQ_BY_TIME,
  WAREHOUSE_OPQ_BY_TIME,
  WAREHOUSE_OUTPUTSHEET_APPROVE,
  WAREHOUSE_INPUTSHEET_APPROVE,
  WAREHOUSE_DAILY_COUNT,
  WAREHOUSE_DAYLY_COUNT_EXCEL,
  GET_INVENTORY_PRESENT,
  APPROVE_INVENTORY_PRESENT,

  PURCHASE_ALL,
  PURCHASE_CREATE,
  PURCHASE_FIRST_APPROVAL,
  PURCHASE_SECOND_APPROVAL,
  PURCHASE_RETURN_ALL,
  PURCHASE_RETURN_CREATE,
  PURCHASE_RETURN_FIRST_APPROVAL,
  PURCHASE_RETURN_SECOND_APPROVAL,
  PURCHASE_FIND_SHEET_BY_ID,

  SALE_ALL,
  SALE_CREATE,
  SALE_FIRST_APPROVAL,
  SALE_SECOND_APPROVAL,
  SALE_RETURN_ALL,
  SALE_RETURN_CREATE,
  SALE_RETURN_FIRST_APPROVAL,
  SALE_RETURN_SECOND_APPROVAL,
  SALE_FIND_SHEET_BY_ID,
  CUSTOMER_QUERY,
  CUSTOMER_CREATE,
  CUSTOMER_DELETE,
  CUSTOMER_UPDATE,

  EMPLOYEE_CREATE,
  EMPLOYEE_ALL,
  JOB_ALL,
  JOB_UPDATE,
  CALCULATE_METHOD_ALL,
  PAYMENT_METHOD_ALL,
  SIGNIN,
  ABSENCE,
  PAYMENT_CREATE,
  PAYMENT_ALL,
  FIND_USER,


  ACCOUNT_CREATE,
  ACCOUNT_DELETE,
  ACCOUNT_QUERY,
  INCOME_SHEET_ALL,
  INCOME_SHEET_CREATE,
  INCOME_APPROVAL,
  OUTCOME_SHEET_ALL,
  OUTCOME_SHEET_CREATE,
  OUTCOME_APPROVAL,
  GRANT_SHEET_ALL,
  GET_BS_SHEET,
  GET_SALE_DETAIL,

  OPENING_ACCOUNTS_OPEN,
  OPENING_ACCOUNTS_FIND,

  COUPON_SHOW,
  USER_PROMOTION_CREATE,
  USER_PROMOTION_SHOW,
  PRICE_PROMOTION_CREATE,
  PRICE_PROMOTION_SHOW,
  PACKAGE_PROMOTION_CREATE,
  PACKAGE_PROMOTION_SHOW,

  GET_TOTAL_SALARY_EXCEPT_DECEMBER,
  ESTABLISHED_AWARDS,
};
