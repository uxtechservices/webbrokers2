export interface SettlementFilters {
  type?: string;
  state?: string;
  person?: string;
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