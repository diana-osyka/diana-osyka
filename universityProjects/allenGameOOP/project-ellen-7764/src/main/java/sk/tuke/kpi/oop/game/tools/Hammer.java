package sk.tuke.kpi.oop.game.tools;

import sk.tuke.kpi.gamelib.graphics.Animation;
import sk.tuke.kpi.oop.game.Reactor;

public class Hammer extends BreakableTool<Reactor> {
    public Hammer(){
        super(1);
        Animation animation = new Animation("sprites/hammer.png");
        setAnimation(animation);
    }
    public Hammer(int uses){
        super(uses);
        Animation animation = new Animation("sprites/hammer.png");
        setAnimation(animation);
    }

    public void useWith(Reactor reactor) {
        if(reactor == null){
            return;
        }
        if(reactor.repair()){
          super.useWith(reactor);
        }
    }
}
