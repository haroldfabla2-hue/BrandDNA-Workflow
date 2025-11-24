import React from 'react';
import { LayoutDashboard, Target, FolderOpen, Calendar, PieChart, Layers, Settings, LogOut, Hexagon, Film, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isMobileOpen = false, setIsMobileOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'brand-dna', label: 'Brand DNA', icon: Hexagon },
    { id: 'strategy', label: 'Strategy Flow', icon: Target },
    { id: 'assets', label: 'Assets & Drive', icon: FolderOpen },
    { id: 'videostudio', label: 'Video Studio', icon: Film }, // New Item
    { id: 'calendar', label: 'Content Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  const handleNavClick = (viewId: string) => {
    onChangeView(viewId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-white shadow-xl">
      <div className="p-6 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
                <h1 className="text-lg font-bold tracking-tight">TechFlow</h1>
                <p className="text-xs text-slate-400">Brand AI Pro v3</p>
            </div>
        </div>
        {setIsMobileOpen && (
             <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                 <X className="w-6 h-6" />
             </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-200 ${
              currentView === item.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
            onClick={() => handleNavClick('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-2 transition-colors ${
                currentView === 'settings' ? 'text-white bg-slate-800 rounded' : 'text-slate-400 hover:text-white'
            }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-2 mt-2 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 flex-col h-screen fixed left-0 top-0 z-50">
         <SidebarContent />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <div className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileOpen && setIsMobileOpen(false)}></div>
         <div className="relative w-64 h-full">
            <SidebarContent />
         </div>
      </div>
    </>
  );
};

export default Sidebar;