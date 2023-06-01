import React, { useState, useEffect } from "react";
import styles from './Reviews.module.css'
import { useAuth0 } from "@auth0/auth0-react";


const Reviews = () => {
    const {user} = useAuth0();
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
    }

    const handleCommentDelete = (id) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
        localStorage.setItem("productComments", JSON.stringify(updatedComments));
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
                <button type="submit" className={styles.addButton}>Agregar</button>
            </form>
        </div>
        
        <div className={styles.commentList}>
            <ul >
                {comments?.map((comment) => (
                    <div key={comment.id} className={styles.commentBox}>
                        {user.nickname === "bytemepf" ? (
                            <div className={styles.commentContainer}>
                                <li className={styles.itemsList}>{comment.text}</li>
                                <button onClick={() => handleCommentDelete(comment.id)} className={styles.commentButton}>Eliminar</button>
                            </div>
                        ) : (
                            <div className={styles.commentContainer}>
                                <li className={styles.itemsList}>{comment.text}</li>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>

    </div>
    );
};

export default Reviews;