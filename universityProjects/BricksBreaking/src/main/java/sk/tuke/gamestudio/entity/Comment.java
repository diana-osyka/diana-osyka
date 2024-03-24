package sk.tuke.gamestudio.entity;


import java.util.Date;

public class Comment {
    private final String player;
    private final String game;
    private final Date playedAt;
    private final String commentText;

    public Comment(String player, String game, Date playedAt, String comment) {
        this.player = player;
        this.game = game;
        this.playedAt = playedAt;
        this.commentText = comment;
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

    public String getCommentText() {
        return commentText;
    }
}
