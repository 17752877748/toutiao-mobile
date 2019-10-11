<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(value)"
        @cancel="onCancel"
        @input="goInput"
      />
    </form>
    <!-- 搜索联动 -->
    <van-cell-group v-if="searchArr.length > 0">
      <van-cell v-for="item in searchArr" icon="search">
        <template slot="title">
          <div v-html="item"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="搜索历史">
        <van-icon
          v-show="hisShow"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          @click="hisShow=false"
        />
        <div v-show="!hisShow">
          <van-button round size="mini" type="info" @click="delAll">全部删除</van-button>
          <van-button round size="mini" type="primary" @click="hisShow=true">完成</van-button>
        </div>
      </van-cell>
      <van-cell v-for="(item, i) in historyList" :key="i" icon="search" :title="item" @click="hisSearch(item)">
        <van-icon
          v-show="!hisShow"
          @click="rowDel(i)"
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { searchLink, getHistory, delHistory } from "@/api/article.js";
export default {
  name: "search",
  data() {
    return {
      // 双向绑定搜索框的值
      value: "",
      // 搜索联动数组列表
      searchArr: [],
      // 防抖
      timeID: null,
      // 搜索历史列表
      historyList: [],
      // 搜索历史垃圾桶开关
      hisShow: true
    };
  },
  methods: {
    // 搜索
    onSearch(key) {
      this.$router.push(`/list/${key}`);
    },
    // 历史记录搜索
    hisSearch(item) {
      this.$router.push(`/list/${item}`);
    },
    // 取消
    onCancel() {
      console.log("取消了");
    },
    // input事件
    goInput() {
      if (this.timeID) {
        clearTimeout(this.timeID);
      }
      this.timeID = setTimeout(async () => {
        // 如果搜索框为空,则不发请求,数组清空
        if (this.value.trim() == "") {
          this.searchArr = [];
          return;
        }
        let res = await searchLink(this.value);
        this.searchArr = res.data.data.options;
        this.searchArr = this.searchArr.map(item => {
          let reg = new RegExp(this.value, "ig");
          item = item.replace(
            reg,
            `<span style="color: red; font-weith: 500;">${this.value}</span>`
          );
          return item;
        });
        // console.log(this.searchArr);
      }, 300);
    },
    // 删除全部
    async delAll() {
      let res = await delHistory();
      //   console.log(res);
      this.historyList = [];
    },
    // 删除一行
    rowDel(index) {
      this.historyList.splice(index, 1);
    }
  },
  async created() {
    let res = await getHistory();
    this.historyList = res.data.data.keywords;
  }
};
</script>

<style>
</style>