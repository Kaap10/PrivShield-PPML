import { useState, useEffect } from 'react';
import { Shield, Lock, Database, Server, Smartphone, Users } from 'lucide-react';
import FederatedLearningDemo from './demos/FederatedLearningDemo';
import HomomorphicEncryptionDemo from './demos/HomomorphicEncryptionDemo';
import DifferentialPrivacyDemo from './demos/DifferentialPrivacyDemo';
import SecureComputationDemo from './demos/SecureComputationDemo';

interface FeaturesProps {
  activeDemo: string | null;
  setActiveDemo: (demo: string | null) => void;
}

const features = [
  {
    id: 'federated',
    name: 'Federated Learning',
    icon: <Smartphone className="h-10 w-10 text-teal-500" />,
    description: 'Train models on distributed devices without centralizing sensitive data. Perfect for organizations with strict privacy requirements.',
    color: 'from-teal-500 to-emerald-500',
    demo: <FederatedLearningDemo />
  },
  {
    id: 'homomorphic',
    name: 'Homomorphic Encryption',
    icon: <Lock className="h-10 w-10 text-blue-500" />,
    description: 'Perform computations on encrypted data without decryption. Ideal for processing highly sensitive information.',
    color: 'from-blue-500 to-purple-500',
    demo: <HomomorphicEncryptionDemo />
  },
  {
    id: 'differential',
    name: 'Differential Privacy',
    icon: <Shield className="h-10 w-10 text-purple-500" />,
    description: 'Add precisely calibrated noise to data, protecting individual privacy while maintaining statistical accuracy.',
    color: 'from-purple-500 to-pink-500',
    demo: <DifferentialPrivacyDemo />
  },
  {
    id: 'secure',
    name: 'Secure Multi-Party Computation',
    icon: <Server className="h-10 w-10 text-rose-500" />,
    description: 'Split computation across multiple parties so no single entity sees the complete dataset.',
    color: 'from-rose-500 to-orange-500',
    demo: <SecureComputationDemo />
  }
];

const Features = ({ activeDemo, setActiveDemo }: FeaturesProps) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimate(true);
      }
    }, { threshold: 0.1 });
    
    const element = document.getElementById('features');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Privacy-Preserving Techniques</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Our platform leverages cutting-edge PPML methods to ensure data privacy while enabling powerful machine learning capabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`${
                animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700 delay-${index * 100} bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} mr-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.name}</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  {feature.description}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => setActiveDemo(activeDemo === feature.id ? null : feature.id)}
                    className="text-teal-600 dark:text-teal-400 font-medium hover:underline focus:outline-none flex items-center"
                  >
                    {activeDemo === feature.id ? 'Hide Demo' : 'See How It Works'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`ml-1 h-5 w-5 transition-transform ${activeDemo === feature.id ? 'rotate-180' : ''}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeDemo && (
          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 shadow-inner mb-16 transition-all duration-500">
            <div className="max-w-4xl mx-auto">
              {features.find(f => f.id === activeDemo)?.demo}
            </div>
          </div>
        )}

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to implement privacy-preserving ML?</h3>
          <a
            href="#get-started"
            className="inline-block px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Get Started with Privshield
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;