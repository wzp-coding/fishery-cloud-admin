import axios from 'axios';
import get from 'lodash/get';
/**
 * baseURL 对象{Object}
 * key:定义你们要请求的名字(每个人可以自定义,建议按模块名称定义，比如权限模块就用Authority)
 * 示例：this.$myName，则key就是myName(注意$,请求时$必加)
 * value:定义请求的根地址
 * 示例：如果有 http://106.75.154.40:9012/traceability/getA
 *       和 http://106.75.154.40:9012/traceability/getB
 * 那么value就是 http://106.75.154.40:9012/traceability
 * 
 * 如果一定需要原生纯净的axios,那么可以通过this.$originAxios来调用
 */
const baseURLObject = {
    auth:"http://106.75.154.40:9003",
    user:"http://106.75.154.40:9003/user",
}

// 异常拦截处理器
const errorHandler = (error) => {
    const status = get(error, 'response.status');
    switch (status) {
        /* eslint-disable no-param-reassign */
        case 400: error.message = '请求错误'; break;
        case 401: error.message = '未授权，请登录'; break;
        case 403: error.message = '拒绝访问'; break;
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
        case 408: error.message = '请求超时'; break;
        case 500: error.message = '服务器内部错误'; break;
        case 501: error.message = '服务未实现'; break;
        case 502: error.message = '网关错误'; break;
        case 503: error.message = '服务不可用'; break;
        case 504: error.message = '网关超时'; break;
        case 505: error.message = 'HTTP版本不受支持'; break;
        default: break;
        /* eslint-disabled */
    }
    return Promise.reject(error);
};

/**
 * 循环创建axios实例
 * 实例名称为baseURL的key名
 * 需要添加请求头请在下面自己加
 */
const axiosObject = {};
for (const key in baseURLObject){
    axiosObject[key] = axios.create({
        // API 请求的默认前缀
        baseURL: baseURLObject[key],
        timeout: 10000, // 请求超时时间
    })
    // 请求拦截器（添加请求头，例如token、IP等）
    axiosObject[key].interceptors.request.use((config)=>{
        // 如果 token 存在
        // 让每个请求携带自定义 token 请根据实际情况自行修改
        config.headers = {
            Authorization : `bearer ${localStorage.getItem('token')}`,
            xip: window.localStorage.getItem("Ip")
        }
        return config;
    },errorHandler)
}

// 添加一个纯净的axios
axiosObject.originAxios = axios.create();

export default {
    install(Vue){
        for(let key in axiosObject){
            Vue.prototype["$"+key] = axiosObject[key];
        }
    }
};
