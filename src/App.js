import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/loginRegister/login'
import Home from './Components/loginRegister/Home';
import Register from './Components/loginRegister/Register';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
