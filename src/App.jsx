import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Clock from './components/Clock';
import Header from './components/Header';
import Login from './components/Login';
import MainPage from './components/MainPage';

function App() {
  const authStatus = useSelector((state) => state.authStatus)
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <>
            <Header/>
            <Clock/>
            {authStatus ? <Navigate to='/main'/> : <Login/>}
          </>
        }
        />

        <Route path='/main' element={authStatus ? <MainPage/> : <Navigate to='/' />}/>
      </Routes>
    </Router>
    
  )
}

export default App
