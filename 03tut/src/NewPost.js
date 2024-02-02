import React from 'react'
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, posts, setPosts }) => {

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = {
      id, title: postTitle, datetime, body: postBody 
    };
    const allPosts = [...posts, newPost ];
    setPosts(allPosts);
    console.log(posts);
    setPostBody('');
    setPostTitle('');
    navigate("/");

  }
  return (
    <main className='NewPost'>
      <h2>NewPost</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text"
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)} 
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
          
          id="postBody"
          required
          value={postBody}
          onChange={(e) =>setPostBody(e.target.value)} 
          cols="30" 
          rows="10"
        />
        <button type='submit'>Submit</button>
      </form>
      {/* <ul>
        <li>
          <Link to="/post/1">Post 1</Link>
        </li>
        <li>
          <Link to="/post/2">Post 2</Link>
        </li>
        <li>
          <Link to="/post/3">Post 3</Link>
        </li>
        <li>
          <Link to="/post/4">Post 4</Link>
        </li>
        
      </ul> */}
    </main>
  )
}

export default NewPost