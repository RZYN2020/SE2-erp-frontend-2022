const API = require("../../apis");

module.exports = {
    getbonous: [ 
        API.GET_TOTAL_SALARY_EXCEPT_DECEMBER,
        "get",
        { "code": "00000", "msg": "Success", "result": [{ "employeeId": 1, "employeeName": "DTA", "totalSalaryExceptDecember": 0, "yearEndAwards": 500.00 }, { "employeeId": 2, "employeeName": "AA", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }, { "employeeId": 3, "employeeName": "BB", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }, { "employeeId": 4, "employeeName": "袜子socket", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }, { "employeeId": 5, "employeeName": "seecoder平台", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }, { "employeeId": 6, "employeeName": "CC", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }, { "employeeId": 7, "employeeName": "雷", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }, { "employeeId": 8, "employeeName": "EE", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }, { "employeeId": 9, "employeeName": "RR", "totalSalaryExceptDecember": 0, "yearEndAwards": 0.00 }] }

    ],
    makebonous: [
        API.ESTABLISHED_AWARDS,
        "get",
        {"code":"00000","msg":"Success","result":"操作成功"}
    ]
};
