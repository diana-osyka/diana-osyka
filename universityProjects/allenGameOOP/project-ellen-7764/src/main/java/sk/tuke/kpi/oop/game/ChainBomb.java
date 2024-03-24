package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.Actor;
import sk.tuke.kpi.gamelib.Scene;

import java.awt.geom.Ellipse2D;
import java.awt.geom.Rectangle2D;
import java.util.List;

public class ChainBomb extends TimeBomb {

    public ChainBomb(float time) {
        super(time);
    }

    @Override
    public void detonate() {
        super.detonate();
        Ellipse2D.Float frame = new Ellipse2D.Float(this.getPosX() - 50, this.getPosY() - 50, 102, 102);
        Scene scene = getScene();

        if (scene == null) {
            return;
        }

        List<Actor> actorsList = scene.getActors();

        for (Actor actor : actorsList) {
            if (!(actor instanceof ChainBomb) || ((ChainBomb) actor).isActivated()) {
                continue;
            }

            Rectangle2D.Float nextChainBomb = new Rectangle2D.Float(actor.getPosX() - (float) actor.getWidth() / 2,
                actor.getPosY() - (float) actor.getHeight() / 2, actor.getWidth(), actor.getHeight());

            if (frame.intersects(nextChainBomb)) {
                ((ChainBomb) actor).activate();
            }
        }
    }

}
