package sk.tuke.kpi.oop.game.tools;

import sk.tuke.kpi.gamelib.Actor;
import sk.tuke.kpi.gamelib.Scene;
import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.oop.game.Usable;

public class BreakableTool<A extends Actor> extends AbstractActor implements Usable<A> {
    private int remainingUses;

    public BreakableTool(int newRemainingUses) {
        this.remainingUses = newRemainingUses;
    }

    public int getRemainingUses() {
        return remainingUses;
    }
    @Override
    public void useWith(A actor) {
        this.remainingUses--;

        if (this.remainingUses < 1) {
            Scene scene = getScene();
            if (scene != null) {
                scene.removeActor(this);
            }
        }
    }
}
