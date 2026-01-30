import type { SubsidiariaTS } from './SubsidiariaTS'

export interface AseguradoraTS {
  id?: string
  ruc: string
  nombre: string
  contrato: string
  direccion: string
  correo: string
  Sucursales?: SubsidiariaTS[]
}


export interface SucursalTS {
  id?: string
  ciudad: string
  encargado: string
  correo: string
}

export interface CodigoRamoTS {
  id?: string
  nombre_ramo: string;
  codigo_ramo: string;
  nombre_ramo_cia: string;
  codigo_ramo_cia: string;
  Aseguradora?: AseguradoraTS;
}
