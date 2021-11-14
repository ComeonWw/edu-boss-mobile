<template>
  <div class="learn">
    <van-nav-bar title="已购课程"></van-nav-bar>
    <!-- 顶部功能 -->
    <course-content-list></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
import CourseContentList from '@/components/CourseContentList.vue'
export default {
  name: 'Learn',
  components: {
    LayoutFooter,
    CourseContentList
  }
}
</script>

<style lang="scss">
// 设置顶部与底部位置
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
