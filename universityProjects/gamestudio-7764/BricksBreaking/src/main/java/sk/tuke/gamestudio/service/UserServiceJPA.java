package sk.tuke.gamestudio.service;
import sk.tuke.gamestudio.entity.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
@Transactional
public class UserServiceJPA implements UserService{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void addUser(User user) throws CommentException{
        entityManager.persist(user);
    }
    @Override
    public boolean isValidUser(String user, String pass){
        var res = entityManager.createQuery("SELECT s FROM users s WHERE s.username=:user AND s.password_hash=:pass", User.class)
                .setParameter("user", user)
                .setParameter("pass", pass)
                .getResultList();
        System.out.println(res);
        if (res.isEmpty()){
            return false;
        } else {
            return true;
        }
    }
}
