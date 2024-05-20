package sk.tuke.gamestudio.server.controller;

import sk.tuke.gamestudio.game.bricksbreaking.core.GameField;

public class GameObject{
    private GameField field;
    private int failsLeft;
    private int finalScore;

    public GameObject(){}
    public GameObject(GameField field, int failsLeft, int finalScore){
        this.field = field;
        this.failsLeft = failsLeft;
        this.finalScore = finalScore;
    }

    public GameField getField() {
        return field;
    }

    public void setField(GameField field) {
        this.field = field;
    }

    public int getFailsLeft() {
        return failsLeft;
    }

    public void setFailsLeft(int failsLeft) {
        this.failsLeft = failsLeft;
    }

    public int getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(int finalScore) {
        this.finalScore = finalScore;
    }
}