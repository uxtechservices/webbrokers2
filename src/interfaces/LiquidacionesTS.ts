import type { AseguradoraTS, SucursalTS } from "./AseguradoraTS";
import type { ClienteTS } from "./ClientesTS";
import type { FinalizadaTS } from "./FinalizadaTS";
import type { SubagenteTS } from "./SubagentesTS";
import type { SubsidiariaTS } from "./SubsidiariaTS";

export interface LiquidacionTS {
  id?: string;
  tipo: LiquidacionTypes;
  estado: LiquidacionStates;
  factura_ciaros?: number;
  factura?: number;
  documento?: number;
  orden?: string;
  fecha_vence?: string;
  d_inicial?: number;
  poliza?: string;
  anexo?: number;
  endoso?: string;
  codigo?: number;
  cliente?: string;
  f_contab?: string;
  valor_prima?: number;
  comision?: number;
  tarifa_comision?: number;
  ori?: string;
  F?: string;
  L?: string;
  P?: string;
  Notas?: string;
  SAge?: string;
  ClienteId?: string;
  SucursaleId?: string;
  AseguradoraId?: string;
  SubagenteCodigo?: string;
  FinalizadaNumeroLiquidacion?: string;
  fecha_cobrada: Date | string | null;
  fecha_pagada: Date | string | null;
  fecha_factura_ciaros: Date | string | null;
  fecha_liquidada: Date | string | null;
}

export interface LiquidacionMappedTS {
  id?: string;
  tipo: LiquidacionTypes;
  estado: LiquidacionStates;
  factura_ciaros?: number;
  factura?: number;
  documento?: number;
  orden?: string;
  fecha_vence?: string;
  d_inicial?: number;
  poliza?: string;
  anexo?: number;
  endoso?: string;
  codigo?: number;
  Cliente?: ClienteTS;
  Aseguradora?: AseguradoraTS;
  Subagente?: SubagenteTS;
  SubagenteCodigo?: string;
  f_contab?: string;
  valor_prima?: number;
  comision?: number;
  tarifa_comision?: number;
  ori?: string;
  F?: string;
  L?: string;
  P?: string;
  Notas?: string;
  SAge?: string;
  FinalizadaNumeroLiquidacion?: string;
  Finalizada?: FinalizadaTS;
  Sucursale?: SucursalTS;
  fecha_cobrada: Date | string | null;
  fecha_pagada: Date | string | null;
  fecha_factura_ciaros: Date | string | null;
  fecha_liquidada: Date | string | null;
}


export interface LiquidacionClusterTS {
  Cliente?: ClienteTS;
  Aseguradora?: AseguradoraTS;
  Subagente?: SubagenteTS;
  SubagenteCodigo: string;
  numero_liquidacion: string;
  fecha_liquidacion: string;
  total_liquidado: number;
  filas: string[];
}

export interface LiquidacionRowTS {
  id: string;
  SAge: string;
}

export interface ILiquidacionRequestBody {
  with_user: LiquidacionTS[],
  without_user: LiquidacionTS[],
  agency: AseguradoraTS,
  subsidiary: SubsidiariaTS
}

export enum LiquidacionTypes {
  PRE_LIQUIDACIONES = "Pre Liquidacion",
  NEGOCIO_PENDIENTE = "Negocio pendiente por liberar",
  NEGOCIO_LIBERADO = "Negocio pendiente por facturar",
  CONSOLIDADO = "Consolidado",
  ARCHIVADO = "Archivado"
}

export enum LiquidacionStates {
  EMITIDO = "Emitida",
  LISTA = "Lista",
  POR_FACTURAR = "Por Facturar",
  POR_LIBERAR = "Por Liberar",
  ARCHIVADA = "Archivada"
}


export enum KanbanStates {
  EMITIDO = "Emitida",
  LISTA = "Lista",
  ENVIADA = "Enviada",
  PAGADA = "Pagada",
  ARCHIVADA = "Archivada"
}


export const BASE_LIQUIDACION: LiquidacionTS = {
  id: "",
  tipo: LiquidacionTypes.PRE_LIQUIDACIONES,
  estado: LiquidacionStates.LISTA,
  factura_ciaros: 0,
  factura: 0,
  documento: 0,
  orden: "",
  fecha_vence: "",
  d_inicial: 0,
  poliza: "",
  anexo: 0,
  endoso: "",
  codigo: 0,
  cliente: "",
  f_contab: "",
  valor_prima: 0,
  comision: 0,
  F: "",
  L: "",
  P: "",
  Notas: "",
  SAge: "",
  fecha_cobrada: "",
  fecha_factura_ciaros: "",
  fecha_liquidada: "",
  fecha_pagada: null,
};
