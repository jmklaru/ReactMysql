import {Header} from './Header';
import {NavBar} from './NavBar';
import {Footer} from './Footer';
 import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';

/*import { Outlet, Link, Route, Routes, useHistory } from 'react-router-dom'; */
import { BrowserRouter, Routes, Route, useHistory, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login  from './Login';
import {format } from 'date-fns';


function App() {
  const [posts, setPosts ] = useState([
    {
      id:1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipising elit. Quis"
    },
    {
      id:2,
      title: "My Second Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipising elit. Quis"
    },
    {
      id:3,
      title: "My Third Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipising elit. Quis"
    },
    {
      id:4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipising elit. Quis"
    },
    {
      id:5,
      title: "My Fifth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipising elit. Quis"
    }
    
  ]);
  const [search, setSearch ] = useState('');
  const [searchResults, setSearchResults ] = useState('');
  const [postTitle, setPostTitle ] = useState('');
  const [postBody, setPostBody ] = useState('');
  /* const navigate = useNavigate();

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate("/");
    alert('Yes here I am');
  } 
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = {
      id, title: postTitle, datetime, body: postBody 
    };
    const allPosts = { ...posts, newPost };
    setPosts(allPosts);
    setPostBody('');
    setPostTitle('');
    navigate("/");

  }
  */

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
      );

      setSearchResults(filteredResults.reverse());
  },[posts, search])
  
  return (
    <div className="App">
      <Header title='React JS Blog' />
      
      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/post" element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes> */}
      <BrowserRouter>
        <NavBar search={search} setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<Home posts={searchResults} />} />
          <Route path="/post" element={<NewPost 
            posts={posts}
            setPosts={setPosts}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          
          />} />
          <Route path='/post/:id' element={<PostPage posts={posts}  setPosts={setPosts} />} />
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
