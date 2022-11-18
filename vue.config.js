const path = require('path');

const utils = require('./build/utils');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    filenameHashing: false,
    productionSourceMap: false,
    publicPath: '/new',
    pages: utils.setPages(),
    devServer: {
        port: 8082
    },
    // transpileDependencies: ['avue-plugin-ueditor'],
    //
    // productionSourceMap: false,
    //
    // configureWebpack: {
    //   output: {
    //     libraryExport: 'default'
    //   }
    // },
    //
    chainWebpack: (config) => {
        config.externals({
            'axios': 'axios',
            'vue': 'Vue',
            'element-ui': 'ElementUI',
            '@smallwei/avue': 'Avue',
        });
        config.resolve.alias
            .set('@', resolve('packages'))
            .set('@components', resolve('packages/components'))
            .set('@utils', resolve('packages/utils'))
            .set('@mixins', resolve('packages/mixins'))
    },

    css: {
        extract: false
    }
}
