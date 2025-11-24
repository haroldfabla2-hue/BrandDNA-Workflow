import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BrandDNA from './components/BrandDNA';
import AssetDrive from './components/AssetDrive';
import StrategyFlow from './components/StrategyFlow';
import ContentCalendar from './components/ContentCalendar';
import { TECHFLOW_DATA } from './constants';
import { AssetStatus } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  
  // In a real app, this would be in a ContextProvider or Redux/Zustand store
  const [brandData] = useState(TECHFLOW_DATA);

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard data={brandData} />;
      case 'brand-dna': return <BrandDNA data={brandData} />;
      case 'strategy': return <StrategyFlow />;
      case 'assets': return <AssetDrive assets={brandData.assets} />;
      case 'calendar': return <ContentCalendar data={brandData} />;
      case 'analytics': 
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <div className="p-4 bg-yellow-50 rounded-full mb-4">
                     <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Advanced Analytics Module</h3>
                <p className="text-slate-500 mt-2">Detailed reporting for the 94% Brand Health Score is generating...</p>
            </div>
        );
      default: return <Dashboard data={brandData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
             {renderView()}
        </div>
      </main>
    </div>
  );
}
