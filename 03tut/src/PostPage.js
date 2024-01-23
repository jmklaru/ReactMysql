import React from 'react'
import { useParams, Link } from 'react-router-dom';

const PostPage = () => {
  const {id} = useParams();
  return (
    <main className='container'>
      <h1>PostPage</h1>
      <Link to="/post" className='btn btn-primary'>New Post</Link>
      <div className="alert text-info">The page ID is {id}</div>
    </main>
  )
}

export default PostPage