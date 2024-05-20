package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Score;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public class ScoreServiceJPA implements ScoreService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void addScore(Score score) throws ScoreException {
        entityManager.persist(score);
    }

    @Override
    public List<Score> getTopScores(String game) throws ScoreException {
        return entityManager.createQuery("SELECT s FROM Score s WHERE s.game = :game ORDER BY s.points DESC", Score.class)
                .setParameter("game", game)
                .setMaxResults(10)
                .getResultList();
    }

    @Override
    public void reset() {
        entityManager.createQuery("DELETE FROM Score").executeUpdate();
    }
}