package sk.tuke.gamestudio.game.bricksbreaking.core;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class GameFieldTest {

    private GameField gameField;

    @Before
    public void setUp() {
        gameField = new GameField();
    }

    @Test
    public void testGenerate() {
        gameField.generate();

        for (int row = 0; row < gameField.getRowCount(); row++) {
            for (int column = 0; column < gameField.getColumnCount(); column++) {
                assertEquals(Brick.class, gameField.getBricksSpaces()[row][column].getClass());
            }
        }
    }

    @Test
    public void testUpdateFieldStateSolved() {
        for (int row = 0; row < gameField.getRowCount(); row++) {
            for (int column = 0; column < gameField.getColumnCount(); column++) {
                gameField.getBricksSpaces()[row][column] = new EmptySpace();
            }
        }

        gameField.updateFieldState();

        assertEquals(FieldState.SOLVED, gameField.getFieldState());
    }
}