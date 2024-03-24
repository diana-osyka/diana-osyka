package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.graphics.Animation;
import sk.tuke.kpi.gamelib.graphics.Color;

public class PowerSwitch extends AbstractActor {

    private Switchable switchable;
    public PowerSwitch(Switchable switchable){
        this.switchable = switchable;
        Animation animation = new Animation("sprites/switch.png");
        setAnimation(animation);
    }

    public Switchable getDevice() {
        return this.switchable;
    }
    public void switchOn() {
        if (switchable == null) {
            return;
        } else {
            this.switchable.turnOn();
            getAnimation().setTint(Color.WHITE);
        }
    }
    public void switchOff() {
        if (switchable == null) {
            return;
        } else {
            this.switchable.turnOff();
            getAnimation().setTint(Color.GRAY);
        }
    }
    public void toggle(){
        if(switchable == null) return;
        if(switchable.isOn()) switchable.turnOff();
        else switchable.turnOn();

    }
}
