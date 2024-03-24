package sk.tuke.kpi.oop.game.scenarios;

import sk.tuke.kpi.gamelib.Scene;
import sk.tuke.kpi.gamelib.framework.Scenario;
import sk.tuke.kpi.oop.game.Helicopter;
import sk.tuke.kpi.oop.game.Reactor;

public class Gameplay extends Scenario {
    @Override
    public void setupPlay(Scene scene){
        Reactor reactor = new Reactor();
        scene.addActor(reactor, 145, 95);
        reactor.turnOn();

        Reactor reactorSec = new Reactor();
        scene.addActor(reactorSec, 145, 250);
        reactor.turnOn();
        Helicopter heli = new Helicopter();
        scene.addActor(heli, 400, 400);
    }
}
