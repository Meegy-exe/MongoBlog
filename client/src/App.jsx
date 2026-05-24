// imports
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// pages
import Blog from './pages/Blog.jsx';
import Login from './pages/Login.jsx';
import PostDetail from './pages/PostDetail.jsx';
import Register from './pages/Register';
import Home from './pages/Home';

// chef dorchestre du site
function App() {
  return (
    <BrowserRouter>
      {/* nav bar */}
      <Navbar />
      <Routes>
        {/* route vers la liste des blogs */}
        <Route path="/" element={<Home />} />
        
        {/* route vers la page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* route vers la page d'inscription */}
        <Route path="/register" element={<Register />} />

        {/* route vers le blog dun user */}
        <Route path="/:login" element={<Blog />} />

        {/* route vers le detail d'un article precis */}
        <Route path="/:login/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App