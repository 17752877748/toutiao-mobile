<template>
  <div class="home">
    <!-- 搜索框 -->
    <!-- <van-search shape="round" background="#3296fa" placeholder="请输入搜索关键词" v-model="search" /> -->
    <van-nav-bar title="首页" />
    <!-- 中间所有内容 -->
    <div class="content">
      <!-- 点击触发弹出层 -->
      <div class="right-nav" @click="show = true">
        <van-icon name="wap-nav" />
      </div>
      <!-- tab栏 -->
      <van-tabs
        v-model="activeTab"
        animated
        line-width="16px"
        color="#3296fa"
        title-active-color="#000"
        @change="articleChange"
      >
        <!-- 内容 -->
        <van-tab v-for="items in channelList" :title="items.name">
          <!-- 上面下拉刷新 -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 行列表 -->
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="我是有底线的好吗~"
              @load="onLoad"
            >
              <van-cell v-for="(item, i) in articleList" :key="i">
                <template slot="title">
                  <div @click="$router.push(`/artDetail/${item.art_id}`)">{{item.title}}</div>
                </template>
                <template slot="label">
                  <!-- 放图片的宫格 -->
                  <van-grid :border="false" :column-num="3" v-if="item.cover.type > 0">
                    <van-grid-item v-for="image in item.cover.images">
                      <van-image :src="image" @click="$router.push(`/artDetail/${item.art_id}`)" />
                    </van-grid-item>
                  </van-grid>
                  <!-- 下面文字 -->
                  <div class="bottom-txt">
                    <span>{{item.aut_name}}</span>
                    <span>{{item.comm_count}}评论</span>
                    <span>{{item.pubdate | relvTime}}</span>
                    <van-icon name="close" style="float: right;" @click="goClose(item)" />
                  </div>
                </template>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 弹出层 -->
    <channel v-model="show" :activeNum.sync="activeTab" :currentChannel.sync="channelList"></channel>
    <!-- 举报/反馈等 -->
    <report v-model="isShow" :art_id="art_id" :aut_id="aut_id" :articleList="articleList"></report>
  </div>
</template>

<script>
// 导入举报组件
import report from "./report.vue";
//
import { getChannel } from "@/api/channel.js";
import { getArticle } from "@/api/article.js";
import channel from "./channel.vue";
import { getChannel as loaclChannel } from "@/utils/storage/";
import { setChannel } from "@/utils/storage";

export default {
  name: "home",
  data() {
    return {
      // 点击x层时,传递过去的id
      art_id: "",
      aut_id: "",
      // x层是否显示
      isShow: false,
      // 弹出层是否显示
      show: false,
      // 绑定搜索
      search: "",
      // 当前tab
      activeTab: 0,
      // channel频道列表
      channelList: [],
      // 文章列表
      articleList: [],
      // 加载中
      loading: false,
      // 完成,不加载
      finished: false,
      // 上面下拉是否完成
      isLoading: false
    };
  },
  methods: {
    // 加载文章数据
    async loadArticle() {
      let channel_id = this.channelList[this.activeTab].id;
      let timestamp = Date.now();
      let with_top = 1;
      let res = await getArticle({ channel_id, timestamp, with_top });
      if (res.data.data.results.length == 0) {
        this.finished = true;
      }
      return res;
    },
    // 下面上拉触发
    async onLoad() {
      // 异步更新数据
      let res = await this.loadArticle();
      this.articleList.push(...res.data.data.results);
      setTimeout(() => {
        this.loading = false;
      }, 500);
      // 当超过一百条的时候,停止加载
      if (this.articleList.length >= 100) {
        this.finished = true;
      }
    },
    // 上面下拉触发事件
    async onRefresh() {
      let res = await this.loadArticle();
      this.articleList.unshift(...res.data.data.results);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // tab栏的频道改变
    async articleChange() {
      let res = await this.loadArticle();
      this.articleList = res.data.data.results;
      // console.log(res);
    },
    goClose(item) {
      this.isShow = true;
      this.art_id = item.art_id;
      this.aut_id = item.aut_id;
    }
  },
  async created() {
    // 获取频道列表
    let loacl = loaclChannel();
    if (this.$store.state.userInfo || !loacl) {
      let data = await getChannel();
      if (loacl) {
        let arr = loacl.filter(item1 => {
          let kg = true;
          data.data.data.channels.forEach(item2 => {
            if (item1.id == item2.id) {
              kg = false;
              return;
            }
          });
          return kg;
        });
        data.data.data.channels.push(...arr);
      }
      this.channelList = data.data.data.channels;
      // setChannel(this.channelList);
    } else {
      let res = loaclChannel();
      this.channelList = res;
    }
    // 进入页面加载一次数据;
    // let res = await this.loadArticle();
    // this.articleList = res.data.data.results;
  },
  components: {
    channel,
    report
  }
};
</script>

<style lang="less" scoped>
.home {
  margin: 90px 0 52px 0;
  background-color: #fff;
  // 头
  .van-nav-bar {
    background-color: #3296fa;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;

    .van-nav-bar__title {
      color: white;
    }
  }
  // tab栏
  .content {
    /deep/.van-tabs__wrap {
      position: fixed;
      left: 0;
      top: 46px;
      z-index: 999;
      width: 92%;
    }
    // 点击弹出层
    .right-nav {
      position: fixed;
      right: 0;
      top: 46px;
      z-index: 999;
      width: 33px;
      height: 43px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      i {
        font-size: 19px;
      }
    }
  }
  // 搜索框
  // .van-search {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: 999;
  //   width: 100%;
  //   height: 64px;
  // }
  .bottom-txt {
    span {
      margin-right: 10px;
    }
  }
}
</style>

