'use client';

import React, { useState } from 'react';
import { PnLDataPoint } from '../types';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TrendingUp, BarChart3, LineChart as LineChartIcon, DollarSign, Calendar } from 'lucide-react';

interface PnLChartProps {
  data: PnLDataPoint[];
}

export const PnLChart: React.FC<PnLChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'cumulative' | 'daily'>('cumulative');
  const [timeRange, setTimeRange] = useState<'all' | '14d' | '7d'>('all');

  const filteredData = React.useMemo(() => {
    if (timeRange === '7d') return data.slice(-7);
    if (timeRange === '14d') return data.slice(-14);
    return data;
  }, [data, timeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item: PnLDataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700/80 p-3.5 rounded-xl shadow-2xl backdrop-blur-md font-mono text-xs z-50">
          <p className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            Date: <span className="text-white">{label}</span>
          </p>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Cumulative PnL:</span>
              <span className={`font-bold ${item.cumulativePnlUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${item.cumulativePnlUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Daily PnL:</span>
              <span className={`font-bold ${item.dailyPnlUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.dailyPnlUsd >= 0 ? '+' : ''}${item.dailyPnlUsd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Fees Harvested:</span>
              <span className="text-cyan-400 font-bold">${item.feesUsd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Trades / Closes:</span>
              <span className="text-slate-200 font-bold">{item.tradesCount}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-5 shadow-xl">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Financial Performance & Equity Curve
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Historical portfolio growth from Meteora DLMM yield and token appreciation
          </p>
        </div>

        {/* View Toggle & Time Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Type Selector */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setChartType('cumulative')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                chartType === 'cumulative'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              Cumulative
            </button>
            <button
              onClick={() => setChartType('daily')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                chartType === 'daily'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Daily PnL
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 font-mono text-xs">
            {(['7d', '14d', 'all'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded-lg font-semibold uppercase transition-all cursor-pointer ${
                  timeRange === r
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'cumulative' ? (
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 11, fontFamily: 'monospace' }} 
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulativePnlUsd"
                name="Cumulative PnL"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCumulative)"
              />
            </AreaChart>
          ) : (
            <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 11, fontFamily: 'monospace' }} 
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="dailyPnlUsd" radius={[4, 4, 0, 0]}>
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.dailyPnlUsd >= 0 ? '#10b981' : '#f43f5e'} 
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
