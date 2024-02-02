import React from 'react'
import { Link } from 'react-router-dom';


export const NavBar = ({ search, setSearch }) => {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()} >
          <label htmlFor="search">Search Posts</label>
          <input 
            id="search"
            type="text"
            placeholder='Search Posts'
            value={search}
            onChange={(e) => setSearch(e.target.value)}

          />
        </form>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        {/* <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
              <Link class="navbar-brand" to="/">React Test</Link>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="about">About</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="post">Post</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="login">Login</Link>
                  </li>
                </ul>
              </div>
            </div>
        </nav> */}

    </nav>
    
    
  )
}
