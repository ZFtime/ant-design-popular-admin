const path = require('path')
const { IgnorePlugin } = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProd = process.env.NODE_ENV === 'production'
const isAnalyze = process.env.IS_ANALYZ === 'true'

function resolve (dir) {
  return path.join(__dirname, dir)
}

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    moment: 'moment'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.bootcss.com/vue/2.6.11/vue.min.js',
    '//cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    '//cdn.bootcss.com/moment.js/2.24.0/moment.min.js'
  ]
}

const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': resolve('./src/core/icons.ts')
      }
    },
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'link-color': '#ff5000',
          // 'primary-color': '#ff5000',
          // 'brand-color': '#1dc9b7',
          'border-radius-base': '1px'
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    // assets require on cdn
    isProd && config.plugin('html').tap(args => {
      args[0].cdn = assetsCDN
      return args
    })
    // if `IS_ANALYZE` env is TRUE on report bundle info
    isAnalyze && config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      {
        analyzerMode: 'static'
      }
    ])
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mock /src/main.jsL11
    proxy: {
      '/api': {
        target: 'https://mock.ihx.me/mock',
        ws: false,
        changeOrigin: true
      }
    }
  },
  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
if (isProd) {
  vueConfig.configureWebpack.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = vueConfig
