import { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text">
              Privshield
            </span>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['Features', 'How It Works', 'Docs', 'About'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mr-2"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            <a
              href="#get-started"
              className="hidden md:block bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </a>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Features', 'How It Works', 'Docs', 'About'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#get-started"
              className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-teal-600 to-blue-600 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;