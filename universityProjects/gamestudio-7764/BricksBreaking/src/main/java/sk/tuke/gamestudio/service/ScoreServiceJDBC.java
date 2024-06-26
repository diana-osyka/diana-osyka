package sk.tuke.gamestudio.service;
import sk.tuke.gamestudio.entity.Score;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("ALL")
public class ScoreServiceJDBC implements ScoreService {
    private static final String JDBC_URL = "jdbc:postgresql://localhost/gamestudio";
    private static final String JDBC_USER = "postgres";
    private static final String JDBC_PASSWORD = "1111";
    private static final String INSERT_STATEMENT = "INSERT INTO score (player, game, points, played_at, game_mode) VALUES (?, ?, ?, ?, ?)";
    private static final String SELECT_STATEMENT = "SELECT player, game, points, played_at, game_mode FROM score WHERE game = ? ORDER BY points DESC LIMIT 10";
    private static final String DELETE_STATEMENT = "DELETE FROM score";

    @Override
    public void addScore(Score score) {
        try (var connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             var statement = connection.prepareStatement(INSERT_STATEMENT)
        ) {
            statement.setString(1, score.getPlayer());
            statement.setString(2, score.getGame());
            statement.setInt(3, score.getPoints());
            statement.setTimestamp(4, new Timestamp(score.getPlayedAt().getTime()));
            statement.setString(5, score.getGame_mode());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new GameStudioException(e);
        }
    }

    @Override
    public List<Score> getTopScores(String game) {
        try (var connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             var statement = connection.prepareStatement(SELECT_STATEMENT)
        ) {
            statement.setString(1, game);
            try (var rs = statement.executeQuery()) {
                var scores = new ArrayList<Score>();
                while (rs.next())
                    scores.add(new Score(rs.getString(1), rs.getString(2), rs.getInt(3), rs.getTimestamp(4), rs.getString(5)));
                return scores;
            }
        } catch (SQLException e) {
            throw new GameStudioException(e);
        }
    }

    @Override
    public void reset() {
        try (var connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             var statement = connection.createStatement()
        ) {
            statement.executeUpdate(DELETE_STATEMENT);
        } catch (SQLException e) {
            throw new GameStudioException(e);
        }
    }
}
