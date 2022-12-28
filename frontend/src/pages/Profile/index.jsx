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
import { publishPhoto, resetMessage } from "../../slices/photoSlice";

export const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  //Photo
  //New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  //Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    // Image preview

    const image = e.target.files[0];

    //Update image state
    setImage(image);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

    dispatch(publishPhoto(formData));

    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

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
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                ></input>
              </label>

              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>

            { !loadingPhoto && <input type="submit" value="Enviar" />}
            { loadingPhoto && <input type="submit" value="Enviando..." disabled />}

              
            </form>
          </div>
          { errorPhoto && <Message msg={errorPhoto} type="error"></Message>}
          { messagePhoto && <Message msg={messagePhoto} type="success"></Message>}
        </>
      )}
    </Container>
  );
};
