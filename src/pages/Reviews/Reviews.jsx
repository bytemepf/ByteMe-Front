import React, { useState, useEffect } from "react";
import styles from './Reviews.module.css'

const Reviews = () => {
    const [comments, setComments] = useState([]);

    const handleCommentSubmit = (event) => {
    event.preventDefault();
    const commentText = event.target.comment.value;
    const newComment = {
        id: Date.now(),
        text: commentText,
    };
    setComments((prevComments) => [...prevComments, newComment]);
    event.target.comment.value = "";
    };

useEffect(() => {
    const storedComments = localStorage.getItem("productComments");
    if (storedComments) {
        setComments(JSON.parse(storedComments));
    }
}, []);

useEffect(() => {
    localStorage.setItem("productComments", JSON.stringify(comments));
}, [comments]);

    return (
    <div className={styles.reviews}>
    <h1>Tu opinión nos ayuda a seguir creciendo!</h1>
        <div>
            <form onSubmit={handleCommentSubmit}>
                <label htmlFor="comment">Agregar comentario</label>
                <input type="text" name="comment" id="comment" />
                <button type="submit">Agregar</button>
            </form>
        </div>
        
        <div className={styles.commentList}>
            <ul >
                {comments?.map((comment) => (
                    <li key={comment.id} className={styles.itemsList}>{comment.text}</li>
                ))}
            </ul>
        </div>

    </div>
    );
};

export default Reviews;