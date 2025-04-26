import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SecurityBadge from './components/SecurityBadge';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Header />
        <main>
          <Hero setActiveDemo={setActiveDemo} />
          <SecurityBadge />
          <Features activeDemo={activeDemo} setActiveDemo={setActiveDemo} />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;