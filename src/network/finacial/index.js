import request from "@/network/request"
// import { config } from "vue/types/umd";
// import { config } from "vue/types/umd";
const testAPI = require("@/apis")

export const createAccount = config => request._post(testAPI.ACCOUNT_CREATE, config);
export const deleteAccount = config => request._get(testAPI.ACCOUNT_DELETE, config);
export const queryAccount =  config => request._get(testAPI.ACCOUNT_QUERY, config);

export const getAllIncomeSheet = config => request._get(testAPI.INCOME_SHEET_ALL, config);
export const createIncomeSheet = config => request._post(testAPI.INCOME_SHEET_CREATE, config);
export const incomeApproval = config => request._get(testAPI.INCOME_APPROVAL, config);

export const getAllOutcomeSheet = config => request._get(testAPI.OUTCOME_SHEET_ALL, config);
export const createOutcomeSheet = config => request._post(testAPI.OUTCOME_SHEET_CREATE, config);
export const outcomeApproval = config => request._get(testAPI.OUTCOME_APPROVAL, config);

export const findAllGrantSheet = config => request._get(testAPI.GRANT_SHEET_ALL, config)
export const Approval = config => request._get(testAPI.GRANT_SHEET_APPROVAL, config)


export const findAllIncomeSheet = config => request._get(testAPI.INCOME_SHEET_ALL, config)
export const findAllOutcomeSheet = config => request._get(testAPI.OUTCOME_SHEET_ALL, config)

export const getBSsheet = config => request._get(testAPI.GET_BS_SHEET, config)

export const getSaleDetail = config => request._get(testAPI.GET_SALE_DETAIL, config);

export const findOpenningAccounts = config => request._get(testAPI.OPENING_ACCOUNTS_FIND, config);
export const openOpenningAccounts = config => request._get(testAPI.OPENING_ACCOUNTS_OPEN, config);
