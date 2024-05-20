package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Rating;

import java.sql.*;

public class RatingServicesJDBC implements RatingService {
    private static final String JDBC_URL = "jdbc:postgresql://localhost/gamestudio";
    private static final String JDBC_USER = "postgres";
    private static final String JDBC_PASSWORD = "1111";
    private static final String UPDATE_STATEMENT = "INSERT INTO rating (player, game, played_at, mark) VALUES (?, ?, ?, ?) " +
            "ON CONFLICT (player, game) DO UPDATE SET played_at = EXCLUDED.played_at, mark = EXCLUDED.mark";

//    private static final String INSERT_STATEMENT = "INSERT INTO rating (player, game, played_at, mark) VALUES (?, ?, ?, ?)";
    private static final String SELECT_AVERAGE_STATEMENT = "SELECT AVG(mark) FROM rating WHERE game = ?";
    private static final String SELECT_RATING_STATEMENT = "SELECT mark FROM rating WHERE game = ? AND player = ?";
    private static final String DELETE_STATEMENT = "DELETE FROM rating";

    @Override
    public void setRating(Rating rating) throws RatingException {
        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement statement = connection.prepareStatement(UPDATE_STATEMENT)) {
            statement.setString(1, rating.getPlayer());
            statement.setString(2, rating.getGame());
            statement.setTimestamp(3, new Timestamp(rating.getPlayedAt().getTime()));
            statement.setInt(4, rating.getMark());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RatingException(e);
        }
    }

    @Override
    public Double getAverageRating(String game) throws RatingException {
        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement statement = connection.prepareStatement(SELECT_AVERAGE_STATEMENT)) {
            statement.setString(1, game);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    return rs.getDouble(1);
                }
            }
        } catch (SQLException e) {
            throw new RatingException(e);
        }
        return (double) 0;
    }

    @Override
    public Integer getRating(String game, String player) throws RatingException {
        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement statement = connection.prepareStatement(SELECT_RATING_STATEMENT)) {
            statement.setString(1, game);
            statement.setString(2, player);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        } catch (SQLException e) {
            throw new RatingException(e);
        }
        return 0;
    }

    @Override
    public void reset() throws RatingException {
        try (Connection connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             Statement statement = connection.createStatement()) {
            statement.executeUpdate(DELETE_STATEMENT);
        } catch (SQLException e) {
            throw new RatingException(e);
        }
    }
}
