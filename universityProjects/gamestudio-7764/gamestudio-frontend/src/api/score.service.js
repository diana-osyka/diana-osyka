import gsAxios from "./index";
import {formatDate} from "./utils";

export const fetchScore = game => gsAxios.get('/score/' + game);
export const addScore = (game, gamemode, player, points) => {
    let game_mode;
    if(gamemode === "T"){
        game_mode = "Time-limited";
    } else{
        game_mode = "Endless";
    }
    return gsAxios.post('/score', {
        game, player, points, playedAt: formatDate(new Date()), game_mode
    })
}