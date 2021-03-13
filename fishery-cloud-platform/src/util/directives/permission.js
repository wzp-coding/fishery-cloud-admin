let permissionList = undefined;

// 每次加载这个JS文件的时候，从session获取
const one = sessionStorage.getItem('oneLevel');
const two = sessionStorage.getItem('twoLevel');
const three = sessionStorage.getItem('threeLevel');
sessionStorage.removeItem('oneLevel');
sessionStorage.removeItem('twoLevel');
sessionStorage.removeItem('threeLevel');
const oneLevel = one ? JSON.parse(one) : {};
const twoLevel = two ? JSON.parse(two) : {};
const threeLevel = three ? JSON.parse(three) : {};

// 在页面刷新之前将oneLevel,twoLevel,threeLevel的信息存在sessionStorage(监听刷新触发的事件)
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('oneLevel', JSON.stringify(oneLevel))
    sessionStorage.setItem('twoLevel', JSON.stringify(twoLevel))
    sessionStorage.setItem('threeLevel', JSON.stringify(threeLevel))
})
export default {
    bind: function (el, binding, vnode) {
        const { context: vm } = vnode;
        if (!permissionList) {
            // 第一次时获取数据
            permissionList = vm.$store.state.permissionList;
            console.log('permissionList: ', JSON.parse(JSON.stringify(permissionList)));
        }
        if (vm._.isEmpty(oneLevel) && vm._.isEmpty(twoLevel) && vm._.isEmpty(threeLevel)) {
            // 遍历一二三级权限
            permissionList.forEach(one => {
                oneLevel[one.name] = true;
                if (one.children) {
                    one.children.forEach(two => {
                        twoLevel[two.name] = true;
                        if (two.children) {
                            two.children.forEach(three => {
                                threeLevel[three.name] = true;
                            })
                        }
                    })
                }
            })
        }
        // console.log('oneLevel: ');
        // console.table(oneLevel)
        // console.log('twoLevel: ');
        // console.table(twoLevel)
        console.log('threeLevel: ');
        console.table(threeLevel)
        // 判断是否存在权限
        if (oneLevel[binding.value] || twoLevel[binding.value] || threeLevel[binding.value]) {
            el.disabled = false;
            el.classList.remove("is-disabled");
        } else {
            el.disabled = true;
            el.classList.add("is-disabled")
        }
    }
}