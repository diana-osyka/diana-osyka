import {Button, Form} from "react-bootstrap";
import { useForm } from "react-hook-form"
import {addComment} from "../api/comment.service";
import {useEffect} from "react";
import {fetchField} from "../api/fiels.services";

export default function LoginForm({onLogIn}){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors , isValid},
    } = useForm()
    const onSubmit = (data) =>{
        onLogIn(data.user, data.password);
    }
    return(
        <div style={{width: '400px', margin: 'auto'}} >
            <Form className={"loginForm"} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={"loginLable"}>Log in to play!</Form.Label>
                    <input className="form-control"
                           type="text" placeholder="Enter a username"
                           {...register("user", {
                               minLength: {value: 1, message:"Can't be empty"},
                               maxLength: {value: 150, message:"Too long. Maximum is 150 characters"},
                               required: {value: true, message:"Can't be empty"}
                           })}
                    />
                    <input style={{marginTop: '10px'}} className="form-control"
                           type="password" placeholder="Enter a password"
                           {...register("password", {
                               minLength: {value: 1, message:"Can't be empty"},
                               maxLength: {value: 150, message:"Too long. Maximum is 150 characters"},
                               required: {value: true, message:"Can't be empty"}
                           })}
                    />
                    <Form.Text style={{color: 'red', float:'right'}}>
                        {errors.comment?.message}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'left'}}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}