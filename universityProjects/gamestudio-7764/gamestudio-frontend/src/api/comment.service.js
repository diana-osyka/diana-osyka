import gsAxios from "./index";
import {formatDate} from "./utils";

export const fetchComments = game => gsAxios.get('/comment/' + game);
export const addComment = (game, player, commentText) => gsAxios.post('/comment', {
    game, player, commentText, playedAt: formatDate(new Date())
});