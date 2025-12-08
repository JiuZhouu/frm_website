import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Post from './pages/Post';
import CategoryPage from './pages/Category';
import TagPage from './pages/Tag';
import Sitemap from './pages/Sitemap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<Post />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/tag/:name" element={<TagPage />} />
              <Route path="/sitemap" element={<Sitemap />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
