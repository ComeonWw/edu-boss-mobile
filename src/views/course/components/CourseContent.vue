<template>
  <div class="course-content">
    <!-- 顶部广告轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <!-- 底部课程列表 -->
    <course-content-list
      :fetch-data="fetchData"
    ></course-content-list>
  </div>
</template>

<script>
import { getAllAds, getQueryCourses } from '@/services/course'
import CourseContentList from '@/components/CourseContentList.vue'

export default {
  name: 'CourseContent',
  components: {
    CourseContentList
  },
  data () {
    return {
      // 轮播图案列表
      adList: []
    }
  },
  created () {
    // 请求轮播图图片信息
    this.loadAds()
    // 将接口设置给fetchData
    this.fetchData = getQueryCourses
  },
  methods: {
    // fetchData (options) {
    //   return getQueryCourses(options)
    // },
    async loadAds () {
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      // 保存广告信息
      this.adList = data.content[0].adDTOList
    }
  },
  computed: {
    // 通过计算属性，筛选上架状态的广告
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  }
}
</script>

<style scoped>
.my-swipe {
  width: 100%;
}
.my-swipe img {
  height: 170px;
}
.my-swipe .van-swipe-item {
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>
