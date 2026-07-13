export type Dashboard = { activeUsers: number; registeredDevices: number; protectedResources: number; openAlerts: number; averageTrustScore: number };
export type LoginValues = { email: string; password: string };
export type AuthTokens = { accessToken: string; refreshToken: string; tokenType: 'Bearer' };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

async function request<T>(path: string, init: RequestInit = {}, accessToken?: string): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), ...init.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string | string[] } | null;
    const message = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(message ?? `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export function login(values: LoginValues) { return request<AuthTokens>('/auth/login', { method: 'POST', body: JSON.stringify(values) }); }
export function logout(refreshToken: string) { return request<{ revoked: boolean }>('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken }) }); }
export function getDashboard(accessToken: string) { return request<Dashboard>('/dashboard', {}, accessToken); }
