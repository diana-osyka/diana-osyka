import React from "react";
import blueBrick from "../image/blueBrick.svg"
import redBrick from "../image/redBrick.svg"
import greenBrick from "../image/greenBrick.svg"
export function Brick({brick, onOpenBrick}){
    const getColor = (inputColor) => {
        if (inputColor === "RED") {
            return (`url(${redBrick})`);
        } else if (inputColor === "GREEN") {
            return (`url(${greenBrick})`);
        } else if (inputColor === "BLUE") {
            return (`url(${blueBrick})`);
        } else {
            return "none"; // Correct hex code
        }
    };
    const handleBrickClick = () => {
        onOpenBrick();
    }
    return(
        <div onClick={handleBrickClick}
            className="brick"
            style={{backgroundImage: getColor(brick.brickColor)}}
        ></div>
    )
}