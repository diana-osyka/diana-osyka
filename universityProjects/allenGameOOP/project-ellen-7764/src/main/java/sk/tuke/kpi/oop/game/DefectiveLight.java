package sk.tuke.kpi.oop.game;

import org.jetbrains.annotations.NotNull;
import sk.tuke.kpi.gamelib.Disposable;
import sk.tuke.kpi.gamelib.Scene;
import sk.tuke.kpi.gamelib.actions.ActionSequence;
import sk.tuke.kpi.gamelib.actions.Invoke;
import sk.tuke.kpi.gamelib.actions.Wait;
import sk.tuke.kpi.gamelib.framework.actions.Loop;


public class DefectiveLight extends Light implements Repairable {
    private Disposable dispose;
    private boolean repairState;
    private int random;
    public DefectiveLight(){
        super();
        this.random = 1;
        this.repairState = false;
    }
    @Override
    public void toggle(){
        this.random = (int)(Math.random() * 20);
        if(this.random == 1){
            super.toggle();
        }
    }
    @Override
    public void addedToScene(@NotNull Scene scene){
        super.addedToScene(scene);
        this.dispose = new Loop<>(new Invoke<>(this::toggle)).scheduleFor(this);
    }

    @Override
    public boolean repair() {
        if (dispose == null || repairState){
            return false;
        } else {
            repairState = true;
            dispose.dispose();
        }
        this.dispose = new ActionSequence<>(new Wait<>(10),new Loop<>(new Invoke<>(this::toggle))).scheduleFor(this);
        return true;
    }
}
