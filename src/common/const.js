// 部署url
export const REQUEST_BASE_URL_PROD = "http://ismzl.com/";
// 开发url （mock的地址
export const REQUEST_BASE_URL_DEV = "http://localhost:3456";

export const ROLE = {
  INVENTORY_MANAGER: "INVENTORY_MANAGER", //库存管理人员
  SALE_STAFF: "SALE_STAFF", // 进货销售人员
  SALE_MANAGER: "SALE_MANAGER", //销售经理
  FINANCIAL_STAFF: "FINANCIAL_STAFF", // 财务人员
  HR: "HR", // 人力资源人员
  GM: "GM", // 总经理
  ADMIN: "ADMIN" // 最高权限
};


export const PATH = {
  // INVENTORY_MANAGER
  COMMODITY_CLASSIFICATION: {
    path: '/commodityClassification',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  COMMODITY_MANAGEMENT: {
    path: '/commodityManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  INVENTORY_MANAGEMENT: {  // 总经理审批
    path: '/inventoryManagement',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.GM, ROLE.ADMIN]
  },
  INVENTORY_OPERATION: {
    path: '/inventoryOperation',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.GM, ROLE.ADMIN]
  },
  INVENTORY_CHECK: {
    path: '/inventoryCheck',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  INVENTORY_IN: {
    path: '/inventoryIn',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  INVENTORY_OUT: {
    path: '/inventoryOut',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  INVENTORY_LOSS: {
    path: '/inventoryLoss',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  INVENTORY_WARNING: {
    path: '/inventoryWarning',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  INVENTORY_OVERFLOW: {
    path: '/inventoryOverflow',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  INVENTORY_PRESENT: {
    path: '/inventoryPresent',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.GM, ROLE.ADMIN]
  },
  INVENTORY_VIEW: {
    path: '/inventoryView',
    requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
  },
  // SALE_STAFF & SALE_MANAGER
  PURCHASE_VIEW: {
    path: '/purchaseView',
    requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
  },
  PURCHASE_RETURN_VIEW: {
    path: '/purchaseReturnView',
    requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
  },
  SALE_VIEW: {
    path: '/saleView',
    requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
  },

  SALE_RETRUN_VIEW: {
    path: '/saleReturnView',
    requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
  },

  CUSTOMER_VIEW: {
    path: '/customerView',
    requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.ADMIN]
  },

  // GM
  STRATEGY_VIEW: {
    path: '/strategyView',
    requiresAuth: [ROLE.GM, ROLE.ADMIN]
  },
  ANNUAL_BONUS: {
    path: '/annualBonus',
    requiresAuth: [ROLE.GM, ROLE.ADMIN]
  },
  // HR
  EMPLOYEE_MANAGEMENT: {
    path: '/employeeManagement',
    requiresAuth: [ROLE.HR, ROLE.ADMIN]
  },
  JOB_MANAGEMENT: {
    path: '/jobManagement',
    requiresAuth: [ROLE.HR, ROLE.ADMIN]
  },
  PAYMENT_VIEW: {
    path: '/paymentView',
    requiresAuth: [ROLE.HR, ROLE.GM, ROLE.ADMIN]
  },
  // Finicial
  ACCOUNT_VIEW: {
    path: '/AccountView',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
  },
  BUSSINESS_HISTORY: {
    path: '/BussinessHistory',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.GM, ROLE.ADMIN]
  },
  BUSSINESS_SITUATION: {
    path: '/BussinessSituation',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.GM, ROLE.ADMIN]
  },
  INCOME_VIEW: {
    path: '/IncomeView',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.GM, ROLE.ADMIN]
  },
  GRANT_VIEW: {
    path: '/grantView',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.GM, ROLE.ADMIN]
  },
  OUTCOME_VIEW: {
    path: '/outcomeView',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.GM, ROLE.ADMIN]
  },
  SALE_DETAIL: {
    path: '/saleDetail',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.GM, ROLE.ADMIN]
  },
  OPENNING_ACCOUNT: {
    path: '/openningAccount',
    requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
  }
}
