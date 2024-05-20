package sk.tuke.gamestudio.entity;


import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Rating implements Serializable {
    @Id
    private String player;
    @Id
    private String game;
    private Date playedAt;
    private int mark;

    public Rating() {}
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

    public void setMark(int mark) {
        this.mark = mark;
    }

    public void setPlayedAt(Date playedAt) {
        this.playedAt = playedAt;
    }
}
