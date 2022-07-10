import request from "@/network/request"
const testAPI = require("@/apis")


export const showCoupon = config => request._get(testAPI.COUPON_SHOW, config)
export const userPromotionCreate = config => request._post(testAPI.USER_PROMOTION_CREATE, config)
export const userPromotionShow = config => request._get(testAPI.USER_PROMOTION_SHOW, config)
export const pricePromotionCreate = config => request._post(testAPI.PRICE_PROMOTION_CREATE, config)
export const pricePromotionShow = config => request._get(testAPI.PRICE_PROMOTION_SHOW, config)
export const packagePromotionCreate = config => request._post(testAPI.PACKAGE_PROMOTION_CREATE, config)
export const packagePromotionShow = config => request._get(testAPI.PACKAGE_PROMOTION_SHOW, config)
export const getTotalSalaryExceptDecember = config => request._get(testAPI.GET_TOTAL_SALARY_EXCEPT_DECEMBER, config);
export const establishYearEndAwards = config => request._get(testAPI.ESTABLISHED_AWARDS, config);