import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
/* import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing'; */
import { createBrowserRouter,
  RouterProvider,BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from "./error-page";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      /* children: [
        {
          path: "contacts/:contactId",
          element: <Contact />
        },
      ] */
    },
    /* {
      path: "/",
      element: <Home />
    },
    {
      path: "/post",
      element: <NewPost />
    },
    {
      path: "/post/:id",
      element: <PostPage />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "*",
      element: <Missing />
    }, */
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Router>
      <Routes>
        <Route path="/" Component={App} />
      </Routes>
      
    </Router> */}
   {/*  <RouterProvider router={router} /> */}
   <App />
  </React.StrictMode>
);
