<template>
  <div class="list">
    <van-nav-bar title="搜索结果" left-arrow @click-left="fanhui" />
    <!-- list列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, i) in resultList" :key="i" :title="item.aut_name" @click="goArtDetail(item.art_id)">
        <template slot="label">
          <p>{{item.title}}</p>
          <van-grid :column-num="3">
            <van-grid-item text="评论" @click.stop="$login"/>
            <van-grid-item text="点赞" />
            <van-grid-item text="收藏" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { searchResult } from "@/api/article.js";

export default {
  name: "list",
  data() {
    return {
      // 搜索结果
      resultList: [],
      // 加载中
      loading: false,
      // 是否加载完成,加载完成不在触发onload事件
      finished: false,
      // 第几页
      page: 1,
      // 每页多少条数据
      per_page: 10
    };
  },
  methods: {
    // 点击文章进入文章详情
    goArtDetail(id) {
      // console.log(id);
      this.$router.push(`/artDetail/${id}`);
    },
    // 点击评论
    // comment() {
      // this.$login();
      // console.log('111');
    // },
    // 未铺满时,会自动加载.
    async onLoad() {
      let res = await searchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.$route.params.key
      });
      console.log(res);
      this.resultList.push(...res.data.data.results);
      console.log(this.resultList);
      this.page++;
      this.loading = false;
      let totalPage = Math.ceil(res.data.data.total_count / this.per_page);
      if (totalPage == this.page) {
        this.finished = true;
      }
    },
    //  点击返回时间
    fanhui() {
      this.$router.push("/search");
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  margin-top: 46px;
  .van-list {
    background-color: #eeeeee;
    .van-cell {
      margin-bottom: 10px;
    }
  }
}
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 46px;
  z-index: 999 !important;
}
</style>