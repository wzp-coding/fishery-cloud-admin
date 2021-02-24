<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import "./assets/theme/3fd653/index.css";
import "./assets/theme/7559fe/index.css";
import "./assets/theme/common.scss"
export default {
  created() {
    // 每次刷新重新渲染Vue时，获取上次vuex中的state
    const PreVuexStoreState = sessionStorage.getItem("PreVuexStoreState");
    if (PreVuexStoreState) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(PreVuexStoreState))
      );
      // 移除session
      sessionStorage.removeItem("PreVuexStoreState");
    }

    // 在页面刷新之前将vuex里的信息存在sessionStorage(监听刷新触发的事件)
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "PreVuexStoreState",
        JSON.stringify(this.$store.state)
      );
    });
  },
};
</script>

