package sk.tuke.gamestudio.entity;


import java.util.Date;

public class Rating {
    private final String player;
    private final String game;
    private final Date playedAt;
    private final int mark;

    public Rating(String player, String game, Date playedAt, int mark) {
        this.player = player;
        this.game = game;
        this.playedAt = playedAt;
        this.mark = mark;
    }

    public String getPlayer() {
        return player;
    }

    public String getGame() {
        return game;
    }

    public Date getPlayedAt() {
        return playedAt;
    }

    public int getMark() {
        return mark;
    }
}
