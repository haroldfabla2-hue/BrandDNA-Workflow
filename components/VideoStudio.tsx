import React, { useState } from 'react';
import { VideoProject, VideoScene, AssetStatus } from '../types';
import { Play, Pause, Save, Share2, Upload, Wand2, Plus, Film, Clock, Layout, FileAudio, Trash2, GripVertical, ChevronRight } from 'lucide-react';
import { generateVideoSegment, generateVoiceover } from '../services/geminiService';

interface VideoStudioProps {
  projects: VideoProject[];
}

const VideoStudio: React.FC<VideoStudioProps> = ({ projects }) => {
  const [activeProject, setActiveProject] = useState<VideoProject>(projects[0]);
  const [selectedSceneId, setSelectedSceneId] = useState<string>(projects[0].scenes[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedScene = activeProject.scenes.find(s => s.id === selectedSceneId);

  const handleGenerateVideo = async () => {
    if (!selectedScene) return;
    setIsGenerating(true);
    
    // Simulate API call to Veo 3.1
    await generateVideoSegment(selectedScene.visualPrompt, activeProject.aspectRatio);
    
    setIsGenerating(false);
    // In a real app, we'd update the scene status and videoUrl here
    alert(`Veo Generation Complete for scene: ${selectedScene.name}`);
  };

  const handleGenerateVoice = async () => {
    if (!selectedScene) return;
    await generateVoiceover(selectedScene.voiceScript);
    alert(`Audio Generated for: ${selectedScene.name}`);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col space-y-4">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
           <div className="flex items-center space-x-2">
               <div className="p-2 bg-red-100 rounded-lg text-red-600">
                   <Film className="w-5 h-5" />
               </div>
               <div>
                   <h2 className="text-xl font-bold text-slate-900">{activeProject.title}</h2>
                   <p className="text-xs text-slate-500">
                       {activeProject.resolution} • {activeProject.aspectRatio} • {Math.floor(activeProject.totalDuration/60)}m {activeProject.totalDuration%60}s
                   </p>
               </div>
           </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
             <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 flex items-center">
                 {activeProject.status}
             </span>
             <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-slate-700 text-sm hover:bg-slate-50">
                 <Save className="w-4 h-4" />
                 <span>Save</span>
             </button>
             <button className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 shadow-sm">
                 <Share2 className="w-4 h-4" />
                 <span>Export</span>
             </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
         {/* Scene Manager Sidebar */}
         <div className="w-full lg:w-80 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-1/2 lg:h-full">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
                <h3 className="font-bold text-slate-700 text-sm uppercase">Scenes ({activeProject.scenes.length})</h3>
                <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {activeProject.scenes.map((scene, index) => (
                    <div 
                        key={scene.id}
                        onClick={() => setSelectedSceneId(scene.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start space-x-3 group ${
                            selectedSceneId === scene.id ? 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-200' : 'bg-white border-slate-200 hover:border-indigo-200'
                        }`}
                    >
                        <div className="mt-1 text-slate-300 cursor-move">
                            <GripVertical className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-slate-500">Scene {index + 1}</span>
                                <span className="text-[10px] bg-slate-100 px-1.5 rounded text-slate-500 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" /> {scene.duration}s
                                </span>
                            </div>
                            <h4 className={`text-sm font-semibold truncate ${selectedSceneId === scene.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                                {scene.name}
                            </h4>
                            <div className="mt-2 flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${
                                    scene.status === 'ready' ? 'bg-green-500' : 
                                    scene.status === 'generating' ? 'bg-yellow-500 animate-pulse' : 'bg-slate-300'
                                }`} />
                                <span className="text-xs text-slate-400 capitalize">{scene.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Main Workspace */}
         <div className="flex-1 flex flex-col gap-4 h-full">
             
             {/* Preview Window */}
             <div className="flex-1 bg-black rounded-xl overflow-hidden relative group flex items-center justify-center border border-slate-800 shadow-lg">
                  {/* Mock Video Player */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none"></div>
                  
                  {selectedScene?.status === 'ready' || selectedScene?.status === 'generating' ? (
                      <div className="text-center">
                         {selectedScene.status === 'generating' ? (
                             <div className="flex flex-col items-center animate-pulse">
                                 <Wand2 className="w-12 h-12 text-indigo-400 mb-4" />
                                 <p className="text-indigo-200 font-medium">Veo is dreaming up your video...</p>
                             </div>
                         ) : (
                             <div className="relative w-full h-full flex items-center justify-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1629904853716-64f95ef1b418?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Preview" 
                                    className="max-h-full max-w-full object-contain opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button 
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all text-white border border-white/50"
                                    >
                                        {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                                    </button>
                                </div>
                             </div>
                         )}
                      </div>
                  ) : (
                      <div className="text-center text-slate-500">
                          <Film className="w-16 h-16 mx-auto mb-4 opacity-20" />
                          <p>Scene Empty. Configure below.</p>
                      </div>
                  )}

                  {/* Overlay Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex justify-between items-end">
                      <div className="text-white">
                          <h3 className="font-bold">{selectedScene?.name}</h3>
                          <p className="text-xs text-slate-300 line-clamp-1">{selectedScene?.description}</p>
                      </div>
                      <div className="text-white font-mono text-sm bg-black/50 px-2 py-1 rounded">
                          00:15 / 02:30
                      </div>
                  </div>
             </div>

             {/* Scene Editor / Properties */}
             <div className="h-1/3 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-6 overflow-y-auto">
                 <div className="flex-1 space-y-4">
                     <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Visual Prompt (Gemini Veo)</label>
                         <textarea 
                             className="w-full text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                             rows={3}
                             defaultValue={selectedScene?.visualPrompt}
                         ></textarea>
                         <div className="mt-2 flex justify-between">
                            <span className="text-[10px] text-slate-400">Model: veo-3.1-fast-generate-preview</span>
                            <button 
                                onClick={handleGenerateVideo}
                                disabled={isGenerating}
                                className="text-xs flex items-center bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 disabled:opacity-50"
                            >
                                <Wand2 className="w-3 h-3 mr-1" /> Generate Video
                            </button>
                         </div>
                     </div>
                 </div>

                 <div className="w-px bg-slate-200 hidden md:block"></div>

                 <div className="flex-1 space-y-4">
                    <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Voiceover Script (TTS)</label>
                         <textarea 
                             className="w-full text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                             rows={3}
                             defaultValue={selectedScene?.voiceScript}
                         ></textarea>
                         <div className="mt-2 flex justify-between">
                            <span className="text-[10px] text-slate-400">Voice: Kore (Google TTS)</span>
                            <button 
                                onClick={handleGenerateVoice}
                                className="text-xs flex items-center bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-700"
                            >
                                <FileAudio className="w-3 h-3 mr-1" /> Generate Audio
                            </button>
                         </div>
                     </div>
                 </div>
                 
                 <div className="w-px bg-slate-200 hidden md:block"></div>

                 <div className="w-full md:w-48 space-y-4">
                     <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Transition</label>
                         <select className="w-full text-sm border-slate-300 rounded-md p-1.5 border" defaultValue={selectedScene?.transition}>
                             <option>None</option>
                             <option>Fade</option>
                             <option>Slide</option>
                             <option>Zoom</option>
                             <option>Bounce</option>
                         </select>
                     </div>
                     <div>
                         <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Duration</label>
                         <div className="flex items-center space-x-2">
                             <input type="number" className="w-full text-sm border-slate-300 rounded-md p-1.5 border" defaultValue={selectedScene?.duration} />
                             <span className="text-xs text-slate-500">sec</span>
                         </div>
                     </div>
                     <button className="w-full text-red-500 text-xs border border-red-200 bg-red-50 py-1.5 rounded hover:bg-red-100 flex items-center justify-center">
                         <Trash2 className="w-3 h-3 mr-1" /> Delete Scene
                     </button>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default VideoStudio;