package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Rating;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Transactional
public class RatingServiceJPA implements RatingService {

    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public void setRating(Rating rating) throws RatingException {
        try {
            Rating existingRating = entityManager.createQuery("SELECT r FROM Rating r WHERE r.player = :player AND r.game = :game", Rating.class)
                    .setParameter("player", rating.getPlayer())
                    .setParameter("game", rating.getGame())
                    .getSingleResult();

            existingRating.setPlayedAt(rating.getPlayedAt());
            existingRating.setMark(rating.getMark());
            entityManager.merge(existingRating);
        } catch (NoResultException e) {
            // If no existing rating is found, persist the new rating
            entityManager.persist(rating);
        } catch (Exception e) {
            // Handle other exceptions that might be thrown
            throw new RuntimeException("Failed to set rating due to an error: " + e.getMessage(), e);
        }
    }
    @Override
    public Double getAverageRating(String game) throws RatingException{
         Double res = (Double) entityManager.createQuery("SELECT AVG(r.mark) FROM Rating r WHERE r.game = :game")
                 .setParameter("game", game)
                 .getSingleResult();
         if(res == null){
             return (double) 0;
         }
         return res;
    }
    @Override
    public Integer getRating(String game, String player) throws RatingException{
        return (Integer) entityManager.createQuery("SELECT r.mark FROM Rating r WHERE r.game = :game AND r.player = :player")
                .setParameter("game", game)
                .setParameter("player", player)
                .getSingleResult();
    }
    @Override
    public void reset() throws RatingException{
        entityManager.createQuery("DELETE FROM Rating").executeUpdate();
    }
}