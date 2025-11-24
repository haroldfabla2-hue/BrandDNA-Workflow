import React from 'react';
import { BrandData } from '../types';
import { TrendingUp, Users, FileText, Activity, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  data: BrandData;
}

const mockChartData = [
  { name: 'Week 1', engagement: 6.5, posts: 2 },
  { name: 'Week 2', engagement: 7.2, posts: 3 },
  { name: 'Week 3', engagement: 8.3, posts: 3 },
  { name: 'Week 4', engagement: 7.8, posts: 2 },
  { name: 'Week 5', engagement: 8.9, posts: 4 },
];

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500">Real-time brand performance metrics for TechFlow Solutions.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Brand Health Score</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{data.metrics.brandHealthScore}</h3>
            </div>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 font-medium flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +2.4% vs last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Engagement</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{data.metrics.avgEngagement}</h3>
            </div>
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 font-medium flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +1.1% vs B2B Benchmark
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Assets</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{data.metrics.totalAssets}</h3>
            </div>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            12 published this month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Review</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">3</h3>
            </div>
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2 font-medium">
            Action required
          </p>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Engagement Trend (Last 30 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                    itemStyle={{color: '#1e293b'}}
                />
                <Area type="monotone" dataKey="engagement" stroke="#4f46e5" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Asset Distribution</h3>
          <div className="space-y-4">
            {data.pillars.slice(0, 5).map(pillar => {
              const count = data.assets.filter(a => a.pillarId === pillar.id).length;
              const percentage = (count / data.assets.length) * 100;
              return (
                <div key={pillar.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{pillar.name}</span>
                    <span className="text-slate-500">{Math.round(percentage)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ width: `${percentage}%`, backgroundColor: pillar.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
