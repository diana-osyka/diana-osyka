package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Comment;
import sk.tuke.gamestudio.entity.Score;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class CommentServiceJDBC implements CommentService{
    private static final String JDBC_URL = "jdbc:postgresql://localhost/gamestudio";
    private static final String JDBC_USER = "postgres";
    private static final String JDBC_PASSWORD = "1111";
    private static final String INSERT_STATEMENT = "INSERT INTO comment (player, game, played_at, comment) VALUES (?, ?, ?, ?)";
    private static final String SELECT_STATEMENT = "SELECT player, game, played_at, comment FROM comment WHERE game = ?";
    private static final String DELETE_STATEMENT = "DELETE FROM comment";
    @Override
    public void addComment(Comment comment){
        try (var connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             var statement = connection.prepareStatement(INSERT_STATEMENT)
        ) {
            statement.setString(1, comment.getPlayer());
            statement.setString(2, comment.getGame());
            statement.setTimestamp(3, new Timestamp(comment.getPlayedAt().getTime()));
            statement.setString(4, comment.getCommentText());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new GameStudioException(e);
        }
    }

    @Override
    public List<Comment> getComments(String game) {
        try (var connection = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             var statement = connection.prepareStatement(SELECT_STATEMENT)
        ) {
            statement.setString(1, game);
            try (var rs = statement.executeQuery()) {
                var comments = new ArrayList<Comment>();
                while (rs.next())
                    comments.add(new Comment(rs.getString(1), rs.getString(2), rs.getTimestamp(3), rs.getString(4)));
                return comments;
            }
        } catch (SQLException e) {
            throw new CommentException(e);
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
