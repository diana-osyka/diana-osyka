package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.Actor;
import sk.tuke.kpi.gamelib.Scene;
import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.graphics.Animation;
import sk.tuke.kpi.oop.game.actions.PerpetualReactorHeating;

import java.util.HashSet;
import java.util.Set;

public class Reactor extends AbstractActor implements Switchable, Repairable {
    private int temperature;
    private int damage;

    private Animation offAnimation;
    private Animation normalAnimation;
    private Animation hotAnimation;
    private Animation brokenAnimation;
    private Animation extinguishedAnimation;
    private boolean state;
    private Set<EnergyConsumer> devices;

    public Reactor() {
        damage = 0;
        temperature = 0;
        state = false;
        devices = new HashSet<>();
        offAnimation = new Animation("sprites/reactor.png");

        normalAnimation = new Animation("sprites/reactor_on.png", 80, 80,
            (float)(0.1), Animation.PlayMode.LOOP_PINGPONG);
        hotAnimation = new Animation("sprites/reactor_hot.png", 80, 80,
            (float)(0.05), Animation.PlayMode.LOOP_PINGPONG);
        brokenAnimation = new Animation("sprites/reactor_broken.png", 80, 80,
            (float)(0.1), Animation.PlayMode.LOOP_PINGPONG);
        extinguishedAnimation = new Animation("sprites/reactor_extinguished.png", 80, 80,
            (float)(0.1), Animation.PlayMode.LOOP_PINGPONG);
        turnOff();
    }

    public void turnOn(){
        if(damage != 100) {
            state = true;
            updateAnimation();
            for (EnergyConsumer device : devices)
                device.setPowered(true);
        } else{
            turnOff();
        }
    }


    public void turnOff() {
        state = false;
        updateAnimation();
        for (EnergyConsumer device : devices)
            device.setPowered(false);
    }


    public int getTemperature(){
        return this.temperature;
    }

    public int getDamage(){
        return this.damage;
    }

    public void setTemperature(int new_temperature){
        this.temperature = new_temperature;
    }

    public void setDamage(int new_damage){
        this.damage = new_damage;
    }

    private int getNewIncrement(int increment){
        int newIncrement = increment;
        if(this.damage >= 33 && this.damage <= 66){
            newIncrement = (int)((float)newIncrement * 1.5);
        }
        else if(this.damage > 66){
            newIncrement = newIncrement * 2;
        }
        return newIncrement;
    }
    public void increaseTemperature(int increment){
        int newIncrement = getNewIncrement(increment);
        if(newIncrement < 0 || !isOn() || this.damage == 100) {
            return;
        }
        this.temperature += newIncrement;
        int c = (int)((this.temperature - 2000) * 0.025);
        if(this.temperature >= 2000 && c > this.damage){
            this.damage = c;
            if(this.damage >= 100){
                this.damage = 100;
                turnOff();
            }
        }
        updateAnimation();
    }

    public void decreaseTemperature(int decrement){
        int newDecrement = decrement;
        if(newDecrement < 0 || !isOn()){
            return;
        }
        if(this.damage >= 50 && this.damage < 100){
            newDecrement = (int)((float)newDecrement * 0.5);
        }
        if(this.damage != 100 && this.temperature >= newDecrement){
            this.temperature -= newDecrement;
        }
        updateAnimation();
    }

    private void updateAnimation(){
        updateAnimationNormal();
        updateAnimationHot();
        updateAnimationBroken();
        updateAnimationExtinguised();
        updateAnimationOff();

    }
    private void updateAnimationNormal(){
        if(this.temperature < 4000 && state){
            normalAnimation = new Animation("sprites/reactor_on.png", 80, 80,
                (float)(0.1 - 0.090 * this.damage * 0.01), Animation.PlayMode.LOOP_PINGPONG);
            setAnimation(normalAnimation);
        }
    }
    private void updateAnimationHot(){
        if(this.temperature >= 4000 && this.temperature < 6000 && state){
            hotAnimation = new Animation("sprites/reactor_hot.png", 80, 80,
                (float)(0.05 - 0.035 * this.damage * 0.01), Animation.PlayMode.LOOP_PINGPONG);
            setAnimation(hotAnimation);
        }
    }
    private void updateAnimationBroken(){
        if(this.temperature >= 6000 && !state){
            brokenAnimation = new Animation("sprites/reactor_broken.png", 80, 80,
                (float)(0.1), Animation.PlayMode.LOOP_PINGPONG);
            setAnimation(brokenAnimation);
        }
    }
    private void updateAnimationExtinguised(){
        if(this.temperature <= 4000 && this.damage == 100 && !state){
            setAnimation(extinguishedAnimation);
        }
    }
    private void updateAnimationOff(){
        if(this.damage < 100 && !state){
            setAnimation(offAnimation);
        }
    }

    public boolean repair(){
        if(damage > 0 && damage < 100){
            damage -= 50;
            if(damage < 0){
                damage = 0;
            }
            if(this.damage*40 + 2000 < this.temperature) setTemperature(this.damage*40 + 2000);
            updateAnimation();
            return true;
        }
        return false;
    }

    public boolean isOn(){
        return state;
    }

    public void addDevice(EnergyConsumer device){
        Scene scene = getScene();
        if(scene != null && device != null && !devices.contains(device)){
            devices.add(device);
            scene.addActor((Actor) device);
            if(state){
                device.setPowered(true);
            } else {
                device.setPowered(false);
            }
        }
    }
    public void removeDevice(EnergyConsumer device){
        if(device == null || !devices.contains(device)){
            return;
        }
        Scene scene = getScene();
        if(scene != null){
            device.setPowered(false);
            scene.removeActor((Actor) device);
            devices.remove(device);
        }
    }
    public boolean extinguish(){
        if(damage == 100){
            setTemperature(4000);
            updateAnimation();
            return true;
        }
        return false;
    }
    @Override
    public void addedToScene(Scene scene){
        if(scene != null) super.addedToScene(scene);
        scene.scheduleAction(new PerpetualReactorHeating(1), this);
    }
}

