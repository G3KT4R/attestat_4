import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchProducts",
  async () => {
    const response = await fetch("https://yesno.wtf/api");
    const characters = await response.json();
    //console.log("characters", characters.image);
    return characters;
  }
);

const initialState = {
  list: [],
  randomGif: "",
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacters: (state, action) => {
      const { characters } = action.payload;
      state.randomGif = characters;
      //console.log("state.randomGif", state.randomGif);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.randomGif = action.payload.image;
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {});
  },
});

export const getCharacters = (state) => state.characters.randomGif;
export const { addCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
