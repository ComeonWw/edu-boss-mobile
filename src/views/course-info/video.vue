<template>
  <div class="course-video">
    <!-- 导航 -->
    <van-nav-bar
      title="视频"
      left-text="返回"
      @click-left="$router.go(-1)"
    ></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'CourseVideo',
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
