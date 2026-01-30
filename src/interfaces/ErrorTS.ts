import type { AseguradoraTS } from "./AseguradoraTS"
import type { ILiquidacionRequestBody } from "./LiquidacionesTS"
import type { SubsidiariaTS } from "./SubsidiariaTS"

export interface IError {
    index: number,
    field: string,
    fill: boolean
}

export interface IRowsError {
    errors: IError[],
    payouts: ILiquidacionRequestBody
}