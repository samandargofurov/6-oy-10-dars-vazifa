import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Details from './pages/Details'
import Register from './pages/Register'
import Login from './pages/Login'
import ErrorPage from './pages/ErrorPage'
import { useEffect, useState } from 'react'

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [token, navigate]);

  function PrivateRoute({childern}) {
    const isAuthenticated = token ? true : false;

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? childern : null;
  }

  return (
    <>
      <Routes>
        {/* public route */}
        <Route path='/register' element = {<Register></Register>}></Route>
        <Route path='/login' element = {<Login></Login>}></Route>

        {/* pvivate route */}
        <Route path='/' element = {<PrivateRoute isAuthenticated = {token ? true : false}><Home></Home></PrivateRoute>}></Route>
        
        <Route path='/details' element = {<PrivateRoute isAuthenticated = {token ? true : false}><Details></Details></PrivateRoute>}></Route>

        <Route path='*' element = {<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </>
  )
}

export default App
