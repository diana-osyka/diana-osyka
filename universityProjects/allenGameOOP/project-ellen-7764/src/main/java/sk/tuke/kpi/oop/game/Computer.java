package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.graphics.Animation;

public class Computer extends AbstractActor implements EnergyConsumer{

    private Animation computerOn;
    private Animation computerOff;
    private boolean electricityFlow;
    public Computer(){
        computerOn = new Animation("sprites/computer.png", 80, 48,
            0.2f, Animation.PlayMode.LOOP_PINGPONG);
        computerOff = new Animation("sprites/computer.png", 80, 48,
            0.0f);
        electricityFlow = false;
        setAnimation(computerOff);
    }

    public void setPowered(boolean b) {
        this.electricityFlow = b;
        updateComputerAnimation();
    }
    private void updateComputerAnimation(){
        if(this.electricityFlow){
            setAnimation(computerOn);
        }
        else{
            setAnimation(computerOff);
        }
    }

    public int add(int a, int b){
        if(!electricityFlow){
            return 0;
        }
        return a + b;
    }
    public float add(float a, float b){
        if(!electricityFlow){
            return 0;
        }
        return a + b;
    }
    public int sub(int a, int b){
        if(!electricityFlow){
            return 0;
        }
        return a - b;
    }
    public float sub(float a, float b){
        if(!electricityFlow){
            return 0;
        }
        return a - b;
    }
}
