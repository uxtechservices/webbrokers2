export interface SubagenteTS {
  id?: string;
  codigo: string;
  rol: SubAgenteRol;
  nombres: string;
  apellidos: string;
  correo: string;
  estatus: string;
  fecha_nacimiento?: string;
  genero?: string;
  ejecutivo_ciaros?: string;
  codigo_ejecutivo_ciaros?: string;
  nombre_de_comprobante?: string;
  tipo_de_documento?: string;
  ruc_de_comprobante?: string;
  tipo_de_regimen?: string;
  banda?: string;
  numero_cuenta?: string;
  codigo_de_beneficiario?: string;
  tipo_de_cuenta?: string;
  codigo_de_banco?: string;
  telefono?: string;
  nombre_de_beneficiario?: string;
  direccion_de_beneficiario?: string;
  ciudad_beneficiario?: string;
  telefono_beneficiario?: string;
  localidad_de_cobro?: string;
  tipo?: string;
  referencia?: string;
  referencia_adicional?: string;
  documento?: string;
  ciudad?: string;
  tarifa_comision?: number;
  liderId?: string;
  iva?: number;
  ret_iva?: number;
  ret_renta?: number;
  gastos_adm?: number;
  parent?: Leader;
}

enum SubAgenteRol {
  SUBAGENTE = "Subagente",
  LIDER = "Lider",
}

interface Leader {
  nombres: String;
  apellidos: String;
  codigo: String
}

export const BASE_SUBAGENTE: SubagenteTS = {
  id: "",
  codigo: "",
  rol: SubAgenteRol.SUBAGENTE,
  nombres: "",
  apellidos: "",
  correo: "",
  estatus: "",
  fecha_nacimiento: "",
  genero: "",
  ejecutivo_ciaros: "",
  nombre_de_comprobante: "",
  tipo_de_documento: "",
  ruc_de_comprobante: "",
  tipo_de_regimen: "",
  banda: "",
  numero_cuenta: "",
  codigo_de_beneficiario: "",
  tipo_de_cuenta: "",
  codigo_de_banco: "",
  telefono: "",
  nombre_de_beneficiario: "",
  tipo: "",
  direccion_de_beneficiario: "",
  ciudad_beneficiario: "",
  telefono_beneficiario: "",
  localidad_de_cobro: "",
  referencia: "",
  referencia_adicional: "",
  documento: "",
  ciudad: "",
  tarifa_comision: 0,
  liderId: "",
  iva: 0,
  ret_iva: 0,
  ret_renta: 0,
  gastos_adm: 0
};