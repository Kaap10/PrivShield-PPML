import { useState, useEffect } from 'react';
import { LockKeyhole, Shield, Database, Smartphone } from 'lucide-react';

const HowItWorks = () => {
  const [animateSection, setAnimateSection] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimateSection(true);
      }
    }, { threshold: 0.1 });
    
    const element = document.getElementById('how-it-works');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const steps = [
    {
      icon: <Database className="h-12 w-12 text-teal-500 mb-4" />,
      title: "Step 1: Data Assessment",
      description: "Our team analyzes your data security requirements, regulatory needs, and ML goals."
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-500 mb-4" />,
      title: "Step 2: PPML Strategy",
      description: "We select the optimal privacy-preserving techniques for your specific use case."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-purple-500 mb-4" />,
      title: "Step 3: Implementation",
      description: "Our engineers integrate the selected PPML methods into your existing infrastructure."
    },
    {
      icon: <LockKeyhole className="h-12 w-12 text-rose-500 mb-4" />,
      title: "Step 4: Privacy Audit",
      description: "We conduct comprehensive testing to verify privacy guarantees and model performance."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Privshield Works</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Implementing privacy-preserving machine learning doesn't have to be complex.
            Our streamlined approach makes PPML accessible for your organization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`${
                animateSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700 bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="rounded-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 mt-2">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6">
                Privshield is built from the ground up with security and compliance in mind. 
                Our solutions are designed to meet the strictest regulatory requirements.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "GDPR Compliant",
                    description: "Meet European data protection requirements"
                  },
                  {
                    title: "HIPAA Ready",
                    description: "Suitable for healthcare applications"
                  },
                  {
                    title: "SOC 2 Certified",
                    description: "Rigorous security controls and practices"
                  },
                  {
                    title: "Regular Security Audits",
                    description: "Continuous security assessment and improvement"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-600 to-blue-600 p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">Get Started Today</h3>
              <p className="text-teal-100 mb-8">
                Join leading organizations that trust Privshield for their privacy-preserving machine learning needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-l-lg py-3 px-4 border-0 focus:ring-2 focus:ring-teal-300"
                  />
                  <button
                    type="button"
                    className="bg-white text-teal-600 font-medium py-3 px-6 rounded-r-lg border-0 hover:bg-teal-50 transition-colors"
                  >
                    Request Demo
                  </button>
                </div>
                <p className="text-xs text-teal-100">
                  By submitting, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
              
              <div className="mt-10">
                <p className="text-white font-medium mb-3">Trusted by innovative companies</p>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 bg-white/20 rounded-md flex items-center justify-center">
                      <div className="w-20 h-2 bg-white/30 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;