/* 存储获取公共数据的方法以及公共数据处理的方法 */
module.exports = class {
    constructor(vue) {
        this.vue = vue;
    }

    // 获取人员信息
    getStaff() {
        return new Promise((resolve) => {
            this.vue.$admin.post(`search/1/1000`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    // 获取所有种苗信息
    getSeedInfo() {
        return new Promise((resolve) => {
            this.vue.$germchit.get()
                .then((res) => {
                    resolve(res);
                })
        })
    }

    // 获取所有客户信息
    getCustomer(id) {
        return new Promise((resolve) => {
            this.vue.$Customer.get(`/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    // 获取所有原料
    getMaterial(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processing/material/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }

    // 获取工厂产品
    getProduct(id) {
        return new Promise((resolve) => {
            this.vue.$plant.get(`/processingFactory/product/factoryProduct/${id}`)
                .then((res) => {
                    resolve(res);
                })
        })
    }



}