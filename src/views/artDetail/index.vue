<template>
  <div class="artDetail">
    <van-nav-bar title="文章详情" left-arrow @click-left="onClickLeft" />

    <!-- 文章标题 -->
    <van-cell>
      <template slot="title">
        <h2>{{ detailObj.title }}</h2>
      </template>
    </van-cell>

    <!-- 作者组件 -->
    <author :detailObj="detailObj"></author>

    <!-- 文章内容 -->
    <van-cell>
      <template slot="title">
        <div class="art-content" v-html="detailObj.content"></div>
      </template>
    </van-cell>

    <!-- 点赞/不喜欢 -->
    <like :detailObj="detailObj"></like>

    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment v-for="(item, i) in cmtList" :key="i" :item="item" @reply="sonValue"></comment>
    </van-list>

    <!-- 底部评论输入框 -->
    <send :detailObj="detailObj" :cmtList="cmtList" :isReply="false"></send>

    <!-- 回复评论弹出层 -->
    <van-popup v-model="replyShow" position="bottom" :style="{ height: '60%' }">
      <div class="popup-box">
        <van-cell>
          <h3>当前评论</h3>
        </van-cell>

        <!-- 当前评论组件 -->
        <comment :item="currentItem"></comment>

        <van-cell>
          <h3>当前评论回复</h3>
        </van-cell>

        <!-- 当前评论回复组件 -->
        <van-list
          v-model="replyLoading"
          :finished="replyFinished"
          finished-text="没有更多了"
          @load="replyOnLoad"
        >
          <comment v-for="(item, i) in replyList" :key="i" :item="item"></comment>
        </van-list>

        <!-- 发送回复评论组件 -->
        <send :isReply="true" :currentItem="currentItem" :detailObj="detailObj" :replyList="replyList"></send>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 导入发布评论组件
import send from "./components/send.vue";
// 导入评论列表cell组件
import comment from "./components/comment.vue";
// 导入点赞/不喜欢组件
import like from "./components/like.vue";
// 导入作者组件
import author from "./components/author.vue";
// 导入获取文章详情
import { getArtDetail } from "@/api/article.js";
// 导入获取评论接口
import { getComment } from "@/api/comment.js";
export default {
  data() {
    return {
      // 回复评论的弹出层,是否显示
      replyShow: false,
      // 文章id
      artId: this.$route.params.id,
      // 获取到的文章详情对象
      detailObj: {},
      // 加载中
      loading: false,
      // 滚动到底部时是否触发onload事件
      finished: false,
      // 绑定评论输入的值
      // commentVal: "",

      // 获取评论需要传的参数
      query: {
        type: "a",
        source: this.$route.params.id,
        offset: undefined,
        limit: 10
      },
      // 保存获取到的评论的数组
      cmtList: [],

      // 保存当前点击的回复的评论数据
      currentItem: {},

      // 回复评论,弹出层中的评论列表
      replyLoading: false,
      replyFinished: false,

      // 获取弹出层回复评论需要的参数
      replyQuery: {
        type: "c",
        source: 0,
        offset: undefined,
        limit: 10
      },
      // 弹出层回复评论的数组
      replyList: []
    };
  },
  methods: {
    // 弹出层的onLoad事件
    async replyOnLoad() {
      let res = await getComment(this.replyQuery);
      this.replyList.push(...res.data.data.results);
      this.replyQuery.offset = res.data.data.last_id;
      this.replyLoading = false;
      // console.log(res);
      if (res.data.data.end_id == res.data.data.last_id) {
        this.replyFinished = true;
      }
    },
    // 子组件传递过来的数据
    // 这个形参就是子组件传递过来的$event
    sonValue(value) {
      // 每次重新打开弹出层都把之前的内容清空一下
      this.replyList = [];
      // 先把数据改为undefined,如果有参数,下面重新赋值.
      this.replyQuery.offset = undefined;
      // 避免上一次加载完了所有数据,进来直接不触发onload事件
      this.replyFinished = false;

      this.replyShow = value.replyShow;
      // 当前评论数据
      this.currentItem = value.item;
      // 获取当前评论的id给replyQuery的source // 值是经过大数据处理的,需要tostring一下
      this.replyQuery.source = value.item.com_id.toString();
    },
    //点击左边箭头返回搜索列表
    onClickLeft() {
      this.$router.back();
    },
    // 滚动到最底部时加载
    // 文章评论
    async onLoad() {
      let res = await getComment(this.query);
      // console.log(res);
      this.cmtList.push(...res.data.data.results);
      this.query.offset = res.data.data.last_id;
      this.loading = false;
      if (res.data.data.end_id == res.data.data.last_id) {
        this.finished = true;
      }
    }
  },
  // 进入页面获取文章详情
  async created() {
    let res = await getArtDetail(this.artId);
    this.detailObj = res.data.data;
    // console.log(res);
  },
  // 组件
  components: {
    author,
    like,
    comment,
    send
  }
};
</script>

<style lang="less" scoped>
.artDetail {
  margin-top: 46px;
  margin-bottom: 66px;
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #1989fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-nav-bar__left {
      i {
        color: #fff;
      }
    }
  }
  // 文章内容
  .art-content {
    word-break: break-all;
    /deep/ img {
      width: 100%;
    }
  }
  // 弹出层
  .popup-box {
    margin-bottom: 66px;
  }
}
</style>