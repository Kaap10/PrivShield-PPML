import { useState, useEffect } from 'react';
import { Lock, Unlock, Check } from 'lucide-react';

const HomomorphicEncryptionDemo = () => {
  const [inputNumber, setInputNumber] = useState(5);
  const [operation, setOperation] = useState<'add' | 'multiply'>('add');
  const [operationValue, setOperationValue] = useState(3);
  const [showResult, setShowResult] = useState(false);
  
  // Reset animation state when input changes
  useEffect(() => {
    setShowResult(false);
    const timer = setTimeout(() => setShowResult(true), 500);
    return () => clearTimeout(timer);
  }, [inputNumber, operation, operationValue]);

  const encryptedValue = `0x${Math.random().toString(16).substring(2, 10)}...`;
  
  let expectedResult = 0;
  if (operation === 'add') {
    expectedResult = inputNumber + operationValue;
  } else {
    expectedResult = inputNumber * operationValue;
  }

  return (
    <div className="py-4">
      <h3 className="text-xl font-semibold mb-6 text-center">Homomorphic Encryption Demo</h3>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-4 items-center">
            {/* Input Data */}
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <div className="text-slate-300 mb-2">Original Data</div>
              <div className="flex justify-center items-center">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(parseInt(e.target.value) || 0)}
                  className="w-16 p-2 bg-slate-700 text-white rounded-md text-center"
                />
              </div>
            </div>
            
            {/* Encryption Process */}
            <div className="text-center flex flex-col items-center">
              <div className="bg-blue-500/30 p-2 rounded-full mb-2">
                <Lock className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-slate-300 text-sm">Encrypt</div>
              <div className="h-10 w-0.5 bg-blue-500/50 my-1"></div>
              <div className="text-blue-400 text-xs font-mono py-1 px-2 bg-blue-900/30 rounded">{encryptedValue}</div>
            </div>
            
            {/* Operation Selection */}
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="text-slate-300 mb-2 text-center">Operation</div>
              <div className="flex justify-center mb-3">
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as 'add' | 'multiply')}
                  className="bg-slate-700 text-white rounded-md p-2"
                >
                  <option value="add">Addition (+)</option>
                  <option value="multiply">Multiplication (×)</option>
                </select>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-white mr-2">{operation === 'add' ? '+' : '×'}</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={operationValue}
                  onChange={(e) => setOperationValue(parseInt(e.target.value) || 0)}
                  className="w-16 p-2 bg-slate-700 text-white rounded-md text-center"
                />
              </div>
            </div>
          </div>
          
          {/* Result Flow */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Encrypted Result */}
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <div className="text-slate-300 mb-2">Encrypted Result</div>
              <div className="text-blue-400 text-xs font-mono py-1 px-2 bg-blue-900/30 rounded">
                {`0x${Math.random().toString(16).substring(2, 10)}...`}
              </div>
            </div>
            
            {/* Decryption Process */}
            <div className="text-center flex flex-col items-center">
              <div className="bg-green-500/30 p-2 rounded-full mb-2">
                <Unlock className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-slate-300 text-sm">Decrypt</div>
              <div className="h-10 w-0.5 bg-green-500/50 my-1"></div>
              <div className={`flex items-center justify-center h-8 transition-opacity duration-500 ${showResult ? 'opacity-100' : 'opacity-0'}`}>
                <Check className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-green-400">Verified</span>
              </div>
            </div>
            
            {/* Decrypted Result */}
            <div className="bg-slate-800 p-4 rounded-lg text-center">
              <div className="text-slate-300 mb-2">Decrypted Result</div>
              <div className={`text-2xl font-bold text-white transition-opacity duration-500 ${showResult ? 'opacity-100' : 'opacity-0'}`}>
                {expectedResult}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2">How It Works</h4>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            Homomorphic encryption allows computations to be performed on encrypted data without decrypting it first. 
            The result, when decrypted, matches the result of the same operations performed on the plaintext. 
            This enables secure processing of sensitive data in untrusted environments.
          </p>
          <div className="mt-4 flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h5 className="text-base font-medium mb-1">Key Application</h5>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                Process medical records or financial data in the cloud without exposing sensitive information to service providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomomorphicEncryptionDemo;