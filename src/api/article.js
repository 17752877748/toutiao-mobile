import { http } from '../utils/http/'

// 频道新闻推荐
export const getArticle = ({ channel_id, timestamp, with_top }) => {
    return http.get("/app/v1_1/articles", {
        params: {
            channel_id,
            timestamp,
            with_top
        }
    })
}

// 对文章不喜欢
export const articleHide = id => {
    return http.post("/app/v1_0/article/dislikes", {
        target: id
    });
}
// 拉黑用户
export const articleLaHei = id => {
    return http.post("/app/v1_0/user/blacklists", {
        target: id
    });
}

// 举报文章
export const repArticle = ({ target, type }) => {
    return http.post("/app/v1_0/article/reports", {
        target,
        type,
        remark: "内容不真实!"
    })
}

// 获得联想词汇
export const searchLink = q => {
    return http.get("/app/v1_0/suggestion", {
        params: {
            q
        }
    })
}

// 获取用户搜索历史
export const getHistory = () => {
    return http.get("/app/v1_0/search/histories");
}

// 删除所有历史记录
export const delHistory = () => {
    return http.delete("/app/v1_0/search/histories");
}

// 获取搜索结果
export const searchResult = ({ page, per_page, q }) => {
    return http.get("/app/v1_0/search", {
        params: {
            page,
            per_page,
            q
        }
    });
}

// 获取文章详情
export const getArtDetail = id => {
    return http.get(`/app/v1_0/articles/${id}`);
}


// 对文章点赞
export const zan = art_id => {
    return http.post("/app/v1_0/article/likings", {
        target: art_id
    });
}

// 对文章取消点赞
export const cancelZan = art_id => {
    return http.delete(`/app/v1_0/article/likings/${art_id}`);
}

// 对文章不喜欢
export const dislike = art_id => {
    return http.post("/app/v1_0/article/dislikes",{
        target: art_id
    });
}

// 取消对文章不喜欢
export const cancelDislike = art_id => {
    return http.delete(`/app/v1_0/article/dislikes/${art_id}`);
}

