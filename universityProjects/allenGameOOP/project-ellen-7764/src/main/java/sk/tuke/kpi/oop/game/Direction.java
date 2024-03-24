package sk.tuke.kpi.oop.game;

public enum Direction {
    NORTH(0, 1),
    EAST(1, 0),
    SOUTH(0, -1),
    WEST(-1, 0);
    private final int dx;
    private final int dy;
    Direction(int dx, int dy){
        this.dx = dx;
        this.dy = dy;
    }

    public float getAngle(){
        if(dy == -1){
            return 180;
        } else if(dx == 1){
            return 90;
        } else if(dy == -1){
            return 270;
        }
    }
}
