import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useArticleApi } from "../api/article.api";

function UpdateArticle() {
  const article = useSelector(state => state.article.article);
  const [data, setData] = useState({ ...article, title: article.title || '', description: article.description || '', isVerified: article.isVerified || false });
  const { UpdateArticle } = useArticleApi();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "isVerified") {
      setData({ ...data, [e.target.name]: e.target.checked })
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateArticle(data))
    e.target.reset();
  }
  return (
    <div>
      <h1>Update Article</h1>
      <form onSubmit={handleSubmit} style={{ marginInline: "25%" }}>
        <div>
          <span>Title</span>
          <input type='text' value={data.title || ''} onChange={handleChange} name='title' />
        </div>
        <div>
          <span>Description</span>
          <input type='text' value={data.description || ''} onChange={handleChange} name='description' />
        </div>
        <div>
          <span>isVerified:</span><input type="checkbox" defaultChecked={data.isVerified == true ? true : false} onChange={handleChange} name='isVerified' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateArticle;