<template>
  <div class="learn">
    <van-nav-bar title="已购课程"></van-nav-bar>
    <!-- 顶部功能 -->
    <course-content-list :fetch-data="fetchData"></course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import { getPurchaseCourse } from '@/services/course'
import LayoutFooter from '@/components/LayoutFooter'
import CourseContentList from '@/components/CourseContentList.vue'

export default {
  name: 'Learn',
  data () {
    return {
      // 课程信息
      courseList: []
    }
  },
  components: {
    LayoutFooter,
    CourseContentList
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    }
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
