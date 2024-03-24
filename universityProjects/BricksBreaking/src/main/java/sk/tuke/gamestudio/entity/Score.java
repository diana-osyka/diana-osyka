package sk.tuke.gamestudio.entity;
import java.util.Date;

public class Score {
    private final String player;
    private String game;
    private final int points;
    private final Date playedAt;
    private final String game_mode;

    public Score(String player, String game, int points, Date playedAt, String game_mode) {
        this.player = player;
        this.game = game;
        this.points = points;
        this.playedAt = playedAt;
        this.game_mode = game_mode;
    }

    public String getPlayer() {
        return player;
    }
    public String getGame() {
        return game;
    }
    public void setGame(String game) {
        this.game = game;
    }
    public int getPoints() {
        return points;
    }
    public Date getPlayedAt() {
        return playedAt;
    }
    @Override
    public String toString() {
        return "Score{" +
                "player='" + player + '\'' +
                ", game='" + game + '\'' +
                ", points=" + points +
                ", playedAt=" + playedAt +
                '}';
    }

    public String getGame_mode() {
        return game_mode;
    }
}