import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddArticle from './pages/AddArticle';
import UpdateArticle from './pages/UpdateArticle';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<Home />}>
        <Route path='add' element={<AddArticle />} />
        <Route path='update/:id' element={<UpdateArticle />} />
      </Route>
      
    </Routes>
  )
}

export default App