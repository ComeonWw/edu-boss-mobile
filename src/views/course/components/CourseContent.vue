<template>
  <div class="course-content">
    <!-- 顶部广告轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getAllAds } from '@/services/course'

export default {
  name: 'CourseContent',
  data () {
    return {
      // 轮播图案列表
      adList: []
    }
  },
  created () {
    this.loadAds()
  },
  methods: {
    async loadAds () {
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      // 保存广告信息
      this.adList = data.content[0].adDTOList
    }
  },
  computed: {
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
</style>
