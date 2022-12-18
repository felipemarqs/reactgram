import { api, requestConfig } from "../utils/config";

//Register a user

const register = async (data) => {
  const config = requestConfig("POST", data);
  console.log(`${data} valor de data em authService register`)
  try {
    const res = await fetch(`${api}/users/register`, config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log(`${res} dsddsd`)
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }
  } catch (error) {
    console.log(error);
  }
};

const authService = {
    register,
}

export default authService;
