package sk.tuke.kpi.oop.game.tools;

import sk.tuke.kpi.gamelib.graphics.Animation;
import sk.tuke.kpi.oop.game.Reactor;

public class FireExtinguisher extends BreakableTool<Reactor> {
    public FireExtinguisher(){
        super(1);
        Animation animation = new Animation("sprites/extinguisher.png");
        setAnimation(animation);
    }
    public void useWith(Reactor reactor) {
        if(reactor == null){
            return;
        }
        if(reactor.extinguish()){
            super.useWith(reactor);
        }
    }
}
