// src/App.tsx
import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/Aboutus';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Events from './pages/Events';
import './styles.css';

function App() {
  const location = useLocation();

  // Disable browser's automatic scroll restoration
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Scroll to top on route change, EXCEPT for the Services page (where ScrollMotionPath lives)
  useLayoutEffect(() => {
    if (location.pathname !== '/services') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
      {(location.pathname !== '/about' && location.pathname !== '/contact') && <Footer />}
    </div>
  );
}

export default App;