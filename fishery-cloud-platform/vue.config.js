module.exports = {
    devServer: {
        // 代理拦截
        proxy: {
            // 识别请求的url："/api/getInfo/A..."
            '/api': {
                // 原本请求服务器地址的域名
                target: 'https://apis.map.qq.com',
                // 是否启用Websockets
                ws: true,
                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                changeOrigin: true,
                // 将"/api去掉"(这样在浏览器看的时候不会看到api)
                pathRewrite: {
                    '^/api': ''
                }
            },
            // '/host':{
            //     target:"http://119.23.218.131:9102/",
            //     ws: true,
            //     //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
            //     changeOrigin: true,
            //     // 将"/api去掉"(这样在浏览器看的时候不会看到api)
            //     pathRewrite: {
            //         '^/host': ''
            //     }
            // },
            // '/file': {
            //     target: "http://119.23.218.131:9800/",
            //     ws: true,
            //     //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
            //     changeOrigin: true,
            //     // 将"/api去掉"(这样在浏览器看的时候不会看到api)
            //     pathRewrite: {
            //         '^/file': ''
            //     }
            // },
        }
    },
    //webpack配置
    configureWebpack: {
        //关闭 webpack 的性能提示
        performance: {
            hints: false
        }

	    //或者

	    //警告 webpack 的性能提示
	    // performance: {
        //     hints: 'warning',
        //     //入口起点的最大体积
        //     maxEntrypointSize: 50000000,
        //     //生成文件的最大体积
        //     maxAssetSize: 30000000,
        //     //只给出 js 文件的性能提示
        //     assetFilter: function (assetFilename) {
        //         return assetFilename.endsWith('.js');
        //     }
        // }
    },
    // assetsDir: 'static',
    parallel: false,
    publicPath: './',
    //生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
}