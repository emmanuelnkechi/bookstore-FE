import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../models";


type BookType = {
books: IBook[]
};

const bookState: BookType = {
    books: []

};

const BookSlice = createSlice({
    name: 'book',
    initialState: bookState,
    reducers: {
        setBook: (state, { payload }: PayloadAction<IBook[]>) => {
            state.books = payload
        }
    
    }
})

const { actions, reducer } = BookSlice;

export const { setBook } = actions;

export const selectBooks = (state: BookType) => state.books

export default reducer;