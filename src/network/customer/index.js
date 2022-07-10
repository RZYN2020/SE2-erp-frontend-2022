import request from "@/network/request"
const testAPI = require("@/apis")

export const createCustomer = config => request._post(testAPI.CUSTOMER_CREATE, config);
export const updateCustomer = config => request._post(testAPI.CUSTOMER_UPDATE, config);
export const deleteCustomer = config => request._get(testAPI.CUSTOMER_DELETE, config);


