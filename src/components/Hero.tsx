import { ArrowDown } from 'lucide-react';

interface HeroProps {
  setActiveDemo: (demo: string | null) => void;
}

const Hero = ({ setActiveDemo }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text leading-tight">
            Privacy-First Machine Learning
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Train AI models on sensitive data without compromising privacy or security.
            Enterprise-grade PPML for healthcare, finance, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a
              href="#features"
              className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => setActiveDemo('federated')}
            >
              Explore PPML Solutions
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-3 rounded-lg font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              How It Works
            </a>
          </div>

          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 aspect-video p-4 flex items-center justify-center">
              <div className="relative w-full max-w-3xl mx-auto">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 z-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                            <span className="text-white font-bold">1</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-16 w-0.5 bg-gradient-to-b from-teal-500 to-transparent"></div>
                      <p className="text-slate-300 text-center mt-2">Model training on device</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold">2</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-16 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
                      <p className="text-slate-300 text-center mt-2">Encrypted aggregation</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold">3</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-16 w-0.5 bg-gradient-to-b from-purple-500 to-transparent"></div>
                      <p className="text-slate-300 text-center mt-2">Privacy verification</p>
                    </div>
                  </div>
                  
                  <div className="text-center text-white mt-8 mb-2">
                    <h3 className="text-xl font-semibold">Federated Learning Flow</h3>
                    <p className="text-slate-400 mt-2">Data never leaves user devices. Only model updates are shared.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <a
            href="#features"
            className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-200 dark:ring-slate-700 shadow-lg rounded-full flex items-center justify-center"
          >
            <ArrowDown className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;