package sk.tuke.kpi.oop.game.characters;

import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.graphics.Animation;
import sk.tuke.kpi.oop.game.Direction;
import sk.tuke.kpi.oop.game.Movable;

public class Ripley extends AbstractActor implements Movable {
    private Animation animation;
    public Ripley() {
        super("Ellen");
        animation = new Animation("sprites/player.png", 32, 32,
            0.1f, Animation.PlayMode.LOOP_PINGPONG);
        setAnimation(animation);
    }
    @Override
    public void startedMoving(Direction direction){
        Movable.super.startedMoving(direction);
    }

    @Override
    public void stoppedMoving(){
        Movable.super.stoppedMoving();
    }

}
