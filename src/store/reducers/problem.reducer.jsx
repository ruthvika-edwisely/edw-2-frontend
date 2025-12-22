import { createSlice } from "@reduxjs/toolkit";
import { fetchProblemById } from "../actions/problem.actions.jsx";


const initialState = {
    data: null, 
    loading: false,
    error: null
}




const problemSlice = createSlice({
    name: "problem",
    initialState,
    reducers
});