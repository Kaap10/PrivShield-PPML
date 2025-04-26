import { Shield, Mail, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-teal-400 mr-2" />
              <span className="text-xl font-bold">Privshield</span>
            </div>
            <p className="text-slate-400 mb-6">
              Enabling privacy-preserving machine learning for organizations worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {['Federated Learning', 'Homomorphic Encryption', 'Differential Privacy', 'Secure Computation', 'Enterprise Security'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Blog', 'Case Studies', 'Whitepapers', 'Research'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-teal-400 mr-2 mt-0.5" />
                <span className="text-slate-400">info@privshield.ai</span>
              </li>
              <li>
                <a href="#" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Privshield. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <a key={index} href="#" className="text-slate-500 hover:text-teal-400 text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;