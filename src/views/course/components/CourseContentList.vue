<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
    >
      <!-- 课程列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
        >
          <div>
            <img :src="item.courseImgUrl" alt="">
          </div>
          <div class="course-info">
            <h3 v-text="item.courseName"></h3>
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <p class="price-container">
              <span class="course-discounts">￥{{item.discounts}}</span>
              <s class="course-price">￥{{item.price}}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContentList',
  data () {
    return {
      // 数据列表
      list: [],
      // 是否要进行加载
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  methods: {
    async onLoad () {
      // 发送请求，请求上架课程信息
      const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 检测，如果没有数据了，结束，如果有，保存
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      }
      // 下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (data.data.records.length < 10) {
        this.finished = true
      }
    },
    async onRefresh () {
      // 还原数据页数为1
      this.currentPage = 1
      // 重新请求数据
      const { data } = await getQueryCourses({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 如果数据存在，清空并保存新数据，否则结束
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      }
      // 提示
      this.$toast('刷新成功')
      // 关闭下拉提示框
      this.isRefreshing = false
    }
  }
}
</script>

<style lang="scss">
// 设置固定定位，解决列表滚动，导航和轮播也跟着滚动的问题。
.course-content-list {
  position: fixed;
  left: 0;
  right: 0;
  // 直接设置，CourseContentList和CourseContent耦合度比较高
  // top: 220px;
  // bottom: 50px;
  // 解耦
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

// 课程条目设置flex,内部元素左右显示
.van-cell__value {
  height: 100px;
  padding: 10px 0;
  display: flex;
}

// 左侧图设置固定尺寸
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}

// 右侧内容区域，flex: 1 撑满父元素
.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.course-info .course-preview {
  flex-grow: 1;
}

.course-info .course-discounts {
  color: #ff7452;
  margin-right: 10px;
}

p h3 {
  margin: 0;
}
</style>
