import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { users: [] };
  }
  const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(fileContents);
}

function writeData(data: any) {
  // Ensure directory exists
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

import { cookies } from 'next/headers';

// Helper to get current authenticated user
async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth_token')?.value;
  if (!userId) return null;
  const data = readData();
  return data.users.find((u: any) => u.id === userId) || null;
}

export async function GET() {
  try {
    const data = readData();
    const safeUsers = data.users.map((u: any) => {
      const { password, ...safeUser } = u;
      return safeUser;
    });
    return NextResponse.json({ users: safeUsers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'Super Admin' && currentUser.role !== 'System Admin')) {
      return NextResponse.json({ error: 'Forbidden. Only Admins can invite users.' }, { status: 403 });
    }

    const body = await request.json();
    const data = readData();
    
    const newUser = {
      id: `u_${Date.now()}`,
      ...body,
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    data.users.push(newUser);
    writeData(data);

    const { password, ...safeUser } = newUser;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, updates } = body;

    // RBAC Check: You can edit yourself. If you are editing someone else, you must be an admin.
    if (currentUser.id !== id && currentUser.role !== 'Super Admin' && currentUser.role !== 'System Admin') {
      return NextResponse.json({ error: 'Forbidden. You can only edit your own profile.' }, { status: 403 });
    }

    const data = readData();
    const index = data.users.findIndex((u: any) => u.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Do not allow demoting Super Admin
    if (data.users[index].role === 'Super Admin' && updates.role && updates.role !== 'Super Admin') {
      return NextResponse.json({ error: 'Cannot demote the root Super Admin' }, { status: 403 });
    }

    // Process updates
    data.users[index] = { ...data.users[index], ...updates };
    writeData(data);

    const { password, ...safeUser } = data.users[index];
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'Super Admin' && currentUser.role !== 'System Admin')) {
      return NextResponse.json({ error: 'Forbidden. Only Admins can revoke access.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const data = readData();
    const index = data.users.findIndex((u: any) => u.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (data.users[index].role === 'Super Admin') {
      return NextResponse.json({ error: 'Cannot delete the root Super Admin' }, { status: 403 });
    }

    data.users.splice(index, 1);
    writeData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
