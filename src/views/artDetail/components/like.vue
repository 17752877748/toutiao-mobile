<template>
  <van-cell>
    <template slot="title">
      <div class="zan-like">
        <div v-show="detailObj.attitude != 0">
          <van-button
            v-if="detailObj.attitude == 1"
            icon="star"
            type="danger"
            @click="goCancelZan"
          >取消点赞</van-button>
          <van-button v-else icon="star-o" @click="goZan">点 赞</van-button>
        </div>
        <div>
          <van-button
            v-if="detailObj.attitude == 0"
            icon="like"
            type="danger"
            @click="goCancelDislike"
          >取消不喜欢</van-button>
          <van-button v-else icon="like-o" @click="goDislike">不喜欢</van-button>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { zan, cancelZan, dislike, cancelDislike } from "@/api/article.js";

export default {
  props: ["detailObj"],
  methods: {
    // 点赞
    async goZan() {
      let res = await zan(this.detailObj.art_id);
      this.detailObj.attitude = 1;
      console.log(res);
    },
    // 取消点赞
    async goCancelZan() {
      let res = await cancelZan(this.detailObj.art_id);
      this.detailObj.attitude = -1;
      console.log(res);
    },
    // 不喜欢
    async goDislike() {
      let res = await dislike(this.detailObj.art_id);
      this.detailObj.attitude = 0;
      console.log(res);
    },
    // 取消不喜欢
    async goCancelDislike() {
      let res = await cancelDislike(this.detailObj.art_id);
      this.detailObj.attitude = -1;
      console.log(res);
    }
  }
};
</script>

<style>
/* // 点赞/不喜欢居中 */
.zan-like {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
</style>