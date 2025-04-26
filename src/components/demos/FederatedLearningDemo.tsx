import { useState, useEffect } from 'react';

const FederatedLearningDemo = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 4;
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer: number;
    
    if (isPlaying) {
      timer = window.setInterval(() => {
        setStep((prevStep) => (prevStep + 1) % totalSteps);
      }, 3000);
    }
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepClick = (index: number) => {
    setStep(index);
    setIsPlaying(false);
  };

  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold mb-6 text-center">How Federated Learning Works</h3>
      
      <div className="relative h-80 mb-8 bg-slate-900 rounded-lg overflow-hidden">
        {/* Step 1: Local Model Training */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-md text-center">
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((device) => (
                    <div key={device} className="p-3 bg-slate-800 rounded-lg flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 mb-2 animate-pulse">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12" y2="18"></line>
                      </svg>
                      <div className="text-xs text-teal-300">Device {device}</div>
                      <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{width: `${(device * 25) + 25}%`}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <h4 className="text-white text-lg font-medium">Step 1: Local Training</h4>
              <p className="text-slate-300 mt-2">
                Each device trains a local model using only their data. The data never leaves the device.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 2: Sending Model Updates */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-md text-center">
              <div className="flex justify-center mb-6 relative">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((device) => (
                    <div key={device} className="p-3 bg-slate-800 rounded-lg flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 mb-2">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12" y2="18"></line>
                      </svg>
                      <div className="text-xs text-teal-300">Model Updates</div>
                      <svg className="mt-1 text-blue-400 animate-bounce" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5"></path>
                        <path d="M5 12l7 7 7-7"></path>
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 p-4 bg-blue-500/30 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6" y2="6"></line>
                        <line x1="6" y1="18" x2="6" y2="18"></line>
                  </svg>
                </div>
              </div>
              <h4 className="text-white text-lg font-medium mt-6">Step 2: Sending Model Updates</h4>
              <p className="text-slate-300 mt-2">
                Devices send only their model updates (weights and gradients) to the server, not the raw data.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 3: Secure Aggregation */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-md text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                      <line x1="6" y1="6" x2="6" y2="6"></line>
                      <line x1="6" y1="18" x2="6" y2="18"></line>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 animate-ping opacity-75"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-white text-lg font-medium">Step 3: Secure Aggregation</h4>
              <p className="text-slate-300 mt-2">
                The server securely aggregates the model updates from all devices. Individual updates cannot be traced back to specific devices.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 4: Global Model Update */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full flex items-center justify-center">
            <div className="max-w-md text-center">
              <div className="flex justify-center mb-6 relative">
                <div className="p-6 bg-blue-500/20 rounded-lg mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6" y2="6"></line>
                    <line x1="6" y1="18" x2="6" y2="18"></line>
                  </svg>
                </div>
                
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((device) => (
                      <div key={device} className="p-2 bg-slate-800 rounded-lg flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 animate-pulse">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                          <line x1="12" y1="18" x2="12" y2="18"></line>
                        </svg>
                        <div className="text-xs text-purple-300 mt-1">Updated Model</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h4 className="text-white text-lg font-medium mt-12">Step 4: Global Model Update</h4>
              <p className="text-slate-300 mt-2">
                The improved global model is distributed back to all devices, completing the federated learning cycle.
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
              className={`h-2 w-16 rounded-full transition-colors ${
                step === index ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>
        
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
      </div>
    </div>
  );
};

export default FederatedLearningDemo;