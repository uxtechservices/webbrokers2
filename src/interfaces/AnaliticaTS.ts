export interface IAnalytic {
  clients: number;
  agents: number;
  monthly_payouts: PayoutsMonthlyStat[];
  pending_payments: number;
  missing_information: number;
  pending_loans: LoansPendingStat;
}

export interface LoansPendingStat {
  quantity: number;
  total: number;
  agents: number;
}

export interface PayoutsMonthlyStat {
  month: string
  quantity: number
}
