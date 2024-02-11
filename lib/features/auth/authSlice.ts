import { configureStore,createSlice } from "@reduxjs/toolkit";

const loadAuthStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("auth-info");

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const initialState = loadAuthStateFromLocalStorage() || {
  auth: {
    id: "",
    username: "",
    email: "",
    userSignedIn: false,
  },
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.auth.userSignedIn = true;
      state.auth.id = action.payload.result.id;
      state.auth.email = action.payload.result.email;
      state.auth.username = action.payload.result.username;

      localStorage.setItem("auth-info", JSON.stringify(state));
    },
    logOut: (state) => {
      state.auth.userSignedIn = false;
      state.auth.id = null;
      state.auth.email = null;
      state.auth.username = null;
      // Object.assign(state.auth, {})

      // Auth Info
      localStorage.removeItem("auth-info");
    },
  },
});

export const { signIn, logOut } = auth.actions;
export default auth.reducer;
