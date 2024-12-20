import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Array to store favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriterecipes.findIndex(
        (fav) => fav.idFood === recipe.idFood
      );

      if (existingIndex >= 0) {
        // If recipe already exists in favorites, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Otherwise, add it to favorites
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
