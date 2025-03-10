import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Users from './pages/Users';
import Families from './pages/Families';
import VisualMedia from './pages/VisualMedia';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/families" element={<Families />} />
                <Route path="/visual-media" element={<VisualMedia />} />
            </Routes>
        </Router>
    );
};

export default App;