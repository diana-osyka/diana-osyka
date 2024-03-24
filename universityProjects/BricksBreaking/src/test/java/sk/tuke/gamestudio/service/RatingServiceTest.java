package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Rating;
import org.junit.Before;
import org.junit.Test;

import java.sql.SQLException;
import java.util.Date;

import static org.junit.Assert.assertEquals;

public class RatingServiceTest {
    private final RatingService ratingService = new RatingServicesJDBC();

    @Before
    public void setUp(){
        ratingService.reset();
    }
    @Test
    public void setRatingAndGetAverageRating() throws RatingException {
        ratingService.setRating(new Rating("Player1", "Game1", new Date(), 4));
        ratingService.setRating(new Rating("Player2", "Game1", new Date(), 5));
        ratingService.setRating(new Rating("Player3", "Game1", new Date(), 3));

        int averageRating = ratingService.getAverageRating("Game1");

        assertEquals(4, averageRating);
    }

    @Test
    public void getRating() throws RatingException {
        ratingService.setRating(new Rating("Player1", "Game1", new Date(), 4));
        ratingService.setRating(new Rating("Player2", "Game1", new Date(), 5));

        int player1Rating = ratingService.getRating("Game1", "Player1");
        int player2Rating = ratingService.getRating("Game1", "Player2");

        assertEquals(4, player1Rating);
        assertEquals(5, player2Rating);
    }

    @Test
    public void reset() throws RatingException {
        ratingService.setRating(new Rating("Player1", "Game1", new Date(), 4));
        ratingService.setRating(new Rating("Player2", "Game1", new Date(), 5));

        ratingService.reset();

        int averageRating = ratingService.getAverageRating("Game1");

        assertEquals(0, averageRating);
    }
}
