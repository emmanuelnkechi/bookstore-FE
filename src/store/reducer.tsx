import { combineReducers } from "@reduxjs/toolkit";
import BooksReducer from "./slice/BookSlice";
import { generalApi } from "../services";
import ToastReducer from "./slice/ToasterSlice";

const rootReducer = combineReducers({
    books: BooksReducer,
    toasts: ToastReducer,
    [generalApi.reducerPath]: generalApi.reducer,
})

export default rootReducer;