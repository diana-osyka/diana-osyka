import gsAxios from "./index";
import {formatDate} from "./utils";

export const isValidUser = (userName, password) => gsAxios.get(`/users/${userName}/${password}`);

// TODO
// export const addUser = (game, player, mark) => gsAxios.post('/rating', {
//     game, player, playedAt: formatDate(new Date()), mark
// });