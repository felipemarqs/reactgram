import React from "react";

import { uploads } from "../../utils/config";

//Components
import { Message } from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { PhotoItem } from "../../components/PhotoItem";
//Hooks
import { useEffect, useState } from "react";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPhoto, like, comment } from "../../slices/photoSlice";

//styles
import { Container,AuthorContainer } from "./styles";
import { LikeContainer } from "../../components/LikeContainer";

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState("");
  //Load photo data

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  //Like and comment

  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText("");

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

 

  return (
    <Container>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>

      {photo.comments && (
        <div className="comments">
          <h3>Comentários ({photo.comments.length})</h3>
          <form onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Insira um comentário..."
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText || ""}
            />
            <input type="submit" value="Enviar" />
          </form>
          {photo.comments.length === 0 && <p>Ainda não há comentários.</p>}
          {photo.comments.map((comment) => (
           
            <div className="comment" key={comment.comment}>
               {console.log(comment)}
              <AuthorContainer>
                {comment.userImage && (
                  <img
                    src={`${uploads}/users/${comment.userImage}`}
                    alt={comment.userName}
                  />
                )}

                <Link to={`/users/${comment.userId}`}>
                  <p>{comment.userName}</p>
                  <p className="commentText">{comment.comment}</p>
                </Link>
                
              </AuthorContainer>

            
       
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
