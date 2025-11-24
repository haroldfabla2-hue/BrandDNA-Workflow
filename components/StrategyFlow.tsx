import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Circle, Bot, Loader2 } from 'lucide-react';
import { generateStrategicInsight } from '../services/geminiService';

const StrategyFlow: React.FC = () => {
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Brand Audit', status: 'completed', desc: 'Analyzed 47 existing assets.' },
    { id: 2, title: 'Strategy Definition', status: 'completed', desc: 'TechFlow positioning locked.' },
    { id: 3, title: 'Content Ideation', status: 'current', desc: 'Generating Q3 topics.' },
    { id: 4, title: 'Creation & Approval', status: 'pending', desc: 'Drafting selected items.' },
    { id: 5, title: 'Publishing & Analytics', status: 'pending', desc: 'Scheduled distribution.' },
  ];

  const handleAiGenerate = async () => {
      if(!aiInput) return;
      setLoading(true);
      const result = await generateStrategicInsight(aiInput, "Targeting CTO Chris (Persona) about Reducing Technical Debt");
      setAiOutput(result);
      setLoading(false);
  }

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Strategy Workflow</h2>
        <p className="text-slate-500">Current production cycle status.</p>
      </header>

      {/* Workflow Visual */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between relative">
           {/* Connecting Line */}
           <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
           
           {steps.map((step) => (
             <div key={step.id} className="flex flex-col items-center bg-white px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 transition-colors ${
                    step.status === 'completed' ? 'bg-green-50 border-green-500 text-green-600' :
                    step.status === 'current' ? 'bg-indigo-50 border-indigo-600 text-indigo-600 ring-4 ring-indigo-50' :
                    'bg-white border-slate-200 text-slate-300'
                }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                     step.status === 'current' ? <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse" /> : 
                     <Circle className="w-5 h-5" />}
                </div>
                <h4 className={`text-sm font-bold ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
             </div>
           ))}
        </div>
      </div>

      {/* AI Assistant Section for "Content Ideation" (Current Step) */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
                <Bot className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">AI Strategy Assistant</h3>
            </div>
            <p className="text-indigo-200 mb-6">Need ideas for the "Content Ideation" phase? Ask me to generate topics based on our SWOT analysis and Personas.</p>
            
            <div className="space-y-4">
                <div className="flex space-x-2">
                    <input 
                        type="text" 
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        placeholder="e.g., Blog post ideas for CTO Chris about AI security..." 
                        className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <button 
                        onClick={handleAiGenerate}
                        disabled={loading}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors flex items-center disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                    </button>
                </div>
                
                {aiOutput && (
                    <div className="bg-slate-800/80 rounded-lg p-6 border border-slate-700 animate-fade-in mt-4">
                        <h5 className="text-xs font-bold text-cyan-400 uppercase mb-2">Generated Insight</h5>
                        <p className="text-slate-300 leading-relaxed">{aiOutput}</p>
                        <div className="mt-4 flex space-x-3">
                            <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-white transition-colors">Add to Calendar</button>
                            <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-white transition-colors">Save as Draft</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyFlow;
