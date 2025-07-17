import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linkData: [],
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    addLink: (state, action) => {
      state.linkData.push(action.payload);
    },
    setLinks: (state, action) => {
      state.linkData = action.payload;
    },

    updateLink: (state, action) => {
      state.linkData = state.linkData.map((link) =>
        link.id === action.payload.id ? action.payload : link
      );
    },

    toggleFavourite: (state, action) => {
      const id = action.payload;
      state.linkData = state.linkData.map((link) =>
        link.id == id ? { ...link, isFavourite: !link.isFavourite } : link
      );
    },

    deleteLink: (state, action) => {
      const id = action.payload;
      state.linkData = state.linkData.filter((link) => link.id !== id);
    },
  },
});

export const { addLink, setLinks, updateLink, toggleFavourite, deleteLink } =
  linkSlice.actions;
export default linkSlice.reducer;
