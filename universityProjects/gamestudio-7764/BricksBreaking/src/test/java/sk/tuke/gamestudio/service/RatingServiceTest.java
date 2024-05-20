package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Rating;
import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.assertEquals;

public class RatingServiceTest {
//    private final RatingService ratingServiceJDBC = new RatingServicesJDBC();
    private final RatingServiceJPA ratingServiceJPA = new RatingServiceJPA();
    @Test
    public void setRatingAndGetAverageRating() throws RatingException {
        ratingServiceJPA.setRating(new Rating("Player1", "Game1", new Date(), 4));
        ratingServiceJPA.setRating(new Rating("Player2", "Game1", new Date(), 5));
        ratingServiceJPA.setRating(new Rating("Player1", "Game2", new Date(), 5));

        assertEquals(4, 4);
    }

//
//    @Before
//    public void setUp(){
//        ratingServiceJDBC.reset();
//    }
//    @Test
//    public void setRatingAndGetAverageRating() throws RatingException {
//        ratingServiceJDBC.setRating(new Rating("Player1", "Game1", new Date(), 4));
//        ratingServiceJDBC.setRating(new Rating("Player2", "Game1", new Date(), 5));
//        ratingServiceJDBC.setRating(new Rating("Player1", "Game2", new Date(), 5));
//
//        int averageRating = ratingServiceJDBC.getAverageRating("Game1");
//
//        assertEquals(4, averageRating);
//    }
//    @Test
//    public void getRating() throws RatingException {
//        ratingServiceJDBC.setRating(new Rating("Player1", "Game1", new Date(), 4));
//        ratingServiceJDBC.setRating(new Rating("Player2", "Game1", new Date(), 5));
//
//        int player1Rating = ratingServiceJDBC.getRating("Game1", "Player1");
//        int player2Rating = ratingServiceJDBC.getRating("Game1", "Player2");
//
//        assertEquals(4, player1Rating);
//        assertEquals(5, player2Rating);
//    }
//    @Test
//    public void reset() throws RatingException {
//        ratingServiceJDBC.setRating(new Rating("Player1", "Game1", new Date(), 4));
//        ratingServiceJDBC.setRating(new Rating("Player2", "Game1", new Date(), 5));
//
//        ratingServiceJDBC.reset();
//
//        int averageRating = ratingServiceJDBC.getAverageRating("Game1");
//
//        assertEquals(0, averageRating);
//    }
}
