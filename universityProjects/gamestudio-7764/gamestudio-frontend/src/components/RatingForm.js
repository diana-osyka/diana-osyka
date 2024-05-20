import {Button, Form} from "react-bootstrap";
import { useForm } from "react-hook-form"
import {addComment} from "../api/comment.service";
import {useEffect, useState} from "react";
import {fetchField} from "../api/fiels.services";

export function RatingForm({onSendRating}){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors , isValid},
    } = useForm()
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const handleMouseEnter = index => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(-1);
    };
    const handleSendRating = (index) =>{
        onSendRating(index);
        console.log(index);
    }
    const repeatedElements = Array(5).fill('Repeated Text');
    const onSubmit = (data) =>{}

    return(
        <div style={{width: '400px'}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div style={{float: 'right'}}>
                    {repeatedElements.map((item, index) => (
                        <button
                            className="stars"
                            key={index}
                            onClick={() => handleSendRating(index+1)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            style={{ float: 'left'}}
                        >
                            {hoveredIndex >= index ? '★' : '☆'}
                        </button>
                    ))}
                </div>
            </Form>
        </div>
    );
}