module.exports = {
  // 配置的插件
  plugins: {
    autoprefixer: {
      // browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      // 设置哪些需要将px转换为rem, *代表所有
      propList: ['*']
    }
  }
}
