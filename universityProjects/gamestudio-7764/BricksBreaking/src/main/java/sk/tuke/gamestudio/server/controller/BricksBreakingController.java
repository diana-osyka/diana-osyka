package sk.tuke.gamestudio.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sk.tuke.gamestudio.game.bricksbreaking.core.FieldState;
import sk.tuke.gamestudio.game.bricksbreaking.core.GameField;
import sk.tuke.gamestudio.game.bricksbreaking.core.GameMode;
import sk.tuke.gamestudio.game.bricksbreaking.core.GameModeState;

@Controller
@RequestMapping("/api/bricksBreaking")
@CrossOrigin(origins = "http://localhost:3000")
@ResponseBody
public class BricksBreakingController {
    private GameField field;
    private GameMode gameMode;
    private int finalScore;
    private int failsLeft;
    private GameObject gameObject;

    public BricksBreakingController(){
        field = new GameField();
        finalScore = 0;
        failsLeft = 5;
        GameObject gameObject = new GameObject(field, failsLeft, finalScore);
    }
    @GetMapping()
    public GameObject bricksBreaking(){
        setGameObject(field, failsLeft, finalScore);
        return this.gameObject;
    }
    @GetMapping("/open/{row}/{column}")
    public GameObject openTile(@PathVariable Integer row, @PathVariable Integer column) {
        if(GameModeState.ENDLESS == gameMode.getGameModeState()){
            field.BreakSection(row, column);
            if(failsLeft - field.getFailsAmount() < 1){
                field.setFieldState(FieldState.FAILED);
            }
            if(field.getFieldState() == FieldState.SOLVED){
                finalScore = finalScore + field.getScoreForThisField();
                failsLeft = failsLeft - field.getFailsAmount();
                field = new GameField();
            }
        } else{
            field.BreakSection(row, column);
        }
        setGameObject(field, failsLeft, finalScore);
        return this.gameObject;
    }
    @GetMapping("/newGame/{modeInput}")
    public GameObject createNewField(@PathVariable String modeInput) {
        gameMode = new GameMode(modeInput);
        field = new GameField();
        failsLeft = 5;
        finalScore = 0;
        setGameObject(field, failsLeft, finalScore);
        return this.gameObject;
    }
    @GetMapping("/endGame")
    public GameObject endGame() {
        gameMode = null;
        field.setFieldState(FieldState.FAILED);
        setGameObject(field, failsLeft, finalScore);
        return this.gameObject;
    }

    public void setGameObject(GameField field, int failsLeft, int finalScore) {
        this.gameObject = new GameObject(field, failsLeft, finalScore);
    }
}