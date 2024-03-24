package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.actions.Invoke;
import sk.tuke.kpi.gamelib.framework.AbstractActor;
import sk.tuke.kpi.gamelib.framework.Player;
import sk.tuke.kpi.gamelib.framework.actions.Loop;
import sk.tuke.kpi.gamelib.graphics.Animation;

public class Helicopter extends AbstractActor {
    public Helicopter(){
        Animation heliAnimation = new Animation("sprites/heli.png", 64, 64,
            (float)(0.1), Animation.PlayMode.LOOP_PINGPONG);
        setAnimation(heliAnimation);
    }
    private void searchAndDestroyOnce(){
        int x = 0;
        int y = 0;

        Player player = getScene().getLastActorByType(Player.class);
        if(player == null) {
            return;
        }

        if(this.getPosX() > player.getPosX()) {
            x = this.getPosX() - 1;
        } else {
            x = this.getPosX() + 1;
        }

        if(this.getPosY() > player.getPosY()) {
            y = this.getPosY() - 1;
        } else {
            y = this.getPosY() + 1;
        }
        this.setPosition(x, y);

        if (intersects(player)) {
            player.setEnergy(player.getEnergy() - 1);
        }
    }
    public void searchAndDestroy(){
        new Loop<>(new Invoke<>(this::searchAndDestroyOnce)).scheduleFor(this);
    }
}
