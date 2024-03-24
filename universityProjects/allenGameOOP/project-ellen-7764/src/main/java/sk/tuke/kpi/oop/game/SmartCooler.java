package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.Scene;
import sk.tuke.kpi.gamelib.actions.Invoke;
import sk.tuke.kpi.gamelib.framework.actions.Loop;

public class SmartCooler extends Cooler{
    private Reactor reactor;
    public SmartCooler(Reactor reactor){
        super(reactor);
        this.reactor = reactor;
    }

    private void smartToggle(){
        if(reactor == null){
            return;
        }
        int temp = reactor.getTemperature();
        if(temp > 2500){
            this.turnOn();
        } else if (temp < 1500) {
            this.turnOff();
        }
    }

    @Override
    public void addedToScene(Scene scene){
        if(scene != null) super.addedToScene(scene);
        new Loop<>(new Invoke<>(this::smartToggle)).scheduleFor(this);
    }
}
