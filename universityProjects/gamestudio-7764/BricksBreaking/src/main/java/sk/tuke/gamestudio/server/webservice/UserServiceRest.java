package sk.tuke.gamestudio.server.webservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.tuke.gamestudio.entity.Comment;
import sk.tuke.gamestudio.entity.User;
import sk.tuke.gamestudio.service.CommentService;
import sk.tuke.gamestudio.service.UserService;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/users")
public class UserServiceRest {
    @Autowired
    private UserService userService;

    @GetMapping("/{userName}/{password}")
    public boolean isValidUser(@PathVariable String userName, @PathVariable String password) {
        return userService.isValidUser(userName, password);
    }

//    @PostMapping
//    public void addUser(@RequestBody User user) {
//        userService.addUser(user);
//    }
}
