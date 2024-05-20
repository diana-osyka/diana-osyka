package sk.tuke.gamestudio.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Comment implements Serializable {

    @Id
    @GeneratedValue
    private int ident;
    private String player;
    private String game;
    private Date playedAt;
    private String commentText;
    public Comment(){}
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

    public int getIdent() {
        return ident;
    }

    public void setIdent(int ident) {
        this.ident = ident;
    }
}
