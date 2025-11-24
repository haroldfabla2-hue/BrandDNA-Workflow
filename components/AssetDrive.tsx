import React, { useState } from 'react';
import { FOLDER_STRUCTURE, TECHFLOW_DATA } from '../constants';
import { Asset, Folder, AssetStatus, AssetType } from '../types';
import { Folder as FolderIcon, FileText, Image, Video, ChevronRight, ChevronDown, MoreVertical, ExternalLink } from 'lucide-react';

interface AssetDriveProps {
    assets: Asset[];
}

const AssetDrive: React.FC<AssetDriveProps> = ({ assets }) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>('f5'); // Default to Assets
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['f5']));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const FolderItem: React.FC<{ folder: Folder; level: number }> = ({ folder, level }) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = selectedFolderId === folder.id;
    const hasChildren = folder.children.length > 0;

    return (
      <div>
        <div 
          onClick={() => {
            setSelectedFolderId(folder.id);
            if (hasChildren) toggleFolder(folder.id);
          }}
          className={`flex items-center px-3 py-2 cursor-pointer transition-colors text-sm rounded-md ${
            isSelected ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          <span className="mr-2 text-slate-400">
            {hasChildren ? (
                isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : <div className="w-4" />}
          </span>
          <FolderIcon className={`w-4 h-4 mr-2 ${isSelected ? 'fill-indigo-200 text-indigo-600' : 'fill-slate-100 text-slate-400'}`} />
          <span className="truncate">{folder.name}</span>
        </div>
        {isExpanded && hasChildren && (
          <div>
            {folder.children.map(child => (
              <FolderItem key={child.id} folder={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Helper to find selected folder object and path
  const findFolderById = (folders: Folder[], id: string): Folder | null => {
    for (const f of folders) {
      if (f.id === id) return f;
      if (f.children) {
        const found = findFolderById(f.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeFolder = findFolderById(FOLDER_STRUCTURE, selectedFolderId);
  
  // Filter assets that belong to this folder path (naive partial match for demo)
  const folderAssets = assets.filter(a => a.folderPath.includes(activeFolder?.name || 'nomatch'));
  
  // Also show "Files" defined in folder structure (the simulated PDFs/Docs)
  const staticFiles = activeFolder?.children.filter(c => c.children.length === 0 && (c.name.endsWith('.pdf') || c.name.endsWith('.docx') || c.name.endsWith('.xlsx') || c.name.endsWith('.csv') || c.name.endsWith('.json'))) || [];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <header className="mb-6">
         <h2 className="text-2xl font-bold text-slate-900">Asset Library</h2>
         <p className="text-slate-500">Centralized Google Drive repository for TechFlow Solutions.</p>
      </header>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex overflow-hidden">
        {/* Sidebar Tree */}
        <div className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col">
           <div className="p-4 border-b border-slate-200">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drive Folders</h3>
           </div>
           <div className="flex-1 overflow-y-auto py-2">
             {FOLDER_STRUCTURE.map(folder => (
               <FolderItem key={folder.id} folder={folder} level={0} />
             ))}
           </div>
        </div>

        {/* File Grid */}
        <div className="flex-1 flex flex-col">
           <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
             <div className="flex items-center text-sm text-slate-500">
               <span className="font-medium text-slate-900">{activeFolder?.name}</span>
               <span className="mx-2">/</span>
               <span>{folderAssets.length + staticFiles.length} items</span>
             </div>
             <div className="flex space-x-2">
                 <button className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors">
                     + New Asset
                 </button>
             </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                
                {/* Render Static Files (simulated) */}
                {staticFiles.map(file => (
                  <div key={file.id} className="group bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                            <FileText className="w-5 h-5" />
                        </div>
                        <button className="text-slate-300 hover:text-slate-600">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                    <h4 className="text-sm font-medium text-slate-900 truncate mb-1">{file.name}</h4>
                    <p className="text-xs text-slate-500">Simulated File</p>
                  </div>
                ))}

                {/* Render Assets */}
                {folderAssets.map(asset => (
                  <div key={asset.id} className="group bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer relative">
                    <div className="flex justify-between items-start mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            asset.type === AssetType.VIDEO ? 'bg-red-50 text-red-500' :
                            asset.type === AssetType.IMAGE ? 'bg-purple-50 text-purple-500' :
                            'bg-blue-50 text-blue-500'
                        }`}>
                            {asset.type === AssetType.VIDEO ? <Video className="w-5 h-5" /> : 
                             asset.type === AssetType.IMAGE ? <Image className="w-5 h-5" /> : 
                             <FileText className="w-5 h-5" />}
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                            asset.status === AssetStatus.PUBLISHED ? 'bg-green-50 text-green-700 border-green-200' :
                            asset.status === AssetStatus.REVIEW ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                            {asset.status}
                        </div>
                    </div>
                    <h4 className="text-sm font-medium text-slate-900 line-clamp-2 mb-2 h-10">{asset.title}</h4>
                    <div className="flex justify-between items-end">
                        <div>
                             <p className="text-xs text-slate-400">Modified {asset.lastModified}</p>
                             {asset.metrics && (
                                 <p className="text-xs text-green-600 font-medium mt-1">{asset.metrics.views.toLocaleString()} views</p>
                             )}
                        </div>
                        {asset.linkedAssets.length > 0 && (
                            <div className="flex -space-x-2">
                                {asset.linkedAssets.map((l, i) => (
                                    <div key={i} className="w-5 h-5 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[8px] text-slate-600" title="Linked Asset">
                                        L
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                  </div>
                ))}
                
                {folderAssets.length === 0 && staticFiles.length === 0 && (
                   <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400">
                      <FolderIcon className="w-12 h-12 mb-3 text-slate-200" />
                      <p>This folder is empty.</p>
                   </div>
                )}

             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDrive;
