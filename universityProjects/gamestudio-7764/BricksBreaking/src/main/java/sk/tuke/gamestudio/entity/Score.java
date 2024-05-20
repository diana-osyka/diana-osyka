package sk.tuke.gamestudio.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Score implements Serializable {
    @Id
    @GeneratedValue
    private int ident;
    private String player;
    private String game;
    private int points;
    private Date playedAt;
    private String game_mode;

    public Score() {}
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
    public int getIdent() { return ident; }
    public void setIdent(int ident) { this.ident = ident; }
}