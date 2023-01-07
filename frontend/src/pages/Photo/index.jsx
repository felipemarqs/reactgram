import React from "react";

import { uploads } from "../../utils/config";

//Components
import { Message } from "../../components/Message";
import { Link, useParams } from "react-router-dom";
import { PhotoItem } from "../../components/PhotoItem";
//Hooks
import { useEffect, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getPhoto } from "../../slices/photoSlice";

//styles
import { Container } from "./styles";


export const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

    //Load photo data

    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    //Like and comment

    if ( loading ) {
        return <p>Carregando...</p>
    }
    
  return <Container>
      <PhotoItem photo={photo}/>
    </Container>;
};


