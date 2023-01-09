import React from "react";

import { uploads } from "../../utils/config";

//Components
import { Message } from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { PhotoItem } from "../../components/PhotoItem";
//Hooks
import { useEffect, useState } from "react";
import { useResetComponentMessage} from "../../hooks/useResetComponentMessage"

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPhoto, like } from "../../slices/photoSlice";

//styles
import { Container } from "./styles";
import { LikeContainer } from "../../components/LikeContainer";

export const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth);

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  //Load photo data

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  //Like and comment

  const handleLike = () => {
   
    dispatch(like(photo._id));
    resetMessage()
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error"/>}
        {message && <Message msg={message} type="success"/>}
      </div>
    </Container>
  );
};
