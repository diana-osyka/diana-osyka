package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Rating;

public interface RatingService {
    void setRating(Rating rating) throws RatingException;
    Double getAverageRating(String game) throws RatingException;
    Integer getRating(String game, String player) throws RatingException;
    void reset() throws RatingException;
}
