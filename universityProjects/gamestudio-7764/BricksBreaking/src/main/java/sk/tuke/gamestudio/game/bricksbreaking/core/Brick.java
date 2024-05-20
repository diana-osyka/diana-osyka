package sk.tuke.gamestudio.game.bricksbreaking.core;

import static java.lang.Math.round;

public class Brick extends BrickSpace {
    private BrickColor brickColor;
    public Brick(){
        switch ((int) round((Math.random() * (3 - 1) + 1))){
            case 1:
                this.brickColor = BrickColor.RED;
                break;
            case 2:
                this.brickColor = BrickColor.BLUE;
                break;
            case 3:
                this.brickColor = BrickColor.GREEN;
                break;
        }

    }

    public BrickColor getBrickColor() {
        return brickColor;
    }
}
