export type Dashboard = { activeUsers: number; registeredDevices: number; protectedResources: number; openAlerts: number; averageTrustScore: number };
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

export async function getDashboard(): Promise<Dashboard> {
  const response = await fetch(`${apiUrl}/dashboard`, { cache: 'no-store' });
  if (!response.ok) throw new Error('The API is unavailable. Start the backend and sign in to view live data.');
  return response.json() as Promise<Dashboard>;
}
