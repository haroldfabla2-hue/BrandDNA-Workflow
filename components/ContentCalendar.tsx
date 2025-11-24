import React from 'react';
import { BrandData } from '../types';

interface ContentCalendarProps {
  data: BrandData;
}

const ContentCalendar: React.FC<ContentCalendarProps> = ({ data }) => {
  // Simplified grid for visual impact
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDay = (day: number) => {
    // Mock mapping for demo - maps day number to events in the first month
    // In a real app, strict date matching would be used.
    // Mapping our real data loosely to days in June.
    const dateStr = `2024-06-${day.toString().padStart(2, '0')}`;
    return data.calendar.filter(e => e.date === dateStr);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Content Calendar</h2>
           <p className="text-slate-500">June 2024 • Q3 Production Plan</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-indigo-700">
            Export Schedule
        </button>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-200">
           {weekDays.map(d => (
             <div key={d} className="py-3 text-center text-sm font-semibold text-slate-600 bg-slate-50 border-r border-slate-100 last:border-0">
               {d}
             </div>
           ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-fr">
           {/* Empty cells for start of month offset (e.g., Starts on Saturday) */}
           <div className="h-32 border-b border-r border-slate-100 bg-slate-50/30"></div>
           <div className="h-32 border-b border-r border-slate-100 bg-slate-50/30"></div>
           <div className="h-32 border-b border-r border-slate-100 bg-slate-50/30"></div>
           <div className="h-32 border-b border-r border-slate-100 bg-slate-50/30"></div>
           <div className="h-32 border-b border-r border-slate-100 bg-slate-50/30"></div>
           <div className="h-32 border-b border-r border-slate-100 bg-slate-50/30"></div>

           {days.map(day => {
             const events = getEventsForDay(day);
             return (
               <div key={day} className="h-32 border-b border-r border-slate-100 p-2 relative hover:bg-slate-50 transition-colors group">
                 <span className="text-xs font-semibold text-slate-400 mb-1 block">{day}</span>
                 <div className="space-y-1">
                   {events.map(ev => {
                      const asset = data.assets.find(a => a.id === ev.assetId);
                      return (
                        <div key={ev.id} className="text-[10px] p-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 truncate cursor-pointer hover:bg-indigo-100">
                            <span className="font-bold mr-1">[{ev.channel}]</span>
                            {asset?.title}
                        </div>
                      );
                   })}
                 </div>
                 {/* Add button on hover */}
                 <button className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-indigo-600 text-white items-center justify-center hidden group-hover:flex text-sm opacity-0 group-hover:opacity-100 transition-all">
                    +
                 </button>
               </div>
             )
           })}
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
