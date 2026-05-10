import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/Aboutus';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Events from './pages/Events';
import CoursesPage from './pages/Courses';
import './styles.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigate = (page: string) => {
    let route = '';
    switch (page) {
      case 'home':
        route = '/';
        break;
      case 'trainings':
        route = '/Programs';
        break;
      case 'blog':
        route = '/events';
        break;
      case 'careers':
        route = '/careers';
        break;
      case 'contact':
        route = '/contact';
        break;
      default:
        route = `/${page}`;
    }
    navigate(route);
  };

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

  // Define pages where footer should be hidden
  const hideFooterPages = ['/about', '/contact'];
  const shouldShowFooter = !hideFooterPages.includes(location.pathname);

  // Custom cursor logic
  useLayoutEffect(() => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    const follower = document.querySelector('.custom-cursor-follower') as HTMLElement;
    
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0,
      });
      gsap.to(follower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.15,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="app-wrapper">
      <div className="custom-cursor"></div>
      <div className="custom-cursor-follower"></div>
      <Navbar onNavigate={handleNavigate} />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Programs" element={<CoursesPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;