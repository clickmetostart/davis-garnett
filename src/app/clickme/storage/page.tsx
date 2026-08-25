"use client";

import React, { useState } from 'react';
import { 
  Folder, File, UploadCloud, FolderPlus, 
  MoreVertical, Search, FileText, Image as ImageIcon, 
  FileArchive, ShieldCheck, ChevronRight
} from 'lucide-react';

// Mock Data
const INITIAL_FOLDERS = [
  { id: '1', name: 'Blank Offer Forms', itemCount: 12, updatedAt: '2 hours ago' },
  { id: '2', name: 'Listing Agreements', itemCount: 5, updatedAt: '1 day ago' },
  { id: '3', name: 'Marketing PDFs', itemCount: 24, updatedAt: '3 days ago' },
  { id: '4', name: 'HOA Documents', itemCount: 8, updatedAt: '1 week ago' },
  { id: '5', name: 'Inspection Reports', itemCount: 3, updatedAt: '2 weeks ago' },
];

const INITIAL_FILES = [
  { id: 'f1', name: 'Standard_Offer_Contract_2024.pdf', size: '2.4 MB', type: 'pdf', folderId: '1', uploadedAt: 'Yesterday' },
  { id: 'f2', name: 'Commercial_Lease_Template.docx', size: '1.1 MB', type: 'doc', folderId: '1', uploadedAt: '2 days ago' },
  { id: 'f3', name: 'Tampa_Market_Report_Q3.pdf', size: '5.6 MB', type: 'pdf', folderId: '3', uploadedAt: '3 days ago' },
  { id: 'f4', name: 'Property_Disclosure_Form.pdf', size: '840 KB', type: 'pdf', folderId: '1', uploadedAt: '1 week ago' },
  { id: 'f5', name: 'High_Res_Logo_Pack.zip', size: '45 MB', type: 'archive', folderId: '3', uploadedAt: '2 weeks ago' },
  { id: 'f6', name: 'Exclusive_Right_to_Sell.pdf', size: '1.2 MB', type: 'pdf', folderId: '2', uploadedAt: '3 weeks ago' },
];

export default function AssetStorage() {
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);

  const currentFiles = files.filter(f => 
    (activeFolderId ? f.folderId === activeFolderId : true) &&
    (f.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeFolder = folders.find(f => f.id === activeFolderId);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    setFolders([
      ...folders, 
      { id: Date.now().toString(), name: newFolderName, itemCount: 0, updatedAt: 'Just now' }
    ]);
    setNewFolderName('');
    setIsCreatingFolder(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newFiles = Array.from(e.target.files!).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        type: file.type.includes('image') ? 'image' : (file.name.endsWith('.zip') ? 'archive' : 'pdf'),
        folderId: activeFolderId || '1',
        uploadedAt: 'Just now'
      }));
      
      setFiles([...newFiles, ...files]);
      setIsUploading(false);
      
      // Update folder count
      if (activeFolderId) {
        setFolders(folders.map(f => 
          f.id === activeFolderId ? { ...f, itemCount: f.itemCount + newFiles.length } : f
        ));
      }
    }, 1500);
  };

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      case 'doc': return <FileText className="w-8 h-8 text-blue-500" />;
      case 'image': return <ImageIcon className="w-8 h-8 text-green-500" />;
      case 'archive': return <FileArchive className="w-8 h-8 text-yellow-500" />;
      default: return <File className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f9fafb] text-[#111827] h-screen overflow-hidden">
      
      {/* Create Folder Modal */}
      {isCreatingFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 w-[400px] shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Create New Folder</h3>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Folder Name</label>
            <input 
              type="text" 
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none focus:border-blue-500 mb-6"
              placeholder="e.g. Q4 Marketing Materials"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsCreatingFolder(false)} className="px-4 py-2 font-semibold text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleCreateFolder} className="px-6 py-2 font-bold text-white bg-black rounded-lg hover:bg-gray-800">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center p-8 bg-white border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">Asset Storage</h1>
          <p className="text-gray-500 text-sm font-medium">Manage and organize your agency documents and templates.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 outline-none focus:bg-white text-sm"
            />
          </div>
          
          <button onClick={() => setIsCreatingFolder(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm transition-colors">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          
          <div className="relative">
            <label htmlFor="file-upload" className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-colors cursor-pointer ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}>
              <UploadCloud className="w-4 h-4" />
              {isUploading ? 'Uploading...' : 'Upload File'}
            </label>
            <input 
              id="file-upload" 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="px-8 py-4 flex items-center gap-2 text-sm font-semibold text-gray-500 bg-white border-b border-gray-100">
        <button onClick={() => setActiveFolderId(null)} className={`hover:text-black transition-colors ${!activeFolderId ? 'text-black' : ''}`}>My Storage</button>
        {activeFolder && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="text-black">{activeFolder.name}</span>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        
        {/* Folders Section (Only show if not inside a folder, or if searching) */}
        {!activeFolderId && !searchQuery && (
          <div className="mb-10">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider mb-4">Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {folders.map(folder => (
                <button 
                  key={folder.id} 
                  onClick={() => setActiveFolderId(folder.id)}
                  className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Folder className="w-5 h-5 text-blue-600" />
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" />
                  </div>
                  <h3 className="font-bold text-gray-800 truncate mb-1">{folder.name}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{folder.itemCount} files</span>
                    <span>{folder.updatedAt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Files Section */}
        <div>
          <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider mb-4">
            {searchQuery ? 'Search Results' : (activeFolderId ? `Files in ${activeFolder?.name}` : 'Recent Files')}
          </h2>
          
          {currentFiles.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <File className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">No files found</h3>
              <p className="text-gray-500 max-w-sm">
                {searchQuery ? 'Try adjusting your search query.' : 'This folder is empty. Upload a document to get started.'}
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">File Name</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider hidden md:table-cell">Uploaded</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentFiles.map(file => (
                    <tr key={file.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                            {getFileIcon(file.type)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{file.name}</div>
                            {file.type === 'pdf' && (
                              <div className="flex items-center gap-1 text-[0.65rem] font-bold text-green-600 uppercase tracking-wider mt-1">
                                <ShieldCheck className="w-3 h-3" /> Secure Document
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-600">{file.size}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 hidden md:table-cell">{file.uploadedAt}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md">Download</button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
