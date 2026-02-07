type Role = "caregiver" | "patient";
type UserRow = { username: string; password: string; role: Role };

const STORAGE_KEY = "careconnect-users";

async function loadUsers(): Promise<UserRow[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded: UserRow[] = [{ username: "admin", password: "password123", role: "caregiver" }];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw) as UserRow[];
  } catch {
    return [{ username: "admin", password: "password123", role: "caregiver" }];
  }
}

async function saveUsers(users: UserRow[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export async function initDb() {
  // no-op on web
  await loadUsers();
}

export async function login(username: string, password: string): Promise<{ username: string; role: Role } | null> {
  const users = await loadUsers();
  const u = users.find((x) => x.username === username && x.password === password);
  return u ? { username: u.username, role: u.role } : null;
}

export async function createUser(user: { username: string; password: string; role: Role }): Promise<boolean> {
  const users = await loadUsers();
  if (users.some((x) => x.username === user.username)) return false;
  users.push({ username: user.username, password: user.password, role: user.role });
  await saveUsers(users);
  return true;
}
