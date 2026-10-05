'use client';

import React, { useState } from 'react';
import { Position } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Flame,
  Layers,
  Clock,
  Coins
} from 'lucide-react';

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
  const [filter, setFilter] = useState<'all' | 'in_range' | 'out_of_range'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const filteredPositions = positions.filter((pos) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'in_range'
        ? pos.status === 'active'
        : pos.status === 'out_of_range';

    const matchesSearch =
      pos.pool_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pos.pool.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pos.position.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Meteora DLMM Active & Tracked Positions
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Showing {filteredPositions.length} of {positions.length} recorded positions
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search token / pool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-40 sm:w-56"
            />
          </div>

          {/* Status Filter */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 font-mono text-xs">
            {(['all', 'in_range', 'out_of_range'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Pool / Pair</th>
              <th className="pb-3 font-semibold">Status & Bin Range</th>
              <th className="pb-3 font-semibold">Deploy Capital</th>
              <th className="pb-3 font-semibold">Fee Yield (24h)</th>
              <th className="pb-3 font-semibold">Organic / Volatility</th>
              <th className="pb-3 font-semibold">PnL (Est.)</th>
              <th className="pb-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/60">
            {filteredPositions.map((pos) => {
              const isInRange = pos.status === 'active';
              const minBin = pos.bin_range?.min ?? -600;
              const maxBin = pos.bin_range?.max ?? -500;
              const activeBin = pos.active_bin_at_deploy ?? -550;
              const currentBin = pos.current_bin ?? activeBin;

              // Compute relative percentage for visual bar
              const binSpan = Math.max(1, maxBin - minBin);
              const relativeBinPct = Math.min(100, Math.max(0, ((currentBin - minBin) / binSpan) * 100));

              return (
                <tr 
                  key={pos.position} 
                  className="hover:bg-slate-900/60 transition-colors group cursor-pointer"
                  onClick={() => setSelectedPosition(pos)}
                >
                  {/* Pool & Token */}
                  <td className="py-3.5 pr-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                        {pos.pool_name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-100 flex items-center gap-1.5">
                          {pos.pool_name}
                          <span className="text-[10px] font-semibold text-slate-400 px-1.5 py-0.2 rounded bg-slate-800">
                            {pos.strategy}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {pos.pool.slice(0, 4)}...{pos.pool.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Status & Bin Range Visualizer */}
                  <td className="py-3.5 pr-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        {isInRange ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3" />
                            In-Range
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                            <AlertTriangle className="w-3 h-3" />
                            Out-Range
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          [{minBin} ↔ {maxBin}]
                        </span>
                      </div>
                      
                      {/* Visual Bin Gauge */}
                      <div className="w-36 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative">
                        <div 
                          className={`h-full ${isInRange ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-amber-500'}`}
                          style={{ width: `${isInRange ? 100 : 35}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Deploy Capital */}
                  <td className="py-3.5 pr-3">
                    <div className="text-slate-200 font-bold">{pos.amount_sol} SOL</div>
                    <div className="text-[11px] text-slate-400">${pos.initial_value_usd.toFixed(2)}</div>
                  </td>

                  {/* Fee Yield */}
                  <td className="py-3.5 pr-3">
                    <div className="text-cyan-400 font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {pos.fee_tvl_ratio.toFixed(1)}%
                    </div>
                    <div className="text-[11px] text-slate-400">
                      +${pos.fees_earned_usd.toFixed(2)} ({pos.fees_earned_sol} SOL)
                    </div>
                  </td>

                  {/* Organic & Volatility */}
                  <td className="py-3.5 pr-3">
                    <div className="text-slate-300">
                      Organic: <b className="text-emerald-400">{pos.organic_score}/100</b>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Vol: {pos.volatility.toFixed(1)}% | Holders: {pos.entry_holders}
                    </div>
                  </td>

                  {/* PnL */}
                  <td className="py-3.5 pr-3">
                    <div className={`font-bold text-sm ${pos.current_pnl_usd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {pos.current_pnl_usd >= 0 ? '+' : ''}${pos.current_pnl_usd.toFixed(2)}
                    </div>
                    <div className={`text-[11px] ${pos.current_pnl_pct >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      ({pos.current_pnl_pct >= 0 ? '+' : ''}{pos.current_pnl_pct.toFixed(2)}%)
                    </div>
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 text-right">
                    <a
                      href={`https://solscan.io/account/${pos.pool}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Solscan</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Position Detail Modal */}
      {selectedPosition && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPosition(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full font-mono text-xs space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedPosition.pool_name}</h3>
                  <span className="text-slate-400">Position: {selectedPosition.position}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPosition(null)}
                className="text-slate-400 hover:text-white text-base px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Strategy & Step</span>
                <p className="text-sm font-bold text-slate-200 mt-1">
                  {selectedPosition.strategy.toUpperCase()} (Step {selectedPosition.bin_step})
                </p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Entry Market Cap</span>
                <p className="text-sm font-bold text-slate-200 mt-1">
                  ${selectedPosition.entry_mcap.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Entry 24h Volume</span>
                <p className="text-sm font-bold text-cyan-400 mt-1">
                  ${selectedPosition.entry_volume.toLocaleString()}
                </p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Deploy Timestamp</span>
                <p className="text-[11px] font-bold text-slate-300 mt-1">
                  {new Date(selectedPosition.deployed_at).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-semibold">Bin Range Breakdown:</span>
              <div className="flex justify-between text-slate-300">
                <span>Min Bin: <b>{selectedPosition.bin_range?.min}</b></span>
                <span>Active At Deploy: <b>{selectedPosition.active_bin_at_deploy}</b></span>
                <span>Max Bin: <b>{selectedPosition.bin_range?.max}</b></span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={`https://app.meteora.ag/dlmm/${selectedPosition.pool}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <span>Open in Meteora App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
