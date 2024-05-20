package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Score;
import sk.tuke.gamestudio.entity.User;

import java.util.List;

public interface UserService {
    void addUser(User user);

    boolean isValidUser(String user, String password);

}