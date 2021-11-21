<template>
  <div class="course-info">
    <!-- 如果是已购课程，去除底部支付区域并设置主题内容区域占满屏幕 -->
    <van-cell-group :style="styleOptions">
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
      <van-cell class="course-detail">
        <!-- 选项卡 -->
        <van-tabs sticky scrollspy>
          <van-tab title="详情">
            <!-- 详情在后台是通过富文本编辑器设置的，内容为html文本，所以要通过v-html进行解析 -->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容">
            <course-section
              v-for="item in sections"
              :key="item.id"
              :section-data="item"
            />
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{ course.discounts }}</span>
        <span>￥{{ course.price }}</span>
      </div>
      <van-button type="primary">立即购买</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { getCourseById, getSectionAndLesson } from '@/services/course'
import CourseSection from './components/CourseSection.vue'

export default {
  name: 'CourseInfo',
  components: {
    CourseSection
  },
  // 接收课程id
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 课程章节信息
      sections: {},
      // 样式信息
      styleOptions: {}
    }
  },
  created () {
    this.loadCourse()
    this.loadSections()
  },
  methods: {
    async loadSections () {
      const { data } = await getSectionAndLesson({
        courseId: this.courseId
      })
      this.sections = data.content.courseSectionList
    },
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
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

.discounts {
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

// 添加底部导航后设置
.van-cell-group {
  position: fixed;
  // 预留底部⽀付区域⾼度
  width: 100%;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}

// 调整内部⽂字位置
.van-tabbar {
  line-height: 50px;
  // 设置 padding 后元素超出窗⼝
  padding: 0 20px;
  // 设置 box-sizing
  box-sizing: border-box;
  display: flex;
  // 内部元素左右显示
  justify-content: space-between;
  // 内容居中
  align-items: center;
}

span {
  font-size: 14px;
}

// 尺寸调整
.van-button {
  width: 50%;
  height: 80%;
}
</style>
