import { api, requestConfig } from "../utils/config";

//Register a user

const register = async (data) => {
  const config = requestConfig("POST", data);
  console.log("aqui");
 // console.log(`${data} valor de data em authService register`)
  try {
    const res = await fetch(api + "/users/register", config)
    .then((res) => res.json())
    .catch((err) => err);
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
    console.log(`${error} caught ${error.stack}`);
  }
};

//Logout an user

const logout = () => {
  localStorage.removeItem("user");
}

//Sing in a user
const login = async (data) => {

 const config = requestConfig("POST", data);

 try {

  const res = await fetch(api + "/users/login", config)
  .then((res) => res.json())
  .catch((err) => err)


  if (res) {
    localStorage.setItem("user", JSON.stringify(res))
  }
  
  return res;
 } catch (error) {

  console.log(error)
  
 }


  
};

const authService = {
    register,
    logout,
    login,
}

export default authService;
