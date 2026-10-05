'use client';

import React from 'react';
import { DashboardStats } from '../types';
import { Server, Activity, Cpu, ShieldCheck, Clock, CheckCircle2, HardDrive, Wifi } from 'lucide-react';

interface BotHealthProps {
  stats: DashboardStats;
}

export const BotHealth: React.FC<BotHealthProps> = ({ stats }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800/60">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          VPS Host & Autonomous Agent Health
        </h2>
        <p className="text-slate-400 mt-0.5">
          Live telemetry from VPS 43.173.33.248 (Process: meridian via PM2)
        </p>
      </div>

      {/* Grid of Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Node & Process Health */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase">Process Runtime</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
              <CheckCircle2 className="w-3 h-3" />
              ONLINE (PM2 #0)
            </span>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Host IP:</span>
              <span className="text-slate-200">43.173.33.248</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Node.js:</span>
              <span className="text-slate-200">v22.23.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Memory RSS:</span>
              <span className="text-slate-200">~62.9 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CPU Usage:</span>
              <span className="text-emerald-400 font-bold">0.8%</span>
            </div>
          </div>
        </div>

        {/* Solana RPC Connection */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase">Solana RPC Engine</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
              <Wifi className="w-3 h-3" />
              CONNECTED
            </span>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">RPC Endpoint:</span>
              <span className="text-slate-200">Helius / Solana Mainnet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Latency:</span>
              <span className="text-emerald-400 font-bold">{stats.rpcLatencyMs} ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Wallet SOL:</span>
              <span className="text-emerald-400 font-bold">{stats.walletBalanceSol} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">PnL Poller:</span>
              <span className="text-cyan-400 font-bold">Active (45s)</span>
            </div>
          </div>
        </div>

        {/* Cron Schedule Matrix */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase">Autonomous Cron Cycles</span>
            <span className="text-slate-400 text-[11px]">3 Scheduled</span>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Position Management:</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-emerald-300">
                Every 10m
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Opportunity Screener:</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-cyan-300">
                Every 30m
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Rapid PnL Tick:</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-purple-300">
                Every 45s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bot Architecture Blueprint */}
      <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase">Architecture & Synchronization</h3>
        <p className="text-slate-400 leading-relaxed text-xs">
          Meridian operates autonomously on the VPS server via PM2 daemon. This BI Dashboard retrieves real-time telemetry, position updates, and LLM reasoning directly via API or serverless functions on Vercel.
        </p>
      </div>
    </div>
  );
};
