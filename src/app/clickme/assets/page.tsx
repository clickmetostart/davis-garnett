"use client";

import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Copy, Trash2, Image as ImageIcon, FileText, Check, Folder, FolderPlus, ChevronRight, ArrowLeft, Download, FolderInput, X } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  url: string | null;
  size: number;
  createdAt: string;
  type: string;
  isDirectory: boolean;
}

export default function AssetsLibrary() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [movingAsset, setMovingAsset] = useState<string | null>(null);
  const [moveDestination, setMoveDestination] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const pathParam = currentPath.join('/');
      const res = await fetch(`/api/assets?path=${encodeURIComponent(pathParam)}`);
      const data = await res.json();
      setAssets(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch assets", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [currentPath]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', currentPath.join('/'));

    try {
      const res = await fetch('/api/assets', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        await fetchAssets();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCreateFolder = async () => {
    const folderName = prompt('Enter new folder name:');
    if (!folderName) return;

    try {
      const formData = new FormData();
      formData.append('action', 'createFolder');
      formData.append('folderName', folderName);
      formData.append('path', currentPath.join('/'));

      const res = await fetch('/api/assets', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        await fetchAssets();
      } else {
        alert("Failed to create folder.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const res = await fetch('/api/assets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, path: currentPath.join('/') })
      });
      if (res.ok) {
        await fetchAssets();
      } else {
        alert("Failed to delete.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const executeMove = async () => {
    if (!movingAsset) return;
    try {
      const res = await fetch('/api/assets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          filename: movingAsset, 
          currentPath: currentPath.join('/'),
          newPath: moveDestination
        })
      });
      if (res.ok) {
        setMovingAsset(null);
        setMoveDestination('');
        await fetchAssets();
      } else {
        alert("Failed to move file. Ensure the destination folder exists.");
      }
    } catch (e) {
      console.error(e);
      alert("Error moving file.");
    }
  };

  const copyToClipboard = (url: string | null, id: string) => {
    if (!url) return;
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (url: string | null, name: string) => {
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '--';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const isImage = (type: string) => ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(type.toLowerCase());

  return (
    <div className="p-8">
      {/* Move Modal */}
      {movingAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Move Asset</h2>
              <button onClick={() => setMovingAsset(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">
              Moving <span className="font-semibold text-black">{movingAsset}</span>. Enter the destination folder path relative to the root (e.g., <code>logos</code> or <code>logos/dark</code>). Leave blank to move to root.
            </p>

            <input 
              type="text" 
              value={moveDestination}
              onChange={e => setMoveDestination(e.target.value)}
              placeholder="e.g. properties/luxury"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black focus:ring-1 focus:ring-black mb-6"
            />

            <div className="flex gap-3">
              <button 
                onClick={() => setMovingAsset(null)}
                className="flex-1 py-3 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeMove}
                className="flex-1 py-3 font-semibold text-white bg-black hover:bg-gray-800 rounded-lg transition-colors shadow-lg shadow-black/20"
              >
                Move Asset
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Brand Assets</h1>
          <p className="text-gray-500">Manage your synced public assets for the dashboard.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleCreateFolder}
            className="px-6 py-3 rounded-lg font-bold flex items-center gap-2 border border-gray-300 hover:bg-gray-50 transition-all text-gray-700"
          >
            <FolderPlus className="w-5 h-5" /> New Folder
          </button>
          
          <div className="relative">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              className="hidden" 
              accept="image/*,.pdf,.doc,.docx"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-black/20 transition-all disabled:opacity-50"
            >
              <UploadCloud className="w-5 h-5" />
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-gray-600 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <button 
          onClick={() => setCurrentPath([])}
          className="hover:text-black hover:underline"
        >
          Root
        </button>
        {currentPath.map((folder, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button 
              onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
              className="hover:text-black hover:underline"
            >
              {folder}
            </button>
          </React.Fragment>
        ))}
      </div>

      {isLoading ? (
        <div className="text-gray-500 font-semibold">Loading assets...</div>
      ) : assets.length === 0 && currentPath.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl border-dashed">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700">No assets found</h3>
          <p className="text-gray-500 mt-2">Upload your first brand logo or document above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentPath.length > 0 && (
            <div 
              onClick={() => setCurrentPath(currentPath.slice(0, -1))}
              className="bg-white rounded-xl border border-gray-200 flex items-center justify-center hover:border-black cursor-pointer transition-colors p-8 group flex-col gap-2"
            >
              <ArrowLeft className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" />
              <span className="font-bold text-gray-500 group-hover:text-black transition-colors">Go Back</span>
            </div>
          )}

          {assets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group flex flex-col cursor-pointer" onClick={() => asset.isDirectory ? setCurrentPath([...currentPath, asset.name]) : null}>
              <div className="h-40 bg-gray-50 flex items-center justify-center relative p-4 border-b border-gray-100">
                {asset.isDirectory ? (
                  <Folder className="w-20 h-20 text-[#D4AF37]" />
                ) : isImage(asset.type) ? (
                  <img src={asset.url as string} alt={asset.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <FileText className="w-16 h-16 text-gray-300" />
                )}
                
                {/* Overlay actions (Only for files) */}
                {!asset.isDirectory && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => setMovingAsset(asset.name)}
                      className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black shadow-lg"
                      title="Move Asset"
                    >
                      <FolderInput className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDownload(asset.url, asset.name)}
                      className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black shadow-lg"
                      title="Download Asset"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => copyToClipboard(asset.url, asset.id)}
                      className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black shadow-lg"
                      title="Copy Public URL"
                    >
                      {copiedId === asset.id ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(asset.name)}
                      className="p-2 bg-red-500 rounded-full hover:scale-110 transition-transform text-white shadow-lg"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {/* Delete button for folders */}
                {asset.isDirectory && (
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]" onClick={e => e.stopPropagation()}>
                      <button 
                        onClick={() => handleDelete(asset.name)}
                        className="p-2 bg-red-500 rounded-full hover:scale-110 transition-transform text-white shadow-lg"
                        title="Delete Folder"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="font-semibold text-sm truncate" title={asset.name}>{asset.name}</p>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500 uppercase font-bold tracking-wider">
                  <span>{asset.isDirectory ? 'Folder' : asset.type}</span>
                  <span>{formatSize(asset.size)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
