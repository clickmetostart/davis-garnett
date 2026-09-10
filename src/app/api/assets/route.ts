import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'public', 'dashboard-assets');

// Ensure base dir exists
async function ensureBaseDir() {
  try {
    await fs.access(BASE_DIR);
  } catch {
    await fs.mkdir(BASE_DIR, { recursive: true });
  }
}

function getSafePath(userPath: string | null) {
  if (!userPath) return BASE_DIR;
  // Prevent directory traversal attacks
  const safeRelativePath = path.normalize(userPath).replace(/^(\.\.(\/|\\|$))+/, '');
  return path.join(BASE_DIR, safeRelativePath);
}

export async function GET(req: Request) {
  await ensureBaseDir();
  try {
    const { searchParams } = new URL(req.url);
    const subPath = searchParams.get('path') || '';
    const targetDir = getSafePath(subPath);
    
    const files = await fs.readdir(targetDir, { withFileTypes: true });
    
    const assets = await Promise.all(
      files.map(async (dirent) => {
        const filePath = path.join(/*turbopackIgnore: true*/ targetDir, dirent.name);
        const stats = await fs.stat(/*turbopackIgnore: true*/ filePath);
        const isDirectory = dirent.isDirectory();
        
        return {
          id: dirent.name,
          name: dirent.name,
          // If it's a folder, url is null or just its path relative to base
          url: isDirectory ? null : `/dashboard-assets/${subPath ? subPath + '/' : ''}${dirent.name}`,
          size: isDirectory ? 0 : stats.size,
          createdAt: stats.mtime.toISOString(),
          type: isDirectory ? 'folder' : path.extname(dirent.name).substring(1) || 'file',
          isDirectory
        };
      })
    );
    
    // Sort folders first, then newest files
    assets.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Failed to read assets', error);
    return NextResponse.json({ error: 'Failed to read assets' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await ensureBaseDir();
  try {
    const formData = await req.formData();
    const action = formData.get('action');
    const subPath = (formData.get('path') as string) || '';
    const targetDir = getSafePath(subPath);

    if (action === 'createFolder') {
      const folderName = formData.get('folderName') as string;
      if (!folderName) return NextResponse.json({ error: 'Folder name required' }, { status: 400 });
      
      const safeFolderName = folderName.replace(/[^a-zA-Z0-9.\-_ ]/g, '_');
      await fs.mkdir(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ targetDir, safeFolderName), { recursive: true });
      return NextResponse.json({ success: true });
    }

    // Standard file upload
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replace(/[^a-zA-Z0-9.\-_ ]/g, '_');
    const filePath = path.join(/*turbopackIgnore: true*/ targetDir, filename);

    await fs.writeFile(/*turbopackIgnore: true*/ filePath, buffer);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in assets POST', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { filename, currentPath, newPath } = await req.json();
    if (!filename || typeof currentPath !== 'string' || typeof newPath !== 'string') {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const sourceDir = getSafePath(currentPath);
    const destDir = getSafePath(newPath);
    const safeFilename = path.basename(filename);

    const sourceFilePath = path.join(/*turbopackIgnore: true*/ sourceDir, safeFilename);
    const destFilePath = path.join(/*turbopackIgnore: true*/ destDir, safeFilename);

    await fs.rename(/*turbopackIgnore: true*/ sourceFilePath, destFilePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error moving file', error);
    return NextResponse.json({ error: 'Failed to move file' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { filename, path: subPath } = await req.json();
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const targetDir = getSafePath(subPath || '');
    const safeFilename = path.basename(filename);
    const filePath = path.join(/*turbopackIgnore: true*/ targetDir, safeFilename);

    const stats = await fs.stat(/*turbopackIgnore: true*/ filePath);
    if (stats.isDirectory()) {
      await fs.rm(/*turbopackIgnore: true*/ filePath, { recursive: true, force: true });
    } else {
      await fs.unlink(/*turbopackIgnore: true*/ filePath);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
