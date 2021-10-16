<template>
  <div class="course-header">
    <van-image
      :src="require('@/assets/logo.png')"
    />
  </div>
</template>

<script>
export default {
  name: 'CourseHeader'
}
</script>

<style scoped>
.course-header {
  height: 50px;
  display: flex;
  align-items: center;
}
.van-image {
  width: 180px;
  margin-left: -26px;
}
</style>
