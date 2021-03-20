import Vue from "vue"
import BcodeWeb from '../components/cgx/ManagementOrder/BackPage/BcodeWeb.vue'
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
        component: () => import(/* webpackChunkName:"Login" */'../views/user_info/Login.vue'),
        beforeEnter: async (to, from, next) => {
            // console.log(Vue.prototype.$originAxios);
            // 获取本地坐标和详细地址
            let res;
            // if (process.env.NODE_ENV === 'development') {
            res = await Vue.prototype.$originAxios.get("/api/ws/location/v1/ip?key=4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ&ip=" + localStorage.getItem('Ip'))
            // } else {
            //     res = await Vue.prototype.$originAxios.get("https://apis.map.qq.com/ws/location/v1/ip?key=4YUBZ-GEPK4-6URUL-DV5B4-Q3IWE-EZBCJ&ip=" + localStorage.getItem('Ip'))
            // }
            res = res.data;
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
        component: () => import(/* webpackChunkName:"Register" */'../views/user_info/Register.vue'),
    },
    {
        // 找回密码页面
        path: '/forgetPassword',
        name: 'forgetPassword',
        component: () => import(/* webpackChunkName:"ForgetPassword" */'../views/user_info/ForgetPassword.vue'),
    },
    // {
    //     // 创建基地页面
    //     path: '/create-base',
    //     name: 'create-base',
    //     component: CreateBase,
    // },
    {
        // 普通用户页面
        path: '/common-user',
        name: 'common-user',
        // component: CommonUser,
        component: () => import(/* webpackChunkName:"CommonUser" */'../views/user_info/CommonUser.vue'),
    },
    {
        // 测试页面
        path: '/test',
        name: 'test',
        component: () => import(/* webpackChunkName:"test" */'../views/user_info/test.vue')
    },
    {
        // 二维码页面
        path: '/b-code-web',
        // component: () => import(/* webpackChunkName:"BcodeWeb" */'../components/cgx/ManagementOrder/BackPage/BcodeWeb.vue'),
        component: BcodeWeb,
        children: [
            {
                path: '/info-farm-p',
                component: () => import(/* webpackChunkName:"BcodeWeb" */'../components/cgx/ManagementOrder/BackPage/child/InfoFarm.vue')
            },
            {
                path: '/info-cold-p',
                component: () => import(/* webpackChunkName:"BcodeWeb" */'../components/cgx/ManagementOrder/BackPage/child/InfoCold.vue')
            },
            {
                path: '/info-logitis-p',
                component: () => import(/* webpackChunkName:"BcodeWeb" */'../components/cgx/ManagementOrder/BackPage/child/InfoLogitis.vue')
            },
            {
                path: '/info-plant-p',
                component: () => import(/* webpackChunkName:"BcodeWeb" */'../components/cgx/ManagementOrder/BackPage/child/InfoPlant.vue')
            },
        ]
    }
]
