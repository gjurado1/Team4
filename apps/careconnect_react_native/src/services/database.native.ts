import * as SQLite from 'expo-sqlite';
import type { AppUser } from '@/types';

// Mirrors Flutter's sqflite DatabaseHelper (users table + seeded admin).
let db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('app_database.db');
  await db.execAsync(
    'PRAGMA journal_mode = WAL;\nPRAGMA foreign_keys = ON;'
  );
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );`
  );
  // Seed default admin if it doesn't exist
  const row = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM users WHERE username = ?;',
    ['admin']
  );
  if (!row || row.count === 0) {
    await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?);', [
      'admin',
      'password123'
    ]);
  }
  return db;
}

export async function login(username: string, password: string): Promise<AppUser | null> {
  const database = await getDb();
  const u = username.trim();
  const p = password.trim();
  if (!u || !p) return null;

  const user = await database.getFirstAsync<AppUser>(
    'SELECT id, username, password FROM users WHERE username = ? AND password = ? LIMIT 1;',
    [u, p]
  );
  return user ?? null;
}

export async function createUser(user: AppUser): Promise<number> {
  const database = await getDb();
  const result = await database.runAsync(
    'INSERT INTO users (username, password) VALUES (?, ?);',
    [user.username.trim(), user.password]
  );
  return result.lastInsertRowId;
}
