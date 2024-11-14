import { createSlice } from "@reduxjs/toolkit";

interface TweetsInterface {
  isGettingTweets: boolean;
  tweets: Array<{}>;
}

const initialState: TweetsInterface = {
  isGettingTweets: false,
  tweets: [],
};

const tweetsSlice = createSlice({
  name: "tweetsSlice",
  initialState,
  reducers: {
    addNewTweet: (state, action) => {
      state.tweets = [action.payload, ...state.tweets];
    },
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    clearTweets: (state) => {
      state.tweets = [];
    },
  },
});

export const { getAllTweets, addNewTweet, clearTweets } = tweetsSlice.actions;

export default tweetsSlice.reducer;
