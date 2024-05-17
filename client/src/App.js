import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authentication from './pages/Authentication';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Authentication />} />
        <Route path="/sign-up" element={<Authentication />} />
      </Routes>
    </>
  );
}

export default App;
