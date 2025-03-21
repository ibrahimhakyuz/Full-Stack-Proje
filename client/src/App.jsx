import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router"
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Registration from './pages/Registration' 
import PageNotFound from './pages/PageNotFound' 
import Profile from './pages/Profile' 
import ChangePassword from './pages/ChangePassword' 

import { AuthContext } from './helpers/AuthContext'
import axios from 'axios'

import { useState, useEffect } from 'react'


function App() {

  const [authState, setAuthState] = useState({username:"", id:0, status: false,});



  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", 
    {
      headers: {
        accessToken:localStorage.getItem("accessToken"),
      }
    })
    .then((response) => {
      if (response.data.error){
        setAuthState({...authState, status:false});
      } else {
        setAuthState({username:response.data.username, id:response.data.id, status: true,});
      } 
    })
  },[authState])

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username:"", id:0, status:false});
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className='navbar'>
            <div className='links'>
              { !authState.status ? (
                <>
                  <Link to='/login'>Login</Link>
                  <Link to='/registration'>Registration</Link>
                </>
              ): (
                <>
                  <Link to='/'>Home</Link>
                  <Link to='/createpost'>Create A Post</Link>
                  
                </>
              )}
            </div>
            <div className="loggedInContainer">
                <h1>{authState.username} </h1>
    
                {authState.status && <button onClick={logout}>Logout</button>}
            </div>
            
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
