import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useArticleApi } from "../api/article.api";
import ArticleCard from '../component/articleCard';
import { Outlet } from 'react-router-dom';

function Home() {
    const { GetArticles } = useArticleApi();
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.article.articles);
    const status = useSelector(state => state.article.status);
    const error = useSelector(state => state.article.error);
    useEffect(() => {
        if (status == 'idle') {
            dispatch(GetArticles());
        }
    }, [articles, dispatch]);

    if(status == 'loading'){
        return <h1>loading...</h1>
    } else if(status == 'error'){
        return <p>{error}</p>
    }
    return (
        <section style={{marginInline: "25%"}}>
            <Outlet/>
            {articles.map((article) => {
                return <div key={article._id}>
                    <ArticleCard article={article}/>
                </div>
            })}
        </section>
    )
}

export default Home