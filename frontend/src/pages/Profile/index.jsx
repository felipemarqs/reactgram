import {
  Container,
  Header,
  HeaderDetails,
  PhotosContainer,
  Photo,
  NewPhotoForm,
  EditPhotoForm,
  ActionIcons,
} from "./styles";

import { uploads } from "../../utils/config";

//components

import { Message } from "../../components/Message";
import { Link } from "react-router-dom";
import {
  BsFillEyeFill,
  BsPencilFill,
  BsXLg,
  BsFillPlusSquareFill,
} from "react-icons/bs";

//hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from "../../slices/photoSlice";

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

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("")
  const [editTitle, setEditTitle] = useState("")

  //botao para enviar foto
  const [openForm, setOpenForm] = useState(false);

  //Photo
  //New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  //Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    // Image preview

    const image = e.target.files[0];

    //Update image state
    setImage(image);
  };

  //Function reset

  const submitHandle = (e) => {
    e.preventDefault();

    console.log(messagePhoto);

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    dispatch(publishPhoto(formData));

    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage());
      setOpenForm(false);
    }, 3000);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  //Delete a photo

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
  //update a photo

  const handleUpdate = (e) => {
    e.preventDefault();

     const photoData = {
      title: editTitle,
      id: editId
     }

     dispatch(updatePhoto(photoData))

     setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);


  };


  //Show or hide form

  const hideOrShowForm = () => {

    
   /*  newPhotoForm.current.classList.toggle("hide"); */
    editPhotoForm.current.classList.toggle("hide");
  };

  



  const handleEdit = (photo) => {


    

    
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForm();
    } 

    setEditId(photo._id)
    setEditTitle(photo.title)
    setEditImage(photo.image)

  };

  const handleCancelEdit = (e) => {
    hideOrShowForm();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
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
            <BsFillPlusSquareFill />
            <button onClick={handleOpenForm}>Novo</button>
          </>
        )}

        {openForm && id === userAuth._id ? (
          <>
            {" "}
            <NewPhotoForm>
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

                  {!loadingPhoto && <input type="submit" value="Enviar" />}
                  {loadingPhoto && (
                    <input type="submit" value="Enviando..." disabled />
                  )}
                </form>
              </div>
              {errorPhoto && <Message msg={errorPhoto} type="error"></Message>}
              {messagePhoto && (
                <Message msg={messagePhoto} type="success"></Message>
              )}
            </NewPhotoForm>
            
          </>
        ) : (
          
          <EditPhotoForm>
          <div className="edit-photo hide" ref={editPhotoForm}>
              <p>Editando:</p>
              {editImage && (
                <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
              )}

              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  onChange={(e) => setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />

                <input type="submit" value="Atualizar" />
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancelar edição
                </button>
              </form>
              {errorPhoto && <Message msg={errorPhoto} type="error"></Message>}
              {messagePhoto && (
                <Message msg={messagePhoto} type="success"></Message>
              )}
            </div>
            
            </EditPhotoForm>
        
        )}
      </Container>

      <Container>
        <PhotosContainer>
          {photos &&
            photos.map((photo) => (
              <Photo key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}

                {id === userAuth._id ? (
                  <>
                    <ActionIcons>
                      <Link to={`/photos/${photo._id}`}>
                        <BsFillEyeFill />
                      </Link>
                      <BsPencilFill onClick={() => handleEdit(photo)} />
                      <BsXLg onClick={() => handleDelete(photo._id)} />
                    </ActionIcons>
                  </>
                ) : (
                  <Link to={`/photos/${photo._id}`}></Link>
                )}
              </Photo>
            ))}

          {photos.length === 0 && <p>Ainda não há fotos.</p>}
        </PhotosContainer>
      </Container>
    </>
  );
};
