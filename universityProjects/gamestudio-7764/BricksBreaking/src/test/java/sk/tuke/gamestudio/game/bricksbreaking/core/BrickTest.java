package sk.tuke.gamestudio.game.bricksbreaking.core;

import org.junit.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BrickTest {
    @Test
    public void testBrickColor() {
        Brick brick = new Brick();

        BrickColor color = brick.getBrickColor();

        assertTrue(color == BrickColor.RED || color == BrickColor.BLUE || color == BrickColor.GREEN);
    }

    @Test
    public void testMultipleBricks() {
        // Test generating multiple bricks to ensure randomness
        boolean redFound = false;
        boolean blueFound = false;
        boolean greenFound = false;

        for (int i = 0; i < 1000; i++) {
            Brick brick = new Brick();
            BrickColor color = brick.getBrickColor();

            switch (color) {
                case RED:
                    redFound = true;
                    break;
                case BLUE:
                    blueFound = true;
                    break;
                case GREEN:
                    greenFound = true;
                    break;
            }

            if (redFound && blueFound && greenFound) {
                break;
            }
        }

        assertTrue(redFound);
        assertTrue(blueFound);
        assertTrue(greenFound);
    }
}