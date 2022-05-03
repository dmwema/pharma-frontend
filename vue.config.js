module.exports = {
    runtimeCompiler: true,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Muse - Vue Ant Design Dashboard PRO by Creative Tim'
                return args
            })
    },
    devServer: {
        proxy: 'http://localhost:8080'
    }
}