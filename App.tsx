import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BrandDNA from './components/BrandDNA';
import AssetDrive from './components/AssetDrive';
import StrategyFlow from './components/StrategyFlow';
import ContentCalendar from './components/ContentCalendar';
import VideoStudio from './components/VideoStudio';
import Settings from './components/Settings';
import { TECHFLOW_DATA, DEFAULT_SETTINGS } from './constants';
import { Menu } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // In a real app, this would be in a ContextProvider or Redux/Zustand store
  const [brandData] = useState(TECHFLOW_DATA);

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard data={brandData} />;
      case 'brand-dna': return <BrandDNA data={brandData} />;
      case 'strategy': return <StrategyFlow />;
      case 'assets': return <AssetDrive assets={brandData.assets} />;
      case 'videostudio': return <VideoStudio projects={brandData.videoProjects || []} />;
      case 'calendar': return <ContentCalendar data={brandData} />;
      case 'settings': return <Settings initialSettings={DEFAULT_SETTINGS} />;
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
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar 
          currentView={currentView} 
          onChangeView={setCurrentView} 
          isMobileOpen={isMobileNavOpen}
          setIsMobileOpen={setIsMobileNavOpen}
      />
      
      <main className="flex-1 lg:ml-64 flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <span className="font-bold text-slate-900">TechFlow</span>
            </div>
            <button onClick={() => setIsMobileNavOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-md">
                <Menu className="w-6 h-6" />
            </button>
        </div>

        {/* Main Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                 {renderView()}
            </div>
        </div>
      </main>
    </div>
  );
}