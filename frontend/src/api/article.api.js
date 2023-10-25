import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const useArticleApi = () => {
    const articleApi = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            "Content-Type": "application/json"
        }
    });

    const GetArticles = createAsyncThunk("/article/fetch", async () => {
        const { data } = await articleApi.get("/");
        return data;
    });

    const AddArticle = createAsyncThunk("/article/post", async (article) => {
        const { data } = await articleApi.post("/", article);
        return data;
    });

    const UpdateArticle = createAsyncThunk("/article/update", async (article) => {
        const { data } = await articleApi.put(`/${article._id}`, article);
        return data;
    });

    const DeleteArticle = createAsyncThunk("/article/delete", async (id) => {
        const { data } = await articleApi.delete(`/${id}`);
        if (data.message === 'article deleted') {
            return { data, id };
        }
        else {
            return data;
        }
    })

    return { GetArticles, AddArticle, UpdateArticle, DeleteArticle };
};