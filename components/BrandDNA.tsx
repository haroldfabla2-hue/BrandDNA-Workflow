import React, { useState } from 'react';
import { BrandData, SwotItem, Persona } from '../types';
import { Target, Users, Shield, Swords, BrainCircuit } from 'lucide-react';

interface BrandDNAProps {
  data: BrandData;
}

const BrandDNA: React.FC<BrandDNAProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'positioning' | 'swot' | 'personas' | 'competitors'>('positioning');

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Brand DNA</h2>
          <p className="text-slate-500">The strategic core of TechFlow Solutions.</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('positioning')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'positioning' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Positioning
          </button>
          <button 
            onClick={() => setActiveTab('swot')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'swot' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            SWOT
          </button>
          <button 
            onClick={() => setActiveTab('personas')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'personas' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Personas
          </button>
          <button 
            onClick={() => setActiveTab('competitors')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'competitors' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Competitors
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[600px] p-6">
        
        {activeTab === 'positioning' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-10">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                <BrainCircuit className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">Brand Positioning Statement</h3>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                "{data.positioning}"
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Primary Value Proposition</h4>
                <p className="text-slate-600">Reducing deployment friction by 40% through AI-driven conflict resolution.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Core Differentiator</h4>
                <p className="text-slate-600">The only platform that acts as a unified central nervous system for hybrid (On-prem + Cloud) environments.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'swot' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {(['Strengths', 'Weaknesses', 'Opportunities', 'Threats'] as const).map(category => (
              <div key={category} className={`p-6 rounded-xl border ${
                category === 'Strengths' ? 'bg-green-50 border-green-200' :
                category === 'Weaknesses' ? 'bg-orange-50 border-orange-200' :
                category === 'Opportunities' ? 'bg-blue-50 border-blue-200' :
                'bg-red-50 border-red-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 flex items-center ${
                  category === 'Strengths' ? 'text-green-800' :
                  category === 'Weaknesses' ? 'text-orange-800' :
                  category === 'Opportunities' ? 'text-blue-800' :
                  'text-red-800'
                }`}>
                  {category === 'Strengths' && <Shield className="w-5 h-5 mr-2" />}
                  {category === 'Threats' && <Swords className="w-5 h-5 mr-2" />}
                  {category}
                </h3>
                <ul className="space-y-3">
                  {data.swot.filter(s => s.category === category).map(item => (
                    <li key={item.id} className="flex items-start">
                      <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                      <span className="text-sm font-medium text-slate-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'personas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.personas.map(persona => (
              <div key={persona.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center space-x-3">
                  <img src={persona.avatarUrl} alt={persona.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white" />
                  <div>
                    <h3 className="font-bold text-slate-900">{persona.name}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{persona.role}</p>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Pain Points</p>
                    <ul className="list-disc list-inside text-sm text-slate-600">
                      {persona.painPoints.slice(0,2).map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Goals</p>
                    <ul className="list-disc list-inside text-sm text-slate-600">
                      {persona.goals.slice(0,2).map((g, i) => <li key={i}>{g}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'competitors' && (
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-slate-200">
                   <th className="py-4 px-4 text-sm font-semibold text-slate-900 bg-slate-50">Competitor</th>
                   <th className="py-4 px-4 text-sm font-semibold text-slate-900 bg-slate-50">Market Overlap</th>
                   <th className="py-4 px-4 text-sm font-semibold text-slate-900 bg-slate-50">Key Strength</th>
                   <th className="py-4 px-4 text-sm font-semibold text-slate-900 bg-slate-50">Key Weakness</th>
                 </tr>
               </thead>
               <tbody>
                 {data.competitors.map((comp, idx) => (
                   <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                     <td className="py-4 px-4 font-medium text-slate-900">{comp.name}</td>
                     <td className="py-4 px-4">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                         comp.overlap === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                       }`}>
                         {comp.overlap}
                       </span>
                     </td>
                     <td className="py-4 px-4 text-sm text-slate-600">{comp.strength}</td>
                     <td className="py-4 px-4 text-sm text-slate-600">{comp.weakness}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        )}
      </div>
    </div>
  );
};

export default BrandDNA;
