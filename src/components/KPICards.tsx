'use client';

import React from 'react';
import { DashboardStats } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Percent, 
  Layers, 
  ShieldCheck, 
  ArrowUpRight,
  Flame,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface KPICardsProps {
  stats: DashboardStats;
}

export const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
  const isNetPositive = stats.totalNetPnlUsd >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Net PnL Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl hover:border-emerald-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
            Total Net PnL
          </span>
          <div className={`p-2 rounded-xl ${isNetPositive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'}`}>
            {isNetPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${isNetPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isNetPositive ? '+' : ''}${stats.totalNetPnlUsd.toFixed(2)}
          </span>
          <span className="text-xs font-mono text-slate-400">
            ({isNetPositive ? '+' : ''}{stats.totalNetPnlSol.toFixed(4)} SOL)
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/60 font-mono text-slate-400">
          <span>Realized: <b className="text-slate-200">${stats.totalRealizedPnlUsd.toFixed(2)}</b></span>
          <span>Unrealized: <b className={stats.totalUnrealizedPnlUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
            {stats.totalUnrealizedPnlUsd >= 0 ? '+' : ''}${stats.totalUnrealizedPnlUsd.toFixed(2)}
          </b></span>
        </div>
      </div>

      {/* 2. Total Fees Harvested (DLMM Yield) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl hover:border-cyan-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
            Total Fees Harvested
          </span>
          <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Coins className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-cyan-400">
            ${stats.totalFeesHarvestedUsd.toFixed(2)}
          </span>
          <span className="text-xs font-mono text-slate-400">
            ({stats.totalFeesHarvestedSol.toFixed(4)} SOL)
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/60 font-mono text-slate-400">
          <span>Fee Yield APY:</span>
          <span className="inline-flex items-center gap-1 text-cyan-300 font-bold">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            ~124.8%
          </span>
        </div>
      </div>

      {/* 3. Win Rate & Profit Factor */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl hover:border-teal-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-teal-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
            Win Rate & Efficacy
          </span>
          <div className="p-2 rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30">
            <Percent className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-teal-300">
            {stats.winRatePct}%
          </span>
          <span className="text-xs font-mono text-slate-400">
            ({stats.totalDeploys} deploys)
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/60 font-mono text-slate-400">
          <span>Profit Factor: <b className="text-teal-300">{stats.profitFactor}x</b></span>
          <span>Sharpe: <b className="text-slate-200">{stats.sharpeRatio}</b></span>
        </div>
      </div>

      {/* 4. Active Positions & Range Status */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl hover:border-amber-500/40 transition-all group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-amber-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
            Tracked Positions
          </span>
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-amber-400">
            {stats.activePositionsCount}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Pool Positions
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/60 font-mono text-slate-400">
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            In-Range: <b>{stats.inRangeCount}</b>
          </span>
          <span className="inline-flex items-center gap-1 text-amber-400">
            <AlertTriangle className="w-3 h-3" />
            Out-Range: <b>{stats.outOfRangeCount}</b>
          </span>
        </div>
      </div>
    </div>
  );
};
