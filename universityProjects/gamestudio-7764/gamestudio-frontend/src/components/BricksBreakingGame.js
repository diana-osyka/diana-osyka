import React, {useEffect, useState} from "react";
import {fieldService} from "../api/fiels.services";
import {GameField} from "./GameField";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {EndlessGameMode} from "./EndlessGameMode";
import CountdownTimer from "./CountdownTimer";
import {TimeLimitedGameMode} from "./TimeLimitedGameMode";
import * as scoreService from "../api/score.service";

export function BricksBreakingGame({player, onUpdateScores}) {

    const [fieldObj, setFieldObj] = useState(null);
    const [gameMode, setGameMode] = useState(null);
    const [dateTime, setDateTime] = useState(null);
    const [timeOut, setTimeOut] = useState(false);
    useEffect(() => {
        fieldService.fetchField("bricksBreaking").then(response => {
            setFieldObj(response.data); // Ensure response.data is the actual field object
        });
    }, []);
    const {
        handleSubmit,
        formState: { errors , isValid},
    } = useForm();

    const handleOpenBrick = (row, col) => {
        fieldService.openTileField(row, col).then(response => {
            setFieldObj(response.data); // Ensure response.data is the actual field object
        });
    };
    const handleTimeLimitedClick = () => {
        setTimeOut(false);
        setGameMode("T");
        const TIME = 1 * 10 * 1000;
        const NOW_IN_MS = new Date().getTime();
        setDateTime(NOW_IN_MS + TIME);
        fieldService.newGame("T").then(response => {
            setFieldObj(response.data); // Ensure response.data is the actual field object
        });
    };
    const handleEndlessClick = () => {
        setGameMode("E");
        fieldService.newGame("E").then(response => {
            setFieldObj(response.data); // Ensure response.data is the actual field object
        });
    };
    const handleTryAgain = () => {
        if(gameMode === "E"){
            handleEndlessClick();
        } else{
            handleTimeLimitedClick();
        }
    };
    const handleOnEndOfTime = () => {
        fieldService.endGame().then(response => {
            setTimeOut(true);
            setFieldObj(response.data); // Ensure response.data is the actual field object
        });
    };
    const handleSaveScore = () => {
        console.log("FIELD:" + fieldObj);
        if (fieldObj.finalScore + fieldObj.field.scoreForThisField > 0){
            onUpdateScores('bricksBreaking', gameMode, player, fieldObj.finalScore + fieldObj.field.scoreForThisField);
        }
    }

    return(
        <div className={"fieldWrap"}>
            {!gameMode && <div className={"chooseMode"}>
                <div className={"gameMode"} onClick={handleTimeLimitedClick}>TIME-LIMITED</div>
                <div className={"gameMode"} onClick={handleEndlessClick}>ENDLESS</div>
            </div>}
            {gameMode==="E" &&
                <EndlessGameMode onTryAgain={handleTryAgain} fieldObj={fieldObj} onOpenBrick={handleOpenBrick} onSaveScore={handleSaveScore}/>}
            {gameMode==="T" &&
                <TimeLimitedGameMode timeOut={timeOut} targetDate={dateTime} onTryAgain={handleTryAgain}
                                     fieldObj={fieldObj} onOpenBrick={handleOpenBrick}
                                     onEndOfTime={handleOnEndOfTime}
                                     onSaveScore={handleSaveScore}
                />}

        </div>
    )
}