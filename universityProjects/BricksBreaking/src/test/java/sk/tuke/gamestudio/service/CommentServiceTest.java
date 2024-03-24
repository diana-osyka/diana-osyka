package sk.tuke.gamestudio.service;

import org.junit.Test;
import sk.tuke.gamestudio.entity.Comment;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class CommentServiceTest {
    private final CommentService commentService = new CommentServiceJDBC();

    @Test
    public void reset() {
        commentService.reset();
        assertEquals(0, commentService.getComments("bricks breaking").size());
    }

    @Test
    public void addComment() {
        commentService.reset();
        var comment = new Comment("Oleh", "bricks breaking", new Date(), "Great game!");
        commentService.addComment(comment);

        var comments = commentService.getComments("bricks breaking");
        assertEquals(1, comments.size());
        assertEquals("bricks breaking", comments.get(0).getGame());
        assertEquals("Oleh", comments.get(0).getPlayer());
        assertEquals("Great game!", comments.get(0).getCommentText());
    }

    @Test
    public void getComments() {
        commentService.reset();
        var comment1 = new Comment("Diana", "bricks breaking", new Date(), "Enjoyed playing!");
        var comment2 = new Comment("Daniil", "bricks breaking", new Date(), "Could be better");
        commentService.addComment(comment1);
        commentService.addComment(comment2);

        var comments = commentService.getComments("bricks breaking");

        assertEquals(2, comments.size());

        assertEquals("bricks breaking", comments.get(0).getGame());
        assertEquals("Diana", comments.get(0).getPlayer());
        assertEquals("Enjoyed playing!", comments.get(0).getCommentText());

        assertEquals("bricks breaking", comments.get(1).getGame());
        assertEquals("Daniil", comments.get(1).getPlayer());
        assertEquals("Could be better", comments.get(1).getCommentText());
    }
}