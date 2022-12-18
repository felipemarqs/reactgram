import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Register an user and Sing In
export const  register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const {name , email , password, confirmPassword } = user;
    const userReq = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    console.log(user +' valor de user')
    const data = await authService.register(user)
    
    console.log(data + 'erlkrewrwrwerwerwer')
    //console.log("caiu no register")
    //console.log(data + 'dados do usuario')
    //Check for erros

    if (data.errors) {
      
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions

export default authSlice.reducer
