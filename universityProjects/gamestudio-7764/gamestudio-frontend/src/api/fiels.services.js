import gsAxios from "./index";

const fetchField = game => gsAxios.get(game);
const newGame = (mode) => {
    if(mode === "T"){
        return(gsAxios.get("/bricksBreaking/newGame/T"));
    }else{
        return(gsAxios.get("/bricksBreaking/newGame/E"));
    }
};
const openTileField = (row, col) => gsAxios.get(`bricksBreaking/open/${row}/${col}`);
const endGame =() => gsAxios.get(`bricksBreaking/endGame`);
export const fieldService = { fetchField, newGame, openTileField, endGame};