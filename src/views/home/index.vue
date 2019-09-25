<template>
  <div class="home">
    <!-- 搜索框 -->
    <van-search shape="round" background="#3296fa" placeholder="请输入搜索关键词" v-model="search" />
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
                <div class="recommend">
                  <p class="title">{{item.title}}</p>
                  <div class="pic">
                    <img v-for="img in item.cover.images" :src="img" alt />
                  </div>
                  <p class="footer">
                    <span>置顶</span>
                    <span>{{item.aut_name}}</span>
                    <span>{{item.comm_count}} 评论</span>
                    <span>{{item.pubdate}}</span>
                    <a href="javascript:;">
                      <van-icon name="cross" color="#cecece" size="10px 10px" />
                    </a>
                  </p>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '90%' }" />
  </div>
</template>

<script>
import { getChannel } from "@/api/channel.js";
import { getArticle } from "@/api/article.js";
export default {
  name: "home",
  data() {
    return {
      // 绑定搜索
      search: "",
      // 弹出层是否显示
      show: false,
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
      console.log(res);
    }
  },
  async created() {
    // 获取频道列表
    let data = await getChannel();
    this.channelList = data.data.data.channels;
    // 进入页面加载一次数据;
    let res = await this.loadArticle();
    this.articleList = res.data.data.results;
  }
};
</script>

<style lang="less" scoped>
.home {
  margin: 108px 0 52px 0;
  background-color: #fff;
  // tab栏
  .content {
    /deep/.van-tabs__wrap {
      position: fixed;
      left: 0;
      top: 64px;
      z-index: 999;
      width: 92%;
    }
    // 点击弹出层
    .right-nav {
      position: fixed;
      right: 0;
      top: 64px;
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
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 64px;
  }
  // 取消每行的默认内边距
  .van-cell {
    padding: 0;
  }
  // 内容
  .recommend {
    padding: 13px 12px 16px;
    .title {
      font-size: 16px;
    }
    .pic {
      width: 100%;
      max-height: 74px;
      margin: 15px 0;
      img {
        width: 115px;
        height: 74px;
        margin: 0 1px;
      }
    }
    .footer {
      span {
        margin-right: 10px;
        color: #b4b4b4;
        &:first-child {
          color: #e22829;
        }
      }
      a {
        float: right;
      }
    }
  }
}
</style>