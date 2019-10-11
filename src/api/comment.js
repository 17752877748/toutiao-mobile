import { http } from '@/utils/http/'

// 获取评论或评论回复
export const getComment = ({ type, source, offset, limit }) => {
    return http.get("/app/v1_0/comments", {
        params: {
            type,
            source,
            offset,
            limit
        }
    });
}

// 添加评论或评论回复
export const addComment = ({ target, content, art_id }) => {
    return http.post("/app/v1_0/comments", {
        target,
        content,
        art_id
    });
}

// 对评论或评论回复点赞
export const cmtZan = id => {
    return http.post("/app/v1_0/comment/likings", {
        target: id
    });
}

// 取消对评论或评论回复点赞
export const cancelCmtZan = id => {
    return http.delete(`/app/v1_0/comment/likings/${id}`);
}

