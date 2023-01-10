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
import { Container } from "./styles";
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
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  console.log("Valor do array Photo.comments" , photo.comments)


 

  
  return (
    <Container>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>

     <div className="comments">
        <h3>Comentários ({photo.comments && photo.comments.length })</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Insira um comentário..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText || ""}
          />
          <input type="submit" value="Enviar" />
        </form>

        
      </div>
    </Container>
  );
};
