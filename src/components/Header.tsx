'use client';

import React, { useState } from 'react';
import { DashboardStats } from '../types';
import { 
  Activity, 
  Server, 
  Wallet, 
  RefreshCw, 
  TrendingUp, 
  Cpu, 
  Radio, 
  ExternalLink,
  Copy,
  Check,
  Zap
} from 'lucide-react';

interface HeaderProps {
  stats: DashboardStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  liveMode: boolean;
  setLiveMode: (live: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  activeTab,
  setActiveTab,
  onRefresh,
  isRefreshing,
  liveMode,
  setLiveMode,
}) => {
  const [copied, setCopied] = useState(false);

  const copyWallet = () => {
    navigator.clipboard.writeText(stats.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navTabs = [
    { id: 'overview', label: 'Executive Overview', icon: Activity },
    { id: 'positions', label: `Positions (${stats.activePositionsCount})`, icon: TrendingUp },
    { id: 'decisions', label: 'AI Decisions Feed', icon: Cpu },
    { id: 'lessons', label: 'Lessons & Rules', icon: Zap },
    { id: 'pools', label: 'Pool Intelligence', icon: Radio },
    { id: 'health', label: 'VPS & System Health', icon: Server },
  ];

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-[1px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-wider text-white font-mono uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                Meridian <span className="text-emerald-400 text-sm font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">BI</span>
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {stats.botMode}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Autonomous Solana DLMM LP Intelligence</p>
          </div>
        </div>

        {/* Center/Right: Live Indicators & Stats Pills */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono">
          {/* SOL Price */}
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-slate-300">
            <span className="text-slate-500">SOL:</span>
            <span className="text-emerald-400 font-bold">${stats.solPriceUsd.toFixed(2)}</span>
          </div>

          {/* VPS Status Pill */}
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">VPS:</span>
            <span className="text-slate-200 font-semibold">43.173.33.248</span>
            <span className="text-[10px] text-emerald-400 font-bold px-1 rounded bg-emerald-950 border border-emerald-800/50">
              {stats.rpcLatencyMs}ms
            </span>
          </div>

          {/* Wallet Address Pill */}
          <button 
            onClick={copyWallet}
            className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 transition-colors px-3 py-1.5 rounded-lg flex items-center gap-2 text-slate-300 group cursor-pointer"
            title="Click to copy full address"
          >
            <Wallet className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            <span className="text-slate-400">
              {stats.walletAddress.slice(0, 4)}...{stats.walletAddress.slice(-4)}
            </span>
            <span className="text-emerald-400 font-bold">({stats.walletBalanceSol} SOL)</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
            )}
          </button>

          {/* Refresh Action */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2 border-t border-slate-900">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
