export interface PositionBinRange {
  min: number;
  max: number;
  bins_below: number;
  bins_above: number;
}

export interface PositionSignalSnapshot {
  base_mint: string;
  organic_score: number;
  fee_tvl_ratio: number;
  volume: number;
  mcap: number;
  holder_count: number;
  smart_wallets_present: boolean;
  narrative_quality: string;
  volatility: number;
}

export interface Position {
  position: string;
  pool: string;
  pool_name: string;
  strategy: string;
  bin_range: PositionBinRange;
  amount_sol: number;
  amount_x: number;
  active_bin_at_deploy: number;
  bin_step: number;
  volatility: number;
  fee_tvl_ratio: number;
  initial_fee_tvl_24h: number;
  organic_score: number;
  initial_value_usd: number;
  entry_mcap: number;
  entry_tvl: number;
  entry_volume: number;
  entry_holders: number;
  signal_snapshot?: PositionSignalSnapshot;
  deployed_at: string;
  out_of_range_since: string | null;
  last_claim_at: string | null;
  status: 'active' | 'out_of_range' | 'closed';
  current_pnl_usd: number;
  current_pnl_pct: number;
  fees_earned_usd: number;
  fees_earned_sol: number;
  current_bin?: number;
}

export interface Decision {
  id: string;
  ts: string;
  type: 'deploy' | 'skip' | 'exit' | 'rebalance' | 'harvest' | 'hold';
  actor: 'SCREENER' | 'MANAGER' | 'RISK_ENGINE' | 'USER';
  pool: string | null;
  pool_name: string | null;
  position: string | null;
  summary: string;
  reason: string;
  risks?: string[];
  metrics?: Record<string, any>;
  rejected?: Array<{
    pool?: string;
    pool_name?: string;
    reason?: string;
  }>;
}

export interface Lesson {
  id: number;
  rule: string;
  tags: string[];
  outcome: string;
  sourceType: string;
  pinned: boolean;
  role: string | null;
  created_at: string;
  weight?: number;
}

export interface PoolDeployHistory {
  deployed_at: string | null;
  closed_at: string | null;
  pnl_pct: number;
  pnl_usd: number;
  fees_earned_usd: number;
  fees_earned_sol: number;
}

export interface PoolMemoryItem {
  name: string;
  base_mint: string;
  deploys: PoolDeployHistory[];
  totalDeploys?: number;
  totalPnlUsd?: number;
  winRate?: number;
  avgFeeTvlRatio?: number;
}

export interface DashboardStats {
  walletAddress: string;
  walletBalanceSol: number;
  walletBalanceUsd: number;
  solPriceUsd: number;
  totalNetPnlUsd: number;
  totalNetPnlSol: number;
  totalRealizedPnlUsd: number;
  totalUnrealizedPnlUsd: number;
  totalFeesHarvestedUsd: number;
  totalFeesHarvestedSol: number;
  winRatePct: number;
  totalDeploys: number;
  activePositionsCount: number;
  inRangeCount: number;
  outOfRangeCount: number;
  profitFactor: number;
  sharpeRatio: number;
  avgHoldDurationHours: number;
  botMode: 'LIVE' | 'SIMULATOR' | 'DRY_RUN';
  vpsStatus: 'ONLINE' | 'OFFLINE' | 'SYNCING';
  lastSyncTimestamp: string;
  rpcLatencyMs: number;
}

export interface PnLDataPoint {
  date: string;
  cumulativePnlUsd: number;
  dailyPnlUsd: number;
  feesUsd: number;
  tradesCount: number;
}

export interface DashboardFullData {
  stats: DashboardStats;
  positions: Position[];
  decisions: Decision[];
  lessons: Lesson[];
  pools: Record<string, PoolMemoryItem>;
  pnlHistory: PnLDataPoint[];
}
