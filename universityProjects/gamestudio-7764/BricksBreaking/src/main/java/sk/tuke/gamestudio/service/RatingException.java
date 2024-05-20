package sk.tuke.gamestudio.service;

import java.sql.SQLException;

public class RatingException extends RuntimeException {
    public RatingException(SQLException message) {
        super(message);
    }

    public RatingException(String message, Throwable cause) {
        super(message, cause);
    }
}
