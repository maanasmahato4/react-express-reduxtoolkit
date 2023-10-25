import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useArticleApi } from "../../api/article.api";

const { GetArticles, AddArticle, UpdateArticle, DeleteArticle } = useArticleApi();

const STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    REJECTED: 'error'
}

const initialState = {
    articles: [],
    article: {},
    status: 'idle', // idle | loading | succeded | failed
    error: null
}

const ArticleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setArticleToUpdate(state, action) {
            state.article = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetching articles from the server
            .addCase(GetArticles.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(GetArticles.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;
                state.articles = action.payload;
            })
            .addCase(GetArticles.rejected, (state, action) => {
                state.status = STATUS.REJECTED;
                state.error = action.payload.error;
            })
            // adding new articles
            .addCase(AddArticle.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(AddArticle.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;
                state.articles.push(action.payload);
            })
            .addCase(AddArticle.rejected, (state, action) => {
                state.status = STATUS.REJECTED;
                state.error = action.payload.error;
            })
            // update articles
            .addCase(UpdateArticle.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(UpdateArticle.fulfilled, (state, action) => {
                state.status = STATUS.SUCCESS;
                const existingArticle = state.articles.findIndex((article) => article._id == action.payload._id);
                if (existingArticle >= 0) {
                    state.articles[existingArticle] = action.payload;
                }
            })
            .addCase(UpdateArticle.rejected, (state, action) => {
                state.status = STATUS.REJECTED;
                state.error = action.payload.error;
            })
            // deleting articles
            .addCase(DeleteArticle.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(DeleteArticle.fulfilled, (state, action) => {
                state.status = STATUS.fulfilled;
                const existingArticle = state.articles.findIndex((article) => article._id == action.payload.id);
                if (existingArticle >= 0) {
                    state.articles.splice(existingArticle, 1);
                }
            })
            .addCase(DeleteArticle.rejected, (state, action) => {
                state.status = STATUS.REJECTED;
                state.error = action.payload.error;
            })
    }
})


export const { setArticleToUpdate } = ArticleSlice.actions;
export default ArticleSlice.reducer;