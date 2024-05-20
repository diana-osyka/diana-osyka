import gsAxios from "./index";
import {formatDate} from "./utils";

export const fetchRating = game => gsAxios.get('/rating/' + game);
export const addRating = (game, player, mark) => gsAxios.post('/rating', {
    game, player, playedAt: formatDate(new Date()), mark
});