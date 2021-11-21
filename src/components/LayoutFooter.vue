<template>
  <div class="layout-footer">
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">选课</van-tabbar-item>
      <van-tabbar-item replace to="/learn" icon="search">学习</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="search">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style lang="scss" scoped>
</style>
