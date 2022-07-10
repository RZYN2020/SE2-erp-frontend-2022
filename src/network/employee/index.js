import request from "@/network/request"
const testAPI = require("@/apis")

export const createEmployee = config => request._post(testAPI.EMPLOYEE_CREATE, config);
export const findUser = config => request._get(testAPI.FIND_USER, config);
export const findAllEmployee = config => request._get(testAPI.EMPLOYEE_ALL, config);
export const findAllJob = config => request._get(testAPI.JOB_ALL, config);
export const updateJob = config => request._post(testAPI.JOB_UPDATE, config);
export const findAllCalculateMethod = config => request._get(testAPI.CALCULATE_METHOD_ALL, config);
export const findAllPaymentMethod = config => request._get(testAPI.PAYMENT_METHOD_ALL, config);
export const signIn = config => request._get(testAPI.SIGNIN, config);
export const findAbsence = config => request._get(testAPI.ABSENCE, config);
export const createPayment = config => request._post(testAPI.PAYMENT_CREATE, config);
export const findAllPayment = config => request._get(testAPI.PAYMENT_ALL, config);
export const firstApproval = config => request._get(testAPI.PAYMENT_FIRST_APPROVAL, config);
export const secondApproval  = config => request._get(testAPI.PAYMENT_SECOND_APPROVAL, config);