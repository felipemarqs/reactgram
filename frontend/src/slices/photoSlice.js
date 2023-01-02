import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

//Functions

//Publish photo

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    //check errors

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

//Get user photos

export const getUserPhotos = createAsyncThunk(
  "photos/userphotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);

    return data;
  }
);

//delete user photo
export const deletePhoto = createAsyncThunk(
  "photos/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

//update a photo

export const updatePhoto = createAsyncThunk(
  "photos/update",
  async (photoData, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto({title: photoData.title},
      photoData.id,
      token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;


  }
)

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);

        state.message = "Foto enviada com sucesso!";
        console.log(state.message);
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.success = true;
        state.error = null;

        state.message = "Foto enviada com sucesso!";
        

        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.success = true;
        state.error = null;
        
        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return photo.title = action.payload.photo.title;
          }

          return photo;
        });

        state.message = "Foto atualizada com sucesso!";
        
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
