import 'bootstrap';
import './App.css';
import { useEffect, useState } from "react";
import {addComment, fetchComments} from "./api/comment.service";
import { Comments } from "./components/Comments";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchField } from "./api/fiels.services";
import {CommentsForm} from './components/CommentsForm'
import {BricksBreakingGame} from './components/BricksBreakingGame'
import {Scores} from "./components/Scores";
import {fetchScore} from "./api/score.service";
import * as scoreService from "./api/score.service";
import * as userService from "./api/user.service";
import {addRating, fetchRating} from "./api/rating.service";
import {Rating} from "./components/Rating";
import {RatingForm} from "./components/RatingForm";
import Login from "./components/Login"
import logo from "./image/logo.png"
function App() {
    const selectedGame = 'bricksBreaking';
    const [comments, setComments] = useState([]);
    const [scores, setScores] = useState([]);
    const [rating, setRating] = useState(0);
    const [loginedUser, setLoginedUser] = useState(null);


    useEffect(() => {
        fetchComments(selectedGame).then(response => {
            setComments(response.data.reverse());
        });
        fetchScore(selectedGame).then(response => {
            setScores(response.data);
        });
        fetchRating(selectedGame).then(response => {
            setRating(response.data);
        });
    }, []);
    const handleSendComment = (comment) =>{
        addComment(selectedGame, loginedUser, comment).then(response=>{
            fetchComments(selectedGame).then(response => {
                setComments(response.data.reverse());
            });
        });
    };
    const handleUpdateScores = (game, mode, player, score) =>{
        scoreService.addScore(game, mode, player, score).then(response => {
            fetchScore(selectedGame).then(response => {
                setScores(response.data);
            });
        });
    }
    const handleSendRating = (mark) =>{
        addRating(selectedGame,loginedUser, mark).then(response=>{
            fetchRating(selectedGame).then(response => {
                setRating(response.data);
            });
        });
    };
    const handleLogIn = (userName, password) =>{
        userService.isValidUser(userName, password).then(response =>{
            if(response.data === true){
                setLoginedUser(userName);

            }
        })
    };
    return (
        <div className="App"><div className="AppDiv" style={{
            }}>BRICKS BREAKING</div>
            {!loginedUser && <Login onLogIn={handleLogIn}></Login>}
            {loginedUser && <div>
                <BricksBreakingGame player={loginedUser} onUpdateScores={handleUpdateScores}/>
                <div className={"ratingWrapper"}>
                    <Rating rating={rating}/>
                    <RatingForm rating={rating} onSendRating={handleSendRating}/>
                </div>
                <CommentsForm game={selectedGame} player={loginedUser} onSendComment={handleSendComment}/>
            </div>
            }
                {!loginedUser &&
                    <div style={{width:'100%'}}>
                        <Rating rating={rating}/>
                    </div>
                }
                <Scores scores={scores}/>
                <Comments comments={comments}/>
        </div>
    );
}

export default App;
