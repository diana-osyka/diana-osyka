package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Comment;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
@Transactional
public class CommentServiceJPA implements CommentService{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void addComment(Comment comment) throws CommentException{
        entityManager.persist(comment);
    }
    @Override
    public List<Comment> getComments(String game) throws CommentException {
        var res = entityManager.createQuery("SELECT s FROM Comment s WHERE s.game=:game", Comment.class)
                .setParameter("game", game)
                .getResultList();
        for(var c : res){
            System.out.println(c.getCommentText());
        }
        return res;
    }
    @Override
    public void reset() throws CommentException{
        entityManager.createQuery("DELETE FROM Comment").executeUpdate();
    }
}
