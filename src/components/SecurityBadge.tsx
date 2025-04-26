import { Shield, CheckCircle } from 'lucide-react';

const SecurityBadge = () => {
  return (
    <div className="bg-white dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-20 -mb-20"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-4 bg-gradient-to-br from-teal-500 to-blue-500 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Privacy-First Architecture</h3>
                <p className="text-slate-600 dark:text-slate-400">Our platform is built with privacy as the foundation</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {[
                { text: "GDPR Compliant", icon: <CheckCircle className="h-4 w-4 mr-1 text-teal-500" /> },
                { text: "SOC 2", icon: <CheckCircle className="h-4 w-4 mr-1 text-teal-500" /> },
                { text: "HIPAA Ready", icon: <CheckCircle className="h-4 w-4 mr-1 text-teal-500" /> }
              ].map((badge, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-white dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadge;