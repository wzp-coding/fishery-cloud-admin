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
        }
    }
}