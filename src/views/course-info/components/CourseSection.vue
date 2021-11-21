<template>
  <div class="course-section">
    <!-- 章节 -->
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时 -->
    <p
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      class="lesson"
    >
      <!-- 课时标题 -->
      <span v-text="item.theme"></span>
      <!-- 课时图标,使用vant的icon图标组件 -->
      <van-icon v-if="item.canPlay" name="play-circle" size="20"></van-icon>
      <van-icon v-else name="lock"></van-icon>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CourseSection',
  props: {
    // 章节数据
    sectionData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.course-section {
  padding: 0 20px;
}

// 让课时标题与图标两端显示
.lesson {
  display: flex;
  justify-content: space-between;
}
</style>
