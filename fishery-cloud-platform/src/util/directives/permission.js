window.__permissionList = undefined;
// --------------处理刷新---开始------------
// 每次加载这个JS文件的时候，从session获取
let one = sessionStorage.getItem('__oneLevel');
let two = sessionStorage.getItem('__twoLevel');
let three = sessionStorage.getItem('__threeLevel');
sessionStorage.removeItem('__oneLevel');
sessionStorage.removeItem('__twoLevel');
sessionStorage.removeItem('__threeLevel');
window.__oneLevel = one ? JSON.parse(one) : {};
window.__twoLevel = two ? JSON.parse(two) : {};
window.__threeLevel = three ? JSON.parse(three) : {};

// 在页面刷新之前将__oneLevel,__twoLevel,__threeLevel的信息存在sessionStorage(监听刷新触发的事件)
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('__oneLevel', JSON.stringify(__oneLevel))
    sessionStorage.setItem('__twoLevel', JSON.stringify(__twoLevel))
    sessionStorage.setItem('__threeLevel', JSON.stringify(__threeLevel))
})
// --------------处理刷新---结束------------
export default {
    bind: function (el, binding, vnode) {
        const { context: vm } = vnode;
        if(!__permissionList){
            // 第一次取数据
            __permissionList = vm.$store.state.permissionList;
            console.log('__permissionList: ', __permissionList);
        }
        if (vm._.isEmpty(__oneLevel) && vm._.isEmpty(__twoLevel) && vm._.isEmpty(__threeLevel)) {
            // 遍历一二三级权限
            __permissionList.forEach(one => {
                __oneLevel[one.name] = true;
                if (one.children) {
                    one.children.forEach(two => {
                        __twoLevel[two.name] = true;
                        if (two.children) {
                            two.children.forEach(three => {
                                __threeLevel[three.name] = true;
                            })
                        }
                    })
                }
            })
            console.log('__threeLevel: ');
            console.table(__threeLevel)
        }
        // console.log('__oneLevel: ');
        // console.table(__oneLevel)
        // console.log('__twoLevel: ');
        // console.table(__twoLevel)
        // 判断是否存在权限
        if (__oneLevel[binding.value] || __twoLevel[binding.value] || __threeLevel[binding.value]) {
            el.disabled = false;
            el.classList.remove("is-disabled");
        } else {
            el.disabled = true;
            el.classList.add("is-disabled")
        }
    }
}