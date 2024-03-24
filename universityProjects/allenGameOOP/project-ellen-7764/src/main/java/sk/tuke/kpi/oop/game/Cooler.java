package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.Scene;
import sk.tuke.kpi.gamelib.actions.Invoke;
import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.framework.actions.Loop;
import sk.tuke.kpi.gamelib.graphics.Animation;

public class Cooler extends AbstractActor implements Switchable {

    private Reactor reactor;
    private boolean state;
    private Animation coolerAnimationOn;
    private Animation coolerAnimationOff;
    public Cooler(Reactor reactor){
        this.reactor = reactor;
        state = false;
        coolerAnimationOn = new Animation("sprites/fan.png", 32, 32,
            (float)(0.1), Animation.PlayMode.LOOP_PINGPONG);
        coolerAnimationOff = new Animation("sprites/fan.png", 32, 32,
            (float)(0));
        setAnimation(coolerAnimationOff);
    }

    public void turnOff(){
        state = false;
        setAnimation(coolerAnimationOff);
    }
    public void turnOn(){
        state = true;
        setAnimation(coolerAnimationOn);
    }
    public boolean isOn(){
        if(state) return true;
        return false;
    }
    private void coolReactor(){
        if(isOn() && reactor != null){
            reactor.decreaseTemperature(1);
        }
    }
    @Override
    public void addedToScene(Scene scene){
        if(scene != null) super.addedToScene(scene);
        new Loop<>(new Invoke<>(this::coolReactor)).scheduleFor(this);
    }
}
