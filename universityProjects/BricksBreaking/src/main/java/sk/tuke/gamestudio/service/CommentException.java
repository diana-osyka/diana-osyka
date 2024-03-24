package sk.tuke.gamestudio.service;

import java.sql.SQLException;

public class CommentException extends RuntimeException {
    public CommentException(SQLException message) {
        super(message);
    }

    public CommentException(String message, Throwable cause) {
        super(message, cause);
    }
}
