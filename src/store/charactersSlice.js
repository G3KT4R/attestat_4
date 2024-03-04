import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCharacters = createAsyncThunk('characters/fetchProducts', async () => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const characters = await response.json();
  return characters;
});

const initialState = {
  list: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacters: (state, action) => {
      const { characters } = action.payload;
      state.list = characters;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.list = action.payload.results;
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {});
  },
});

export const getCharacters = (state) => state.characters.list;
export const { addCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
