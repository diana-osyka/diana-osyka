package sk.tuke.kpi.oop.game.actions;

import sk.tuke.kpi.gamelib.actions.Action;
import sk.tuke.kpi.oop.game.Direction;
import sk.tuke.kpi.oop.game.Movable;

public class Move implements Action<Movable> {
    private Direction direction;
    private Movable actor;
    private float duration;

    public Move(Direction direction, float duration){
        this.direction = direction;
        this.duration = duration;
    }
    @Override

}
