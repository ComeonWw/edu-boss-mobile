module.exports = {
  // 去除不必要的map文件
  productionSourceMap: false,
  css: {
    // 将单独的css文件改为行内引入，适合css体积比较小的情况
    extract: false
  }
}
