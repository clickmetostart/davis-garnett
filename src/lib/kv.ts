/**
 * Persistent KV store backed by Upstash Redis using `dg:` key prefixes
 * so `redis-coral-ridge` can safely isolate Davis & Garnett data from other apps.
 * Falls back to local `src/data/*.json` when Redis env vars are absent.
 */

import { Redis } from '@upstash/redis';
import fs from 'fs/promises';
import path from 'path';

let _redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.STORAGE_KV_REST_API_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.STORAGE_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    _redis = null;
    return null;
  }

  _redis = new Redis({ url, token });
  return _redis;
}

export const KEYS = {
  leads: 'dg:leads',
  labels: 'dg:labels',
  settings: 'dg:settings',
  listings: 'dg:listings',
  threads: 'dg:threads',
} as const;

async function readSeedJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function kvGet<T>(key: string, seedFilename: string, fallback: T): Promise<T> {
  const redis = getRedis();
  if (!redis) {
    return readSeedJson<T>(seedFilename, fallback);
  }

  try {
    const val = await redis.get<T>(key);
    if (val === null || val === undefined) {
      const seed = await readSeedJson<T>(seedFilename, fallback);
      await redis.set(key, seed);
      return seed;
    }
    return val;
  } catch (err) {
    console.error(`Redis kvGet(${key}) error, falling back to local seed:`, err);
    return readSeedJson<T>(seedFilename, fallback);
  }
}

async function kvSet<T>(key: string, seedFilename: string, value: T): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(key, value);
    return;
  }
  // Local dev fallback only when Redis is not configured
  const filePath = path.join(process.cwd(), 'src', 'data', seedFilename);
  await fs.writeFile(filePath, JSON.stringify(value, null, 2));
}

export async function kv_getLeads(): Promise<any[]> {
  return kvGet<any[]>(KEYS.leads, 'leads.json', []);
}

export async function kv_setLeads(leads: any[]): Promise<void> {
  return kvSet(KEYS.leads, 'leads.json', leads);
}

export async function kv_getLabels(): Promise<any[]> {
  return kvGet<any[]>(KEYS.labels, 'labels.json', []);
}

export async function kv_setLabels(labels: any[]): Promise<void> {
  return kvSet(KEYS.labels, 'labels.json', labels);
}

export async function kv_getSettings(): Promise<Record<string, any>> {
  return kvGet<Record<string, any>>(KEYS.settings, 'settings.json', {
    onboarding: {},
    formRouting: {},
  });
}

export async function kv_setSettings(settings: Record<string, any>): Promise<void> {
  return kvSet(KEYS.settings, 'settings.json', settings);
}

export async function kv_getListings(): Promise<any[]> {
  return kvGet<any[]>(KEYS.listings, 'listings.json', []);
}

export async function kv_setListings(listings: any[]): Promise<void> {
  return kvSet(KEYS.listings, 'listings.json', listings);
}

export async function kv_getThreads(): Promise<any[]> {
  return kvGet<any[]>(KEYS.threads, 'web_inbox.json', []);
}

export async function kv_setThreads(threads: any[]): Promise<void> {
  return kvSet(KEYS.threads, 'web_inbox.json', threads);
}

