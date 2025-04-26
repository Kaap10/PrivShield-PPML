import { useState, useEffect } from 'react';
import { KeyRound, Database, ShieldCheck } from 'lucide-react';

const SecureComputationDemo = () => {
  const [step, setStep] = useState(0);
  const [party1Data, setParty1Data] = useState('');
  const [party2Data, setParty2Data] = useState('');
  const [party1Hash, setParty1Hash] = useState('');
  const [party2Hash, setParty2Hash] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [result, setResult] = useState('');
  
  const totalSteps = 4;

  // Generate random hash for visualization
  const generateHash = () => Math.random().toString(16).substring(2, 10);
  
  useEffect(() => {
    // Generate initial data
    if (!party1Data) {
      setParty1Data(Math.floor(Math.random() * 100).toString());
      setParty2Data(Math.floor(Math.random() * 100).toString());
      setParty1Hash(generateHash());
      setParty2Hash(generateHash());
    }
    
    let timer: number;
    
    if (isPlaying) {
      timer = window.setInterval(() => {
        setStep((prevStep) => {
          // When we reach the final step, calculate the result
          if (prevStep === totalSteps - 2) {
            const sum = parseInt(party1Data) + parseInt(party2Data);
            setResult(sum.toString());
          }
          return (prevStep + 1) % totalSteps;
        });
      }, 3000);
    }
    
    return () => clearInterval(timer);
  }, [isPlaying, party1Data, party2Data]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepClick = (index: number) => {
    setStep(index);
    if (index === totalSteps - 1) {
      const sum = parseInt(party1Data) + parseInt(party2Data);
      setResult(sum.toString());
    } else {
      setResult('');
    }
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setParty1Data(Math.floor(Math.random() * 100).toString());
    setParty2Data(Math.floor(Math.random() * 100).toString());
    setParty1Hash(generateHash());
    setParty2Hash(generateHash());
    setStep(0);
    setResult('');
    setIsPlaying(true);
  };

  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold mb-6 text-center">Secure Multi-Party Computation</h3>

      <div className="relative h-80 mb-8 bg-slate-900 rounded-lg overflow-hidden">
        {/* Step 1: Initial Data */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-xl text-center">
              <div className="flex justify-center gap-16 mb-6">
                <div className="text-center">
                  <div className="p-4 bg-blue-900/30 rounded-lg flex flex-col items-center mb-3">
                    <Database className="h-10 w-10 text-blue-400 mb-2" />
                    <div className="text-white text-lg font-medium">Hospital A</div>
                    <div className="mt-2 text-blue-300 font-mono">Secret: {party1Data}</div>
                  </div>
                  <div className="text-xs text-slate-400">Has patient records</div>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-purple-900/30 rounded-lg flex flex-col items-center mb-3">
                    <Database className="h-10 w-10 text-purple-400 mb-2" />
                    <div className="text-white text-lg font-medium">Hospital B</div>
                    <div className="mt-2 text-purple-300 font-mono">Secret: {party2Data}</div>
                  </div>
                  <div className="text-xs text-slate-400">Has different patient records</div>
                </div>
              </div>
              <h4 className="text-white text-lg font-medium">Step 1: Initial Setup</h4>
              <p className="text-slate-300 mt-2">
                Each hospital has private patient data they cannot share due to privacy regulations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 2: Data Encryption */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-xl text-center">
              <div className="flex justify-center gap-16 mb-6">
                <div className="text-center">
                  <div className="p-4 bg-blue-900/30 rounded-lg flex flex-col items-center mb-3">
                    <KeyRound className="h-10 w-10 text-blue-400 mb-2" />
                    <div className="text-white text-lg font-medium">Hospital A</div>
                    <div className="mt-2 text-blue-300 font-mono animate-pulse">
                      Encrypting: {party1Hash}
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-purple-900/30 rounded-lg flex flex-col items-center mb-3">
                    <KeyRound className="h-10 w-10 text-purple-400 mb-2" />
                    <div className="text-white text-lg font-medium">Hospital B</div>
                    <div className="mt-2 text-purple-300 font-mono animate-pulse">
                      Encrypting: {party2Hash}
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-white text-lg font-medium">Step 2: Secret Sharing</h4>
              <p className="text-slate-300 mt-2">
                Each hospital creates encrypted shares of their data using a special mathematical protocol.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 3: Computation */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-xl text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-green-900/30 rounded-lg flex flex-col items-center">
                  <ShieldCheck className="h-12 w-12 text-green-400 mb-3" />
                  <div className="text-white text-lg font-medium">Secure Computation Environment</div>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div className="p-2 bg-blue-900/50 rounded">
                      <div className="text-blue-300 font-mono text-sm">{party1Hash}</div>
                    </div>
                    <div className="p-2 bg-purple-900/50 rounded">
                      <div className="text-purple-300 font-mono text-sm">{party2Hash}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-green-300 animate-pulse">
                    Computing securely...
                  </div>
                </div>
              </div>
              <h4 className="text-white text-lg font-medium">Step 3: Secure Computation</h4>
              <p className="text-slate-300 mt-2">
                The encrypted shares are computed on without revealing the original values.
                Neither hospital can see the other's data.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 4: Result */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-xl text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-green-900/30 rounded-lg flex flex-col items-center">
                  <div className="text-white text-lg font-medium mb-3">Combined Analysis Result</div>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-2">Total Patient Count:</div>
                    <div className="text-3xl font-bold text-green-400">{result}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-slate-400 text-sm">Hospital A</div>
                      <div className="text-lg text-blue-400">{party1Data}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Hospital B</div>
                      <div className="text-lg text-purple-400">{party2Data}</div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-white text-lg font-medium">Step 4: Privacy-Preserving Result</h4>
              <p className="text-slate-300 mt-2">
                The hospitals receive only the aggregated result. Individual data remains 
                protected throughout the entire process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex space-x-2 mb-4 sm:mb-0">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`h-2 w-12 rounded-full transition-colors ${
                step === index ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                <span className="ml-2">Pause</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span className="ml-2">Play</span>
              </>
            )}
          </button>
          
          <button
            onClick={resetDemo}
            className="flex items-center justify-center px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v6h6"></path>
              <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
              <path d="M21 22v-6h-6"></path>
              <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
            </svg>
            <span className="ml-2">Reset</span>
          </button>
        </div>
      </div>
      
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mt-8">
        <h4 className="text-lg font-medium mb-2">Real-World Applications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <div>
              <h5 className="text-base font-medium mb-1">Healthcare Research</h5>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Hospitals can collaborate on medical research without sharing confidential patient records.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            </div>
            <div>
              <h5 className="text-base font-medium mb-1">Financial Benchmarking</h5>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Banks can compare performance metrics without revealing sensitive financial data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureComputationDemo;