export default {
    singular: true,
    plugins: [
      ['umi-plugin-react', {
        antd: true,
        dva: true
        // 这里暂时还没有添加配置，该插件还不会有作用，我们会在后面的课程按照需求打开相应的配置
      }],
    ],
    routes: [{
      path: '/',
      component: 'amap',
      // routes: [
      //   {
      //     path: '/planning',
      //     component: 'index',
      //   },
      //   {
      //     path: '/puzzlecards',
      //     component: 'puzzlecards',
      //   },
      //   {
      //     path: '/index',
      //     component: 'index',
      //   },
      //   {
      //     path: '/configuration',
      //     routes: [
      //       { path: '/configuration/aircraft_information', component: 'Configuration/Aircraft' },
      //       { path: '/configuration/goods_information', component: 'Configuration/Goods' },
      //       { path: '/configuration/display', component: 'Configuration/Display' }
      //     ]
      //   },
      // ]
    }],

    proxy: {
      '/dev': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        // pathRewrite: { "^/dev": "" }
      },
    },

  }