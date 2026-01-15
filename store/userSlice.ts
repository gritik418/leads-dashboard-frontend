import userApi from "@/services/userApi";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  reducerPath: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.user) {
            state.user = action.payload.user;
          }
        }
      })
      .addMatcher(userApi.endpoints.getUser.matchRejected, (state) => {
        state.user = null;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice;
