export interface SettlementFilters {
  type?: string;
  state?: string;
  person?: string;
  agent?: string;   // ← NUEVO
  client?: string;  // ← NUEVO
  agency?: string;
  subsidiary?: string;
  liquidity?: boolean;
  health?: boolean;
}

export interface AgentFilters {
  name?: string;
  state?: string;
  doc?: string;
}