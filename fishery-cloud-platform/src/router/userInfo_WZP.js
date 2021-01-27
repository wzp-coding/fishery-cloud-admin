import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import Vue from "vue"
export default [
    {
        // 第一次进入页面重定向到登录页面
        path: '/',
        redirect: '/login'
    },
    {
        //登陆界面
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: async (to, from, next) => {
            // console.log(Vue.prototype.$originAxios);
            // 获取本地坐标和详细地址
            let { data: res } = await Vue.prototype.$originAxios.get("/api/ws/location/v1/ip?key=4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ&ip=" + localStorage.getItem('Ip'))
            res = res.result;
            const location = res.location;
            localStorage.setItem("location", JSON.stringify(location));
            res = res.ad_info;
            // console.log('res: ', res);
            const address = res.nation + res.province + res.city + res.district;
            localStorage.setItem("address", address);
            localStorage.setItem("ad_info", JSON.stringify(res));
            next();
        }
    },
    {
        // 注册页面
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        // 找回密码页面
        path: '/forgetPassword',
        name: 'forgetPassword',
        component: ForgetPassword,
    }
]
