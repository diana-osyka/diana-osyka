import {Button, Form} from "react-bootstrap";
import { useForm } from "react-hook-form"
import {addComment} from "../api/comment.service";
import {useEffect} from "react";
import {fetchField} from "../api/fiels.services";

export function CommentsForm({game, player, onSendComment}){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors , isValid},
    } = useForm()
    const onSubmit = (data) =>{
        onSendComment(data.comment);
    }

    return(
        <div style={{width: '400px'}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{fontWeight: '700', float:'left'}}>Comment</Form.Label>
                    <input className="form-control"
                           type="text" placeholder="Enter a comment"
                           {...register("comment", {
                               minLength: {value: 1, message:"Can't be empty"},
                               maxLength: {value: 150, message:"Too long. Maximum is 150 characters"},
                               required: {value: true, message:"Can't be empty"}
                           })}
                    />
                    <Form.Text style={{color: 'red', float:'right'}}>
                        {errors.comment?.message}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" style={{float: 'left'}} disabled={!isValid}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}