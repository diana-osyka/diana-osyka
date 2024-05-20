package sk.tuke.gamestudio.service;


import sk.tuke.gamestudio.entity.Score;
import org.junit.Test;

import java.util.Date;

import static junit.framework.TestCase.assertEquals;

public class ScoreServiceTest {
    private final ScoreService scoreService = new ScoreServiceJDBC();

    @Test
    public void reset() {
        scoreService.reset();
        assertEquals(0, scoreService.getTopScores("mines").size());
    }

    @Test
    public void addScore() {
        scoreService.reset();
        var date = new Date();

        scoreService.addScore(new Score("Diana", "bricks breaking", 100, date, "Endless"));

        var scores = scoreService.getTopScores("bricks breaking");
        assertEquals(1, scores.size());
        assertEquals("bricks breaking", scores.get(0).getGame());
        assertEquals("Diana", scores.get(0).getPlayer());
        assertEquals(100, scores.get(0).getPoints());
        assertEquals(date, scores.get(0).getPlayedAt());
    }

    @Test
    public void getTopScores() {
        scoreService.reset();
        var date = new Date();
        scoreService.addScore(new Score("Diana", "bricks breaking", 2500, date, "Endless"));
        scoreService.addScore(new Score("Oleh", "tiles", 2000, date, "Endless"));
        scoreService.addScore(new Score("Daniil", "bricks breaking", 1500, date, "Endless"));
        scoreService.addScore(new Score("Diana", "bricks breaking", 1500, date, "Endless"));

        var scores = scoreService.getTopScores("bricks breaking");

        assertEquals(3, scores.size());

        assertEquals("bricks breaking", scores.get(0).getGame());
        assertEquals("Diana", scores.get(0).getPlayer());
        assertEquals(2500, scores.get(0).getPoints());
        assertEquals(date, scores.get(0).getPlayedAt());

        assertEquals("bricks breaking", scores.get(1).getGame());
        assertEquals("Daniil", scores.get(1).getPlayer());
        assertEquals(1500, scores.get(1).getPoints());
        assertEquals(date, scores.get(1).getPlayedAt());
    }
}
