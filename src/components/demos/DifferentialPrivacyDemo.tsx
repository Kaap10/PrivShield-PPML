import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const DifferentialPrivacyDemo = () => {
  const [privacyBudget, setPrivacyBudget] = useState(0.5);
  const [showOriginalData, setShowOriginalData] = useState(false);
  
  // Original data - simulating a medical dataset
  const originalData = [
    { id: 1, age: 32, condition: 'Diabetes', treatment: 'Insulin' },
    { id: 2, age: 45, condition: 'Hypertension', treatment: 'Beta-blockers' },
    { id: 3, age: 28, condition: 'Asthma', treatment: 'Inhalers' },
    { id: 4, age: 56, condition: 'Arthritis', treatment: 'Anti-inflammatories' },
    { id: 5, age: 38, condition: 'Depression', treatment: 'SSRIs' }
  ];
  
  // Function to generate noisy data based on the privacy budget
  const generateNoisyData = () => {
    const noiseFactor = 10 - privacyBudget * 9; // More noise with smaller budget
    
    return originalData.map(record => {
      // Add noise to age (more sensitive)
      const noiseAge = Math.floor(Math.random() * noiseFactor * 2) - noiseFactor;
      let noisyAge = record.age + noiseAge;
      noisyAge = Math.max(18, Math.min(90, noisyAge)); // Keeping age in reasonable bounds
      
      // General age category (less sensitive)
      const ageCategory = noisyAge < 30 ? 'Young Adult' : noisyAge < 50 ? 'Middle-aged' : 'Senior';
      
      // Return modified record with varying levels of detail
      return {
        id: record.id,
        age: privacyBudget > 0.6 ? noisyAge : ageCategory,
        condition: privacyBudget > 0.8 ? record.condition : record.condition.charAt(0) + '...',
        treatment: privacyBudget > 0.7 ? record.treatment : 'Redacted'
      };
    });
  };
  
  const noisyData = generateNoisyData();
  
  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold mb-6 text-center">Differential Privacy Demo</h3>
      
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Privacy Budget (ε): {privacyBudget.toFixed(1)}
          </label>
          <div className="flex items-center">
            <span className="mr-2 text-sm">More Private</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={privacyBudget}
              onChange={(e) => setPrivacyBudget(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-2 text-sm">More Accurate</span>
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span>High Noise</span>
            <span>Low Noise</span>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setShowOriginalData(!showOriginalData)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showOriginalData 
                ? 'bg-red-500 text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {showOriginalData ? 'Hide Original Data' : 'Show Original Data'}
          </button>
          
          <button
            onClick={() => setPrivacyBudget(Math.random().toFixed(1))}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Randomize Noise
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Data Table */}
          <div className={`bg-slate-100 dark:bg-slate-800 rounded-lg p-4 transition-opacity duration-300 ${
            showOriginalData ? 'opacity-100' : 'opacity-30'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Original Patient Data</h4>
              {!showOriginalData && (
                <div className="flex items-center text-red-500 text-sm">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  <span>Protected</span>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 dark:bg-slate-700">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Age</th>
                    <th className="px-4 py-2 text-left">Condition</th>
                    <th className="px-4 py-2 text-left">Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {originalData.map(record => (
                    <tr key={record.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-4 py-2">{record.id}</td>
                      <td className="px-4 py-2">{record.age}</td>
                      <td className="px-4 py-2">{record.condition}</td>
                      <td className="px-4 py-2">{record.treatment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Noisy Data Table */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Privacy-Protected Data</h4>
              <div className="flex items-center text-green-500 text-sm">
                <ShieldCheck className="h-4 w-4 mr-1" />
                <span>ε = {privacyBudget.toFixed(1)}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 dark:bg-slate-700">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Age</th>
                    <th className="px-4 py-2 text-left">Condition</th>
                    <th className="px-4 py-2 text-left">Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {noisyData.map(record => (
                    <tr key={record.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-4 py-2">{record.id}</td>
                      <td className="px-4 py-2">{record.age}</td>
                      <td className="px-4 py-2">{record.condition}</td>
                      <td className="px-4 py-2">{record.treatment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2">About Differential Privacy</h4>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
            Differential privacy adds carefully calibrated noise to data to protect individual privacy while 
            maintaining the statistical utility of the dataset. The privacy budget (ε) controls the tradeoff 
            between privacy and accuracy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-base font-medium mb-1">Small ε (0.1-0.3)</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Strong privacy protection but lower accuracy. Good for highly sensitive data like HIV status.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-base font-medium mb-1">Medium ε (0.4-0.7)</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Balanced privacy and utility. Suitable for medical research or census data.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-base font-medium mb-1">Large ε (0.8-1.0)</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Higher accuracy but weaker privacy. May be acceptable for less sensitive data.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
              </div>
              <div>
                <h5 className="text-base font-medium mb-1">Key Insight</h5>
                <p className="text-slate-700 dark:text-slate-300 text-sm">
                  Even with differential privacy, aggregated insights remain valuable for research and analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentialPrivacyDemo;