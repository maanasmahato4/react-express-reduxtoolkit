import {configureStore} from "@reduxjs/toolkit";
import ArticlesReducer from "../features/articles/articles.slice";

export const store = configureStore({
    reducer: {
        article: ArticlesReducer
    }
});