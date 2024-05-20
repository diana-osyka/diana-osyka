package sk.tuke.gamestudio.game.bricksbreaking.core;

import java.util.LinkedList;
import java.util.Queue;

public class GameField {
    private final int rowCount;
    private final int columnCount;
    private int failsAmount;
    private FieldState fieldState;
    private int brokenBricksForCurrentMove;
    private int scoreForThisField;
    private final BrickSpace[][] bricksSpaces;

    public GameField(){
        fieldState = FieldState.PLAYING;
        rowCount = 10;
        columnCount = 10;
        bricksSpaces = new BrickSpace[rowCount][columnCount];
        generate();
    }

    public void BreakSection(int row, int column){
        brokenBricksForCurrentMove = 0;
        breakBrick(row, column);
        setScoreAndFails();
        updateBricksPlacement();
        updateFieldState();
    }
    private void setScoreAndFails() {
        if(brokenBricksForCurrentMove == 1){
            this.failsAmount++;
        }
        if(brokenBricksForCurrentMove >= 50){
            scoreForThisField += brokenBricksForCurrentMove * 1000;
        } else if(brokenBricksForCurrentMove >= 20){
            scoreForThisField += brokenBricksForCurrentMove * 500;
        } else if(brokenBricksForCurrentMove >= 10){
            scoreForThisField += brokenBricksForCurrentMove * 250;
        } else if(brokenBricksForCurrentMove >= 5){
            scoreForThisField += brokenBricksForCurrentMove * 50;
        } else if(brokenBricksForCurrentMove >= 3){
            scoreForThisField += brokenBricksForCurrentMove * 25;
        } else  if(brokenBricksForCurrentMove > 1){
            scoreForThisField += brokenBricksForCurrentMove * 10;
        }
        brokenBricksForCurrentMove = 0;
    }

//    public void BreakBrick(int row, int column){
//        if(bricksSpaces[row][column] instanceof EmptySpace) return;
//        brokenBricksForCurrentMove = brokenBricksForCurrentMove + 1;
//        boolean top = isTopBrickSameColor(row, column);
//        boolean left = isLeftBrickSameColor(row, column);
//        boolean down = isDownBrickSameColor(row, column);
//        boolean right = isRightBrickSameColor(row, column);
//
//        bricksSpaces[row][column] = new EmptySpace();
//        if(top) BreakBrick(row - 1, column);
//        if(left) BreakBrick(row, column - 1);
//        if(down) BreakBrick(row + 1, column);
//        if(right) BreakBrick(row, column + 1);
//    }

    public void breakBrick(int row, int column) {
        if (bricksSpaces[row][column] instanceof EmptySpace) return;

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{row, column});

        while (!queue.isEmpty()) {
            int[] currentBrick = queue.poll();
            int r = currentBrick[0];
            int c = currentBrick[1];

            if (bricksSpaces[r][c] instanceof EmptySpace) continue;

            if (r > 0 && isTopBrickSameColor(r, c)) queue.offer(new int[]{r - 1, c});
            if (c > 0 && isLeftBrickSameColor(r, c)) queue.offer(new int[]{r, c - 1});
            if (r < bricksSpaces.length - 1 && isDownBrickSameColor(r, c)) queue.offer(new int[]{r + 1, c});
            if (c < bricksSpaces[0].length - 1 && isRightBrickSameColor(r, c)) queue.offer(new int[]{r, c + 1});

            bricksSpaces[r][c] = new EmptySpace();
            brokenBricksForCurrentMove++;
        }
    }
    private boolean isTopBrickSameColor(int row, int column){
        if(row != 0 &&
                !(bricksSpaces[row - 1][column] instanceof EmptySpace) &&
                ((Brick) bricksSpaces[row - 1][column]).getBrickColor() ==
                        ((Brick) bricksSpaces[row][column]).getBrickColor()){
            return true;
        }
        return false;
    }
    private boolean isLeftBrickSameColor(int row, int column){
        if(column != 0 &&
                !(bricksSpaces[row][column - 1] instanceof EmptySpace) &&
                ((Brick) bricksSpaces[row][column - 1]).getBrickColor() ==
                        ((Brick) bricksSpaces[row][column]).getBrickColor()){
            return true;
        }
        return false;
    }
    private boolean isDownBrickSameColor(int row, int column){
        if(row != rowCount - 1 &&
                !(bricksSpaces[row + 1][column] instanceof EmptySpace) &&
                ((Brick) bricksSpaces[row + 1][column]).getBrickColor() ==
                        ((Brick) bricksSpaces[row][column]).getBrickColor()){
            return true;
        }
        return false;
    }
    private boolean isRightBrickSameColor(int row, int column){
        if(column != columnCount - 1 &&
                !(bricksSpaces[row][column + 1] instanceof EmptySpace) &&
                ((Brick) bricksSpaces[row][column + 1]).getBrickColor() ==
                        ((Brick) bricksSpaces[row][column]).getBrickColor()){
            return true;
        }
        return false;
    }
    public void updateFieldState(){
        if(failsAmount >= 5){
            fieldState = FieldState.FAILED;
            return;
        }
        for(int row = 0; row<rowCount; row++){
            for(int column = 0; column<columnCount; column++){
                if(bricksSpaces[row][column] instanceof Brick) {
                    fieldState = FieldState.PLAYING;
                    return;
                }
            }
        }
        fieldState = FieldState.SOLVED;
    }
    public void generate(){
        for(int row = 0; row<rowCount; row++){
            for(int column = 0; column<columnCount; column++){
                bricksSpaces[row][column] = new Brick();
            }
        }
    }
    private void updateBricksPlacement(){
        updateBricksToDown();
        updateBricksToCenter();
    }
    private void updateBricksToCenter() {
        int row = rowCount - 1;
        moveBricksToRight(row);
        int shiftToRightIndex = countEmptySpacesToLeft(row) / 2;
        moveBricksToCenter(row, shiftToRightIndex);
    }
    private void moveBricksToCenter(int row, int shiftToRightIndex) {
        if(shiftToRightIndex == 0) return;
        for(int column = 0; column < columnCount; column++){
            if(bricksSpaces[row][column] instanceof Brick){
                swapBricksColumn(column - shiftToRightIndex, column);
            }
        }
    }
    private int countEmptySpacesToLeft(int row) {
        int emptySpacesToLeft = 0;
        for(int column = columnCount - 1; column >= 0; column--){
            if(bricksSpaces[row][column] instanceof EmptySpace){
                emptySpacesToLeft++;
            }
        }
        return emptySpacesToLeft;
    }
    private void moveBricksToRight(int row) {
        for(int column = columnCount - 1; column >= 1; column--){
            if(bricksSpaces[row][column] instanceof EmptySpace){
                for (int newColumn = column - 1; newColumn >= 0; newColumn--){
                    if(bricksSpaces[row][newColumn] instanceof Brick){
                        swapBricksColumn(column, newColumn);
                        break;
                    }
                }
            }
        }
    }
    private void swapBricksColumn(int InColumn, int FromColumn){
        for (int row = 0; row < rowCount; row++) {
            bricksSpaces[row][InColumn] = bricksSpaces[row][FromColumn];
            bricksSpaces[row][FromColumn] = new EmptySpace();
        }
    }
    private void updateBricksToDown() {
        for(int row = rowCount - 1; row >= 0; row--){
            for(int column = 0; column < columnCount; column++){
                if(bricksSpaces[row][column] instanceof EmptySpace){
                    for (int newRow = row - 1; newRow >= 0; newRow--){
                        if(bricksSpaces[newRow][column] instanceof Brick){
                            bricksSpaces[row][column] = bricksSpaces[newRow][column];
                            bricksSpaces[newRow][column] = new EmptySpace();
                            break;
                        }
                    }
                }
            }
        }
    }
    public int getColumnCount() {
        return columnCount;
    }
    public int getRowCount() {
        return rowCount;
    }
    public BrickSpace[][] getBricksSpaces() {
        return bricksSpaces;
    }
    public int getFailsAmount() {
        return failsAmount;
    }
    public int getScoreForThisField() {
        return scoreForThisField;
    }
    public FieldState getFieldState() {
        return fieldState;
    }
    public void setFieldState(FieldState fieldState) {
        this.fieldState = fieldState;
    }
}
