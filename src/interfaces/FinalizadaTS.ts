import type { LiquidacionMappedTS } from "./LiquidacionesTS";
import type { SubagenteTS } from "./SubagentesTS";

export interface FinalizadaTS {
  numero_liquidacion: string;
  kanban: KanbanStates;
  fecha_liquidacion: string;
  fecha_pago: string;
  total_liquidado: number;
  prestamo: number;
  iva: number;
  ret_iva: number;
  ret_renta: number;
  gastos_adm: number;
  tarifa_comision: number;
  SubagenteCodigo: string;
  Liquidaciones?: LiquidacionMappedTS[];
}

export interface FinalizadaMappedTS {
  numero_liquidacion: string;
  kanban: KanbanStates;
  fecha_liquidacion: string;
  fecha_pago: string;
  total_liquidado: number;
  prestamo: number;
  iva: number;
  ret_iva: number;
  ret_renta: number;
  gastos_adm: number;
  tarifa_comision: number;
  SubagenteCodigo: string;
  Subagente: SubagenteTS;
}

enum KanbanStates {
  EMITIDO = "Emitida",
  LISTA = "Lista",
  ENVIADA = "Enviada",
  PAGADA = "Pagada",
  ARCHIVADA = "Archivada"
}
