import { NextResponse } from 'next/server';
import { parseDashboardData } from '@/lib/dataService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode'); // 'live' | 'snapshot'
    const vpsUrl = process.env.VPS_API_URL || process.env.NEXT_PUBLIC_VPS_URL;
    const vpsToken = process.env.VPS_API_TOKEN || process.env.NEXT_PUBLIC_VPS_TOKEN;

    // If LIVE mode requested and VPS endpoint is configured, fetch directly from VPS
    if (mode === 'live' && vpsUrl) {
      try {
        const res = await fetch(`${vpsUrl}/api/stats`, {
          headers: vpsToken ? { Authorization: `Bearer ${vpsToken}` } : {},
          next: { revalidate: 0 },
        });
        if (res.ok) {
          const liveRawData = await res.json();
          const parsed = parseDashboardData(liveRawData);
          parsed.stats.vpsStatus = 'ONLINE';
          parsed.stats.lastSyncTimestamp = new Date().toISOString();
          return NextResponse.json(parsed);
        }
      } catch (fetchErr) {
        console.warn('Direct VPS fetch failed, falling back to snapshot with OFFLINE status:', fetchErr);
      }
    }

    // Default: Return high-fidelity parsed dashboard data
    const data = parseDashboardData();
    data.stats.lastSyncTimestamp = new Date().toISOString();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Error in /api/data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve dashboard data', details: error?.message },
      { status: 500 }
    );
  }
}
