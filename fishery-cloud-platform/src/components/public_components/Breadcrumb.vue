<!--
* @FileDescription: 面包屑组件(已经全局注册，不需要导入，直接用即可)
prop参数说明：
只接受一个参数：breadcrumbs {类型Array}

如果只是简单的面包屑展示，不需要路由跳转
则数组里面直接传字符串即可，示例：["我的基地","数字基地"]

如果某些item需要路由跳转
则数组里面传一个个对象即可（对象里包含name和path属性，path是可选属性）
示例：[{name:"我的基地",path:'/mybase'},{name:"数字基地"}]

* @Author: 吴泽鹏
* @Date: 2021/1/27 15:24
* @LastEditors: 吴泽鹏
* @LastEditTime: 
-->
<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  render(h) {
    return (
      <el-breadcrumb separator-class="el-icon-arrow-right">
        {this.breadcrumbs.map((item, index) => {
          let tem;
          if (typeof item === "object") {
            tem = (
              <el-breadcrumb-item key={index}>{item.name}</el-breadcrumb-item>
            );
            if (item.path) {
              const path = { path: item.path };
              tem = (
                <el-breadcrumb-item key={index} to={path}>
                  {item.name}
                </el-breadcrumb-item>
              );
            }
          } else if (typeof item === "string") {
            tem = <el-breadcrumb-item key={index}>{item}</el-breadcrumb-item>;
          }
          return tem;
        })}
      </el-breadcrumb>
    );
  },
};
</script>