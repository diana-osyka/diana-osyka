package sk.tuke.gamestudio.game.bricksbreaking.consoleui;

import sk.tuke.gamestudio.entity.Comment;
import sk.tuke.gamestudio.entity.Rating;
import sk.tuke.gamestudio.game.bricksbreaking.core.*;
import sk.tuke.gamestudio.entity.Score;
import sk.tuke.gamestudio.service.*;

import java.util.Date;
import java.util.Objects;
import java.util.Scanner;
import java.util.regex.Pattern;

import static java.lang.Thread.sleep;

public class ConsoleUI {
    private GameField gameField;
    private int finalScore;
    private int failsLeft;
    private GameMode gameMode;
    private final int maxTimeMillis;
    private String player;

    public ConsoleUI(){
        this.maxTimeMillis = 100000;
        player = null;
    }

    public void play(){
        boolean wantReplay = true;
        while(player == null){
            this.player = readPlayersName();
        }
        while (wantReplay) {
            resetObjectsStates();
            mainGameLoop();
            updateFieldStates();
            writeScoreToDatabase();
            printTheEnd();
            wantReplay = isWantReplayWithPrint();
        }
        addRatingToDatabase();
        addCommentToDatabase();
    }

    private void addCommentToDatabase() {
        String comment = writeComment();
        if(comment != null){
            Comment commentInst = new Comment(this.player, "brick breaking", new Date(System.currentTimeMillis()), comment);
            CommentService commentService = new CommentServiceJDBC();
            commentService.addComment(commentInst);
        }
    }

    private void addRatingToDatabase() {
        String strRating = rateOurGame();
        Integer mark = null;
        if (strRating != null) {
            mark = Integer.parseInt(strRating);
        }
        if (mark != null) {
            Rating rating = new Rating(this.player, "brick breaking", new Date(System.currentTimeMillis()), mark);
            RatingService ratingService = new RatingServicesJDBC();
            ratingService.setRating(rating);
        }
    }

    private String rateOurGame() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Please rate our game[1-5]: ");
        String str = sc.nextLine();//reads string
        if(str == null){
            return null;
        }
        str = str.trim();
        Pattern INPUT_PATTERN = Pattern.compile("[1-5]");
        var matcher = INPUT_PATTERN.matcher(str);
        if (matcher.matches()) {
            return str;
        }
        return null;
    }
    private String writeComment() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Please leave a comment <3: ");
        String str = sc.nextLine();//reads string
        if(str == null){
            return null;
        }
        str = str.trim();
        Pattern INPUT_PATTERN = Pattern.compile("^.{0,30}$");
        var matcher = INPUT_PATTERN.matcher(str);
        if (matcher.matches()) {
            return str;
        }
        return null;
    }

    private void mainGameLoop() {
        if (gameMode.getGameModeState() == GameModeState.ENDLESS) {
            endlessModeLoop();
        } else if (gameMode.getGameModeState() == GameModeState.TIMELIMITED) {
            timelimitedModeLoop();
        }
    }

    private void writeScoreToDatabase() {
        if(finalScore != 0){
            Score score = new Score(this.player, "brick breaking", finalScore, new Date(System.currentTimeMillis()), (gameMode.getGameModeState() == GameModeState.ENDLESS?"Endless":"Time limited"));
            ScoreServiceJDBC scoreService = new ScoreServiceJDBC();
            scoreService.addScore(score);
        }
    }

    private void updateFieldStates() {
        this.failsLeft = this.failsLeft - gameField.getFailsAmount();
        this.finalScore = this.finalScore + gameField.getScoreForThisField();
        if (gameField.getFieldState() == FieldState.SOLVED) {
            printYouWon();
        } else if (gameField.getFieldState() == FieldState.FAILED) {
            printYouLost();
        }
    }

    private void timelimitedModeLoop() {
        long startTime = System.currentTimeMillis();
        runTimeAsync(startTime);
        while (gameField.getFieldState() == FieldState.PLAYING && System.currentTimeMillis() - startTime < maxTimeMillis) {
            printCurrentTime(startTime);
            show();
            handleInput();
        }
    }

    private void endlessModeLoop() {
        while (failsLeft - gameField.getFailsAmount() > 0) {
            show();
            handleInput();
            if (gameField.getFieldState() == FieldState.SOLVED) {
                this.failsLeft = this.failsLeft - gameField.getFailsAmount();
                this.finalScore = this.finalScore + gameField.getScoreForThisField();
                this.gameField = new GameField();
            }
        }
    }

    private String readPlayersName() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String str = sc.nextLine();//reads string
        if(str == null){
            return null;
        }
        str = str.trim();//Delete unnecessary spaces
        Pattern INPUT_PATTERN = Pattern.compile("^.{0,30}$");//Any text, max 30 characters
        var matcher = INPUT_PATTERN.matcher(str);
        if (matcher.matches()) {
            return str;
        }
        return null;
    }
    private void resetObjectsStates() {
        this.gameField = new GameField();
        this.gameMode = new GameMode(readLineWhileIsNull());
        this.finalScore = 0;
        this.failsLeft = 5;
    }
    private boolean isWantReplayWithPrint() {
        Scanner sc = new Scanner(System.in);
        System.out.print("\nDo you want to replay?[Y/N]: ");
        String str = sc.nextLine();//reads string
        if(str == null){
            return false;
        }
        str = str.trim();//Delete unnecessary spaces
        Pattern INPUT_PATTERN = Pattern.compile("[YyNn]");
        var matcher = INPUT_PATTERN.matcher(str);
        if (matcher.matches()) {
            return (Objects.equals(str, "Y") || Objects.equals(str, "y"));
        }
        return false;
    }
    private void printYouWon() {
        String ANSI_YELLOW = "\u001B[33m";
        String ANSI_RESET = "\u001B[0m";
        System.out.println(ANSI_YELLOW + "\n\uD83D\uDC9B\uD83D\uDC9B\uD83D\uDC9B YOU WON! \uD83D\uDC9B\uD83D\uDC9B\uD83D\uDC9B" + ANSI_RESET);
    }
    private void printYouLost() {
        String ANSI_RED = "\u001B[31m";
        String ANSI_RESET = "\u001B[0m";
        System.out.println("\n❌❌❌ " + ANSI_RED + "YOU LOST! " + ANSI_RESET + "❌❌❌");
    }
    private void printTheEnd() {
        String ANSI_YELLOW = "\u001B[33m";
        String ANSI_RESET = "\u001B[0m";
        System.out.println(ANSI_YELLOW + "\nTHE END..." + ANSI_RESET);
        System.out.println("SCORE " + ANSI_YELLOW + finalScore + ANSI_RESET);
    }
    private void runTimeAsync(long startTime) {
        Thread newThread = new Thread(() -> {
            while(System.currentTimeMillis() - startTime < maxTimeMillis && gameField.getFieldState() == FieldState.PLAYING){
                try {
                    sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
            if(gameField.getFieldState() == FieldState.PLAYING){
                printTimeOut();
                gameField.setFieldState(FieldState.FAILED);
            }
        });
        newThread.start();
    }
    private static void printTimeOut() {
        String ANSI_RED = "\u001B[31m";
        String ANSI_RESET = "\u001B[0m";
        System.out.println(ANSI_RED +"\nTIME IS OUT!!!"+ ANSI_RESET +" Press Enter to finish...");
    }
    private void printCurrentTime(long startTime) {
        int seconds = (int)((maxTimeMillis - (System.currentTimeMillis() - startTime))/1000)%60;
        int minutes = (int)((maxTimeMillis - (System.currentTimeMillis() - startTime))/(1000*60));
        String secondsStr;
        String minutesStr;
        if(seconds < 10){
            secondsStr = "0" + seconds;
        } else {
            secondsStr = String.valueOf(seconds);
        }
        if(minutes < 10){
            minutesStr = "0" + minutes;
        } else {
            minutesStr = String.valueOf(minutes);
        }

        System.out.println(minutesStr + ":" + secondsStr);
    }
    public void show(){
        BrickSpace[][] bricksSpaces = gameField.getBricksSpaces();
        String ANSI_RED = "\u001B[31m";
        String ANSI_GREEN = "\u001B[32m";
        String ANSI_BLUE = "\u001B[34m";
        String ANSI_YELLOW = "\u001B[33m";
        String ANSI_RESET = "\u001B[0m";
        System.out.println("Score: " + ANSI_YELLOW + (finalScore + gameField.getScoreForThisField())+ ANSI_RESET);
        System.out.println("Fails left: "+ ANSI_RED + (failsLeft - gameField.getFailsAmount()) + ANSI_RESET);
        for(int row = 0; row<gameField.getRowCount() + 2; row++){
            for(int column = 0; column<gameField.getColumnCount() + 2; column++){
                //Print lines
                if(row == 1 && column == 1){
                    System.out.print("---");
                } else if(row == 1){
                    System.out.print("---");
                } else if(column == 1){
                    System.out.print("| ");
                }
                //Print index
                else if(row == 0 && column == 0){
                    System.out.print(ANSI_YELLOW + "  " + ANSI_RESET);
                } else if(row == 0){
                    System.out.print(ANSI_YELLOW + " " + (column<=10?(" " + (column - 1)):(column - 1)) + ANSI_RESET);
                } else if(column == 0){
                    System.out.print(ANSI_YELLOW + " " + (row<=10?(" " + (row - 1)):(row - 1)) + ANSI_RESET);
                }
                //Print field
                else {
                    if (bricksSpaces[row - 2][column - 2] instanceof Brick) {
                        switch (((Brick) bricksSpaces[row - 2][column - 2]).getBrickColor()) {
                            case RED -> System.out.print(ANSI_RED + "██ " + ANSI_RESET);
                            case BLUE -> System.out.print(ANSI_BLUE + "██ " + ANSI_RESET);
                            case GREEN -> System.out.print(ANSI_GREEN + "██ " + ANSI_RESET);
                        }

                    } else {
                        System.out.print("   ");
                    }
                }
            }
            System.out.print("\n");
        }
    }
    private String readLine() {
        Scanner sc = new Scanner(System.in);
        System.out.print("\nEnter row and column: ");
        String str = sc.nextLine();//reads string
        if(str == null){
            return null;
        }
        str = str.trim();//Delete unnecessary spaces
        Pattern INPUT_PATTERN = Pattern.compile("([0-9]+)\\s([0-9]+)");
        var matcher = INPUT_PATTERN.matcher(str);
        if (matcher.matches()) {
            return str;
        }
        return null;
    }
    private String readGameModeLine() {
        String ANSI_YELLOW = "\u001B[33m";
        String ANSI_RESET = "\u001B[0m";
        Scanner sc = new Scanner(System.in);
        System.out.print(ANSI_YELLOW +"\nWELCOME, " + this.player + "!\n" + ANSI_RESET +
                        "\nChose your game mode:\n" + ANSI_YELLOW +
                        "\"E\"" + ANSI_RESET + "- for endless game mode\n" + ANSI_YELLOW +
                        "\"T\"" + ANSI_RESET + " - for time limited game mode\n\n" +
                        "Enter game mode: ");
        String str = sc.nextLine();//reads string
        if(str == null){
            return null;
        }
        str = str.trim();//Delete unnecessary spaces
        Pattern INPUT_PATTERN = Pattern.compile("[EeTt]");
        var matcher = INPUT_PATTERN.matcher(str);
        if (matcher.matches()) {
            return str;
        }
        return null;
    }
    private String readLineWhileIsNull(){
        String gameMode = null;
        while(gameMode == null){
            gameMode = readGameModeLine();
        }
        return gameMode;
    }
    private void handleInput(){
        String str = readLine();//Input in form:"7 8" or "9 10"
        if(str == null){
            return;
        }
        String[] strList = str.split(" ");//Split by space
        int rowInd = Integer.parseInt(String.valueOf(strList[0]));
        int columnInd = Integer.parseInt(String.valueOf(strList[1]));
        if(rowInd > gameField.getRowCount() || rowInd < 0){
            System.out.println("Row index is not in a range");
            return;
        }
        if(columnInd > gameField.getColumnCount() || columnInd < 0){
            System.out.println("Column index is not in a range");
            return;
        }
        if(gameField.getFieldState() != FieldState.FAILED){
            gameField.BreakSection(rowInd - 1, columnInd - 1);
        }
    }
}