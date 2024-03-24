package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.graphics.Animation;

public class Light extends AbstractActor implements Switchable, EnergyConsumer {
    private boolean state;
    private boolean electricityFlow;
    private Animation lightsOn;
    private Animation lightsOff;

    public Light(){
        this.state = false;
        this.electricityFlow = false;
        this.lightsOn = new Animation("sprites/light_on.png");
        this.lightsOff = new Animation("sprites/light_off.png");
        setAnimation(lightsOff );
    }

    public void toggle(){
        if(!state) {
            state = true;
        } else state = false;

        updateLightsAnimation();
    }
    public void turnOn(){
        state = true;
        updateLightsAnimation();
    }
    public void turnOff(){
        state = false;
        updateLightsAnimation();
    }
    public boolean isOn(){
        return state;
    }
    private void updateLightsAnimation(){
        if(this.state && this.electricityFlow){
            setAnimation(lightsOn);
        }
        else{
            setAnimation(lightsOff);
        }
    }

    public void setPowered(boolean electricityFlow){
        this.electricityFlow = electricityFlow;
        updateLightsAnimation();
    }
}
