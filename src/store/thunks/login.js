import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../settings";

const loginThunk = createAsyncThunk('users/login', async (requestData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}accounts/login`, requestData);
    console.log(response);
    return response;
  } catch(err) {
    if (!err.response) {
      throw err;
    }
    console.log(err.response);
    return rejectWithValue(err.response.data);
  }
});

export { loginThunk };