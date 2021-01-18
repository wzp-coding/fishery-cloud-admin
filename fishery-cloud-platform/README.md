# fishery-cloud-platform

[VUE官方风格文档](https://vuejs.bootcss.com/style-guide/#%E8%A7%84%E5%88%99%E5%BD%92%E7%B1%BB)

以下内容并非本人瞎哔哔，都是参考官方文档，懒得看官方就看我下面写的就行

优秀的程序员必然代码也是很规范的，希望大家尽量养成习惯，规范开发，便利你我他
## 目录说明
### 区别组件和视图

![组件和视图](https://images.gitee.com/uploads/images/2021/0117/160819_7b15624d_7367930.png "屏幕截图.png")

### 组件文件夹说明 和 组件命名统一
公共组件：类似富文本编辑，公共按钮，图片上传，搜索框等两 **人** 或以上需要共同用到的组件

![公共组件](https://images.gitee.com/uploads/images/2021/0117/160958_aa277320_7367930.png "屏幕截图.png")

单例组件：只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。这不意味着组件只可用于一个单页面，而是每个页面只使用一次。 **这些组件永远不接受任何 prop** ，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。

![单例组件命名](https://images.gitee.com/uploads/images/2021/0117/161445_62ceb515_7367930.png "屏幕截图.png")

父子组件：（经常用到）如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

![父子组件命名](https://images.gitee.com/uploads/images/2021/0117/162210_d97a8a18_7367930.png "屏幕截图.png")

注册组件：（经常用到）统一大驼峰命名规则

![注册组件命名](https://images.gitee.com/uploads/images/2021/0117/162832_b42d9984_7367930.png "屏幕截图.png")

使用组件：（经常用到）在vue文件中的template使用组件时，统一用`-`连接

![使用组件](https://images.gitee.com/uploads/images/2021/0117/163218_4bf88e17_7367930.png "屏幕截图.png")

基础组件：（这个你们一般不用封装）应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。
这些组件为你的应用奠定了一致的基础样式和行为。它们可能只包括：
- HTML 元素
- 其它基础组件
- 第三方 UI 组件库

![基础组件命名](https://images.gitee.com/uploads/images/2021/0117/161600_c79fab6b_7367930.png "屏幕截图.png")


### 其他风格尽量统一
模版表达式：组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用

![计算属性](https://images.gitee.com/uploads/images/2021/0117/163812_bf4c2d35_7367930.png "屏幕截图.png")

组件Prop属性：在模版中用`-`连接，在JS中用小驼峰（data属性也是如此），同时定义的时候尽量详细

![prop](https://images.gitee.com/uploads/images/2021/0117/163929_33d4a8c8_7367930.png "屏幕截图.png")

![定义](https://images.gitee.com/uploads/images/2021/0117/164924_4101d853_7367930.png "屏幕截图.png")

v-for必须加key属性

style必须设置scoped来限制作用域（如果父组件想改变或者覆盖子组件的样式，在父组件设置/deep/即可）

![scoped](https://images.gitee.com/uploads/images/2021/0117/165417_eb62a6e6_7367930.png "屏幕截图.png")


### route文件夹说明
我已经帮你们命名好了，直接在里面注册路由就行了

注册路由参考里面的格式就行了

![路由](https://images.gitee.com/uploads/images/2021/0117/165615_fe069392_7367930.png "屏幕截图.png")

## 如何开始做项目

点开路由router，找到自己对应的路由文件，查看注释，我基本上都把要写的页面写好了

如果需要自己再添加页面（指的是views），注意命名格式

![router](https://images.gitee.com/uploads/images/2021/0118/202002_b641e614_7367930.png "屏幕截图.png")

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
