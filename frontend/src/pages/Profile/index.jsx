import { Container, Header, HeaderDetails } from "./styles";

import { uploads } from "../../utils/config";

//components

import { Message } from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

//hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getUserDetails } from "../../slices/userSlice";

export const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  //Photo
  //New form and edit form refs
  const newPhotoForm = useRef()
  const editPhotoForm = useRef()

  //Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const submitHandle = (e) => {
    e.preventDefault();
    window.alert("send")
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Header>
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt="" />
        )}

        <HeaderDetails>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </HeaderDetails>
      </Header>

      {id === userAuth._id && (
        <>
          <div ref={newPhotoForm}>
                <h3>Compartilhe alguma photo</h3>

                <form onSubmit={submitHandle}>
                    <label>
                        <span>Título para foto:</span>
                        <input type="text" placeholder="Insira um título"></input>
                    </label>

                    <label>
                        <span>Imagem:</span>
                        <input type="file" />
                    </label>

                    <input type="submit" value="Enviar" />
                </form>
          </div>
        </>
      )}
    </Container>
  );
};
