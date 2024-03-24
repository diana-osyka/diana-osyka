package sk.tuke.kpi.oop.game;

import sk.tuke.kpi.gamelib.*;
import sk.tuke.kpi.gamelib.backends.lwjgl.LwjglBackend;

public class Main {
    public static void main(String[] args) {
        WindowSetup windowSetup = new WindowSetup("Project Ellen", 800, 600);

        Game game = new GameApplication(windowSetup, new LwjglBackend());  // v pripade Mac OS bude druhy parameter "new Lwjgl2Backend()"
        Scene scene = new World("world");

        FirstSteps firstSteps = new FirstSteps();
        scene.addListener(firstSteps);

        game.addScene(scene);

        game.getInput().onKeyPressed(Input.Key.ESCAPE, () -> game.stop());
        game.start();
    }
}
