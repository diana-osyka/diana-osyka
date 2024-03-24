package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.Actor;

public interface Movable extends Actor {
    int getSpeedMoving();
    default void startedMoving(Direction direction){
    }
    default void stoppedMoving(){
    }
}
