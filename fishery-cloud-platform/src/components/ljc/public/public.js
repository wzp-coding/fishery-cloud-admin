/* 存储获取公共数据的方法以及公共数据处理的方法 */
module.exports = class {
    constructor(vue) {
        this.vue = vue;
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
}