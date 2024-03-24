package sk.tuke.gamestudio.game.bricksbreaking.core;

import java.util.Objects;

public class GameMode {
    private GameModeState gameModeState;
    public GameMode(String gameMode){
        gameModeState = null;
        setUpGameMode(gameMode);
    }
    private void setUpGameMode(String gameMode) {
        if(Objects.equals(gameMode, "E") || Objects.equals(gameMode, "e")){
            this.gameModeState = GameModeState.ENDLESS;
        } else if (Objects.equals(gameMode, "T") || Objects.equals(gameMode, "t")) {
            this.gameModeState = GameModeState.TIMELIMITED;
        }
    }

    public GameModeState getGameModeState() {
        return gameModeState;
    }
}
