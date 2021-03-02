/* 存储获取公共数据的方法以及公共数据处理的方法 */
module.exports = class {
    constructor(vue) {
        this.vue = vue;
        this.staffList = this.getStaff();
    }

    /* 管理员数组开始 */
    createPersonList = [
        {
            personName: "张三",
            id: "1111",
        },
        {
            personName: "李四",
            id: "2222",
        },
    ]
    /* 管理员数组结束 */

    /* 加工产品数组开始 */
    productsList = [
        {
            label: "小龙虾",
            value: "2222",
        },
        {
            label: "多宝鱼",
            value: "1111",
        }
    ]
    /* 加工产品数组结束 */

    /* 获取基地人员开始 */
    getStaff() {
        return new Promise((resolve) => {
            this.vue.$admin.post(`search/1/1000`)
                .then((res) => {
                    resolve(res);
                })
        })
    }
    /* 获取基地人员结束 */


}