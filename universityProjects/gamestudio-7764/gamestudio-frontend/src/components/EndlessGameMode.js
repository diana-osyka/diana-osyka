import {Button, Form} from "react-bootstrap";
import {GameField} from "./GameField";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

export function EndlessGameMode({fieldObj, onOpenBrick, onTryAgain, onSaveScore}){

    const field = fieldObj.field;
    const [isSaved, setIsSaved] = useState(false);
    const handleOpenBrick = (row, column) => {
        onOpenBrick(row, column);
    }
    const handleTryAgain = () => {
        onTryAgain();
        setIsSaved(false);
    }
    const handleSaveScore = () => {
        setIsSaved(true);
        onSaveScore();
    }
    const isPlaying = (field) => {
        if(field.fieldState === "PLAYING"){
            return true;
        } else{
            return false;
        }
    }
    const isSolved = (field) => {
        if(field.fieldState === "SOLVED"){
            return true;
        } else{
            return false;
        }
    }
    const isFailed = (field) => {
        if(field.fieldState === "FAILED"){
            return true;
        } else{
            return false;
        }
    }
    return(
        <div className={"fieldWrap"}>
            {field && isPlaying(field) && <div className="scoresWrapper">
                <h3>Fails left: {fieldObj?.failsLeft - field.failsAmount}</h3>
                <h3>Score: {fieldObj?.finalScore + field.scoreForThisField}</h3>
            </div>}
            {field && isPlaying(field) && <GameField bricksSpaces={field.bricksSpaces} onOpenBrick={handleOpenBrick}></GameField>}
            {field && !isPlaying(field) && <h1 onClick={handleTryAgain} className={"endMessageTry"} style={{color: 'yellow'}}>try again</h1>}
            {field && isFailed(field) && <h1 className={"endMessage"} style={{color: 'red'}}>GAME OVER!</h1>}
            {field && isFailed(field) && <h1 className={"endMessage"} style={{color: 'black'}}>Score: {fieldObj?.finalScore + field.scoreForThisField}</h1>}
            {field && isFailed(field) && <h1 className={"endMessage"}><Button disabled={isSaved} onClick={handleSaveScore}>SAVE</Button></h1>}
        </div>
    )
}