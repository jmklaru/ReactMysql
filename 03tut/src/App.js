import {Header} from './Header';
import {NavBar} from './NavBar';
import {Footer} from './Footer';
 import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';

/*import { Outlet, Link, Route, Routes, useHistory } from 'react-router-dom'; */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login  from './Login';


function App() {

  return (
    <div className="App">
      <Header />
      
      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/post" element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes> */}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      </BrowserRouter>
      
      <Footer />
      
    </div>
  );
}

export default App;
