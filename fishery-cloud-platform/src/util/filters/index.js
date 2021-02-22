import formatTime from './formatTime'
import formatMoney from './formatMoney'
// 自定义指令
const filters = {
    formatTime, formatMoney
}

export default {
    install(Vue) {
        Object.keys(filters).forEach((key) => {
            Vue.filter(key, filters[key])
        })
    },
}
