import React from 'react';
import {useForm} from "react-hook-form";
import {Brick} from "./Brick";

export function GameField({ bricksSpaces, onOpenBrick }) {
    return (
        <div className={"field"}>
            {bricksSpaces.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex'}}>
                    {row.map((brick, brickIndex) => (
                        <Brick key={`tile-${rowIndex}-${brickIndex}`} brick={brick} onOpenBrick={() => onOpenBrick(rowIndex, brickIndex)}/>
                    ))}
                </div>
            ))}
        </div>
    );
}
