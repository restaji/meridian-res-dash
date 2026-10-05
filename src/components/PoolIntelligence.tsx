'use client';

import React, { useState } from 'react';
import { PoolMemoryItem } from '../types';
import { Radio, Search, TrendingUp, Coins, ExternalLink, Flame, Trophy } from 'lucide-react';

interface PoolIntelligenceProps {
  pools: Record<string, PoolMemoryItem>;
}

export const PoolIntelligence: React.FC<PoolIntelligenceProps> = ({ pools }) => {
  const [search, setSearch] = useState('');

  const poolList = Object.entries(pools).map(([address, item]) => ({
    address,
    ...item,
  }));

  const filteredPools = poolList
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.totalPnlUsd || 0) - (a.totalPnlUsd || 0));

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            Meteora DLMM Pool Performance Memory
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Historical profitability and win rates ranked by cumulative Net PnL across {poolList.length} pools
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pool name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-950/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 font-mono text-xs">
        {filteredPools.map((pool, idx) => {
          const isProfitable = (pool.totalPnlUsd || 0) >= 0;
          return (
            <div
              key={pool.address}
              className="bg-slate-950/70 border border-slate-800/90 hover:border-emerald-500/40 rounded-xl p-4 space-y-3 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {pool.name}
                      </h3>
                      <span className="text-[10px] text-slate-500">
                        {pool.address.slice(0, 4)}...{pool.address.slice(-4)}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`https://app.meteora.ag/dlmm/${pool.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 p-1"
                    title="Open in Meteora"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-850">
                  <div className="bg-slate-900/60 p-2 rounded-lg">
                    <span className="text-slate-500 text-[10px] block">Net PnL</span>
                    <span className={`font-bold ${isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isProfitable ? '+' : ''}${pool.totalPnlUsd?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg">
                    <span className="text-slate-500 text-[10px] block">Win Rate</span>
                    <span className="font-bold text-teal-300">
                      {pool.winRate || 0}% ({pool.totalDeploys || 0} deploys)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Flame className="w-3 h-3" />
                  Yield Score: ~18.5%
                </span>
                <span className="text-slate-500">
                  Base: {pool.base_mint.slice(0, 4)}...
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
