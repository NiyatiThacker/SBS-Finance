import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ChatWidget from './components/chatbot/ChatWidget';
import FloatingButton from './components/chatbot/FloatingButton';

const Home = lazy(() => import('./pages/Home/Home'));
const Contact = lazy(() => import('./pages/contact/contact'));
const Calculator = lazy(() => import('./pages/calculator/calculator'));
const About = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Privacy = lazy(() => import('./pages/Privacy/Privacy'));
const Terms = lazy(() => import('./pages/Terms/Terms'));

import { ROUTES } from './constants/routes';

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Minimal Loading Fallback
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400 mb-4"></div>
      <p className="text-gray-400 text-sm tracking-widest uppercase font-semibold">Loading...</p>
    </div>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white text-ink-dark">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                
                {/* Main Pages */}
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.SERVICES} element={<Services />} />
                <Route path={ROUTES.CALCULATORS} element={<Calculator />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path={ROUTES.PRIVACY} element={<Privacy />} />
                <Route path={ROUTES.TERMS} element={<Terms />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Toaster position="top-right" />
          
          {/* Global Floating Chatbot */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
              {isChatOpen && (
                <div className="lg:mb-4">
                  <ChatWidget onClose={() => setIsChatOpen(false)} />
                </div>
              )}
            </AnimatePresence>
            <div className={isChatOpen ? 'hidden lg:block' : 'block'}>
              <FloatingButton isOpen={isChatOpen} toggle={() => setIsChatOpen(!isChatOpen)} />
            </div>
          </div>

        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
