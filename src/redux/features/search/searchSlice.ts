import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SearchState {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

// AsyncThunk দিয়ে API কল
export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query: string) => {
    const response = await axios.get("/api/products", { params: { query } });
    return response.data; // API রেসপন্স
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload; // সার্চ কুয়েরি স্টেট আপডেট
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.result; // সার্চ রেজাল্ট সংরক্ষণ
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
