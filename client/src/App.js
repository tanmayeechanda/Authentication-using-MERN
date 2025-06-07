import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/main';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={user ? <Main /> : <Navigate to="/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
