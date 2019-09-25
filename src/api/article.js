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