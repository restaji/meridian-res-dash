'use client';

import React, { useState } from 'react';
import { Decision } from '../types';
import { 
  Cpu, 
  CheckCircle, 
  XCircle, 
  LogOut, 
  RotateCcw, 
  Filter, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  AlertOctagon,
  Sparkles,
  Search
} from 'lucide-react';

interface DecisionFeedProps {
  decisions: Decision[];
}

export const DecisionFeed: React.FC<DecisionFeedProps> = ({ decisions }) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredDecisions = decisions.filter((d) => {
    const matchesType = typeFilter === 'all' || d.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesSearch =
      (d.summary || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.reason || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.pool_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.actor || '').toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  const getBadgeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deploy':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'exit':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'skip':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'rebalance':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deploy':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
      case 'exit':
        return <LogOut className="w-3.5 h-3.5 text-rose-400" />;
      case 'skip':
        return <XCircle className="w-3.5 h-3.5 text-amber-400" />;
      case 'rebalance':
        return <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Cpu className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            AI Decision Intelligence & Reasoning Feed
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Full audit trail of AI screener evaluations, buy/skip logic, and pool risk assessments
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reasoning or pool..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-950/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-44 sm:w-60"
            />
          </div>

          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 font-mono text-xs">
            {['all', 'deploy', 'skip', 'exit', 'rebalance'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded-lg font-semibold uppercase transition-all cursor-pointer ${
                  typeFilter === t
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Items List */}
      <div className="space-y-3 font-mono text-xs">
        {filteredDecisions.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No decisions match the selected filter.
          </div>
        ) : (
          filteredDecisions.slice(0, 30).map((dec) => {
            const isExpanded = expandedId === dec.id;
            return (
              <div
                key={dec.id}
                className="bg-slate-950/60 hover:bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 transition-all"
              >
                <div 
                  className="flex flex-wrap items-start justify-between gap-2 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : dec.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getTypeIcon(dec.type)}</div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase border ${getBadgeStyle(dec.type)}`}>
                          {dec.type}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {dec.actor}
                        </span>
                        {dec.pool_name && (
                          <span className="text-emerald-300 font-bold">
                            {dec.pool_name}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-200 font-semibold mt-1.5 text-xs sm:text-sm">
                        {dec.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {new Date(dec.ts).toLocaleString()}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-850 space-y-2 text-slate-300">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-1">Detailed Reasoning:</span>
                      <p className="text-slate-200 leading-relaxed">{dec.reason}</p>
                    </div>

                    {dec.rejected && dec.rejected.length > 0 && (
                      <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                        <span className="text-amber-400 font-semibold block mb-1">Rejected Candidates:</span>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                          {dec.rejected.map((rej, idx) => (
                            <li key={idx}>
                              <span className="text-slate-300 font-medium">{rej.pool_name || rej.pool || 'Pool'}:</span> {rej.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {dec.risks && dec.risks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {dec.risks.map((risk, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-800/50 text-[10px]">
                            <AlertOctagon className="w-3 h-3" />
                            {risk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
