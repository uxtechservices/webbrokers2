import type { LiquidacionMappedTS } from "./LiquidacionesTS";

export interface ClienteTS {
    id?: string;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    Liquidaciones?: LiquidacionMappedTS[];
  };