import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../settings";

const login = createAsyncThunk('users/login', async (requestData) => {
  const response = await axios.post(`API_BASE_URL${accounts / login}`, requestData);
  return response;
});

export { login };