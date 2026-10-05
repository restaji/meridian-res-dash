'use client';

import React, { useState, useEffect } from 'react';
import { DashboardFullData } from '../types';
import { parseDashboardData } from '../lib/dataService';
import { Header } from '../components/Header';
import { KPICards } from '../components/KPICards';
import { PnLChart } from '../components/PnLChart';
import { PositionsTable } from '../components/PositionsTable';
import { DecisionFeed } from '../components/DecisionFeed';
import { LessonsMatrix } from '../components/LessonsMatrix';
import { PoolIntelligence } from '../components/PoolIntelligence';
import { BotHealth } from '../components/BotHealth';

export default function Home() {
  const [data, setData] = useState<DashboardFullData>(() => parseDashboardData());
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [liveMode, setLiveMode] = useState<boolean>(true);

  // Sync data from API route
  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/data?mode=${liveMode ? 'live' : 'snapshot'}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn('Sync failed, keeping current data state:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  // Periodic Auto-Sync every 15s
  useEffect(() => {
    const timer = setInterval(() => {
      fetchData();
    }, 15000);
    return () => clearInterval(timer);
  }, [liveMode]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Dynamic Header */}
      <Header
        stats={data.stats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={fetchData}
        isRefreshing={isRefreshing}
        liveMode={liveMode}
        setLiveMode={setLiveMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Executive KPI Cards (Always visible on all tabs or overview) */}
        <KPICards stats={data.stats} />

        {/* Tab 1: Executive Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Financial Curve Chart */}
            <PnLChart data={data.pnlHistory} />

            {/* Quick Preview Grid: Active Positions & Latest Decisions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <PositionsTable positions={data.positions.slice(0, 5)} />
              </div>
              <div className="space-y-4">
                <DecisionFeed decisions={data.decisions.slice(0, 5)} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Positions */}
        {activeTab === 'positions' && (
          <PositionsTable positions={data.positions} />
        )}

        {/* Tab 3: AI Decisions Feed */}
        {activeTab === 'decisions' && (
          <DecisionFeed decisions={data.decisions} />
        )}

        {/* Tab 4: Lessons & Heuristics */}
        {activeTab === 'lessons' && (
          <LessonsMatrix lessons={data.lessons} />
        )}

        {/* Tab 5: Pool Intelligence */}
        {activeTab === 'pools' && (
          <PoolIntelligence pools={data.pools} />
        )}

        {/* Tab 6: VPS & System Health */}
        {activeTab === 'health' && (
          <BotHealth stats={data.stats} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>Meridian BI v2.0 • High-Frequency Autonomous DLMM Intelligence</span>
          <span>Targeting Meteora DLMM on Solana Mainnet</span>
        </div>
      </footer>
    </div>
  );
}
