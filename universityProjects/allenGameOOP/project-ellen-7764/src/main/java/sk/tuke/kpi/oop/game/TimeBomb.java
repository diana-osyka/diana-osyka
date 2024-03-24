package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.Scene;
import sk.tuke.kpi.gamelib.actions.ActionSequence;
import sk.tuke.kpi.gamelib.actions.Invoke;
import sk.tuke.kpi.gamelib.actions.Wait;
import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.graphics.Animation;

public class TimeBomb extends AbstractActor {
    private Animation activatedBombAnimation;
    private Animation detonatedBombAnimation;
    private boolean state;
    private float sec = 0;
    public TimeBomb (float sec){
        this.sec = sec;
        Animation normalBombAnimation = new Animation("sprites/bomb.png");
        activatedBombAnimation = new Animation("sprites/bomb_activated.png", 16, 16,
            0.1f, Animation.PlayMode.LOOP_PINGPONG);
        detonatedBombAnimation = new Animation("sprites/small_explosion.png", 16, 16,
            0.1f, Animation.PlayMode.LOOP_PINGPONG);
        setAnimation(normalBombAnimation);
    }

    public void activate(){
        state = true;
        setAnimation(activatedBombAnimation);
        new ActionSequence<>(
            new Wait<>(this.sec),
            new Invoke<>(this::detonate),
            new Wait<>(0.1f*8),
            new Invoke<>(this::remove)).scheduleFor(this);
    }
    public boolean isActivated() {
        return state;
    }
    private void remove(){
        Scene scene = getScene();
        if(scene != null){
            scene.removeActor(this);
        }
    }
    public void detonate () {
        setAnimation(detonatedBombAnimation);
    }
}
