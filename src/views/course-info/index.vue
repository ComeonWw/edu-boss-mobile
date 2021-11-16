<template>
  <div class="course-info">
    <van-cell-group>
      <!-- 课程图片 -->
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <!-- 课程描述 -->
      <van-cell class="course-description">
        <!-- 课程名称 -->
        <h2 v-text="course.courseName"></h2>
        <!-- 课程概述 -->
        <p v-text="course.previewFirstField"></p>
        <!-- 课程销售信息 -->
        <div class="course-saleInfo">
          <p class="course-price">
            <span class="discounts">￥{{ course.discounts }} </span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}⼈已购</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <!-- 课程详细内容 -->
      <van-cell class="course-detail"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'

export default {
  name: 'CourseInfo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {}
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  padding: 0;
}

.course-img {
  height: 280px;
}

.course-description {
  padding: 10px 20px;
  height: 150px;
}

.course-description h2 {
  padding: 0;
}

.course-saleInfo {
  display: flex;
}

.course-price {
  flex: 1;
  margin: 0;
}

.course-price .discounts {
  color: #ff7452;
  font-size: 24px;
  font-weight: 700;
}

.course-saleInfo .tag {
  line-height: 15px;
  background: #f8f9fa;
  border-radius: 2px;
  padding: 7px 8px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  margin-left: 10px;
}
</style>
