import {
  Container,
  FormContainer,
  TitleContainer,
  ImageContainer,
} from "./styles";

//Utils
import { uploads } from "../../../utils/config";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { profile, resetMessage , updateProfile } from "../../../slices/userSlice";

//Componnents
import { Message } from "../../../components/Message";

export const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  //states

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //Load user data

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //Fill form with user data

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gathering data

    const userData = {
      name
    }

    console.log(bio)

    if (profileImage) {
      userData.profileImage = profileImage
    }

    if(bio) {
      userData.bio = bio
    }

    if(password) {
      userData.password = password
    }

    // buid form data

    const formData = new FormData()

    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)






  };

  const handleFile = (e) => {
    // Image preview

    const image = e.target.files[0];

    //image preview
    setPreviewImage(image);

    //Update image state
    setProfileImage(image);
  };

  return (
    <>
      <Container>
        {/* //Imagem do Usuario */}
        <TitleContainer>
          <h2>Editar perfil</h2>
        </TitleContainer>

        <TitleContainer>
        <h3>{user.name}</h3>
        </TitleContainer>
       
        <ImageContainer>
          {(user.profileImage || previewImage) && (
            <img
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${uploads}/users/${user.profileImage}`
              }
              alt={user.name}
            />
          )}
        </ImageContainer>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
            />
            <input
              type="email"
              placeholder="email"
              disabled
              value={email || ""}
            />
            <label htmlFor="" className="custom-file-upload">
              <span>Alterar imagem do Perfil:</span>
              <input type="file" onChange={handleFile} />
            </label>
            <label htmlFor="">
              <span>Bio:</span>
              <input
                type="text"
                placeholder="Descrição do perfil"
                onChange={(e) => setBio(e.target.value)}
                value={bio || ""}
              />
            </label>

            <label>
              <span>Nova Senha :</span>
              <input
                type="password"
                placeholder="Digite uma nova senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password || ""}
              />
            </label>
            {!loading && <input type="submit" value="Atualizar" />}
            {loading && <input type="submit" value="Entrando..." disabled />}

            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}

          </form>
        </FormContainer>
      </Container>
    </>
  );
};
