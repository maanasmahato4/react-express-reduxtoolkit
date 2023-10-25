import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useArticleApi } from "../api/article.api";

function AddArticle() {
  const [data, setData] = useState({ title: "", description: "", isVerified: false });
  const { AddArticle } = useArticleApi();
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
    dispatch(AddArticle(data));
    e.target.reset();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginInline: "25%" }}>
        <div>
          <span>Title</span>
          <input type='text' onChange={handleChange} name='title' />
        </div>
        <div>
          <span>Description</span>
          <input type='text' onChange={handleChange} name='description' />
        </div>
        <div>
          <span>isVerified:</span><input type="checkbox" onChange={handleChange} name='isVerified' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddArticle