import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin';
import UserWallet from './components/UserWallet';

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<UserRegister/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/dashboard' element={<UserWallet/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
